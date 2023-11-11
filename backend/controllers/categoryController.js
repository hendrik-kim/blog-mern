import asyncHandler from 'express-async-handler';
import Category from '../models/categoryModel.js';

/**
 * @route   GET /api/categories
 * @desc    Retrieve all categories
 * @access  Public
 */
const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find({});
  res.json(categories);
});

/**
 * @route   GET /api/categories/:id
 * @desc    Retrieve a single category by ID
 * @access  Public
 */
const getCategoryById = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (category) {
    res.json(category);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

/**
 * @route   POST /api/categories
 * @desc    Create a new category
 * @access  Public
 */
const createCategory = asyncHandler(async (req, res) => {
  const { name, parentId } = req.body;

  if (!name || name.trim() === '') {
    res.status(400).json({ message: 'Name cannot be empty' });
    return;
  }

  const category = new Category({
    name,
    parentId,
  });

  const createdCategory = await category.save();
  res.status(201).json(createdCategory);
});

/**
 * @route   PUT /api/categories/:id
 * @desc    Update a category by ID
 * @access  Public
 */
const updateCategory = asyncHandler(async (req, res) => {
  const { name, parentId } = req.body;
  const category = await Category.findById(req.params.id);

  if (category) {
    category.name = name || category.name;
    category.parentId = parentId || category.parentId;

    const updatedCategory = await category.save();
    res.json(updatedCategory);
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

/**
 * @route   DELETE /api/categories/:id
 * @desc    Delete a category by ID
 * @access  Public
 */
const deleteCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (category) {
    await category.remove();
    res.json({ message: 'Category removed' });
  } else {
    res.status(404).json({ message: 'Category not found' });
  }
});

export {
  getCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};
