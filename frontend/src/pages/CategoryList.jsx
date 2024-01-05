import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  categoryListAsync,
  addCategoryAsync,
  removeCategoryAsync,
  updateCategoryAsync,
} from "../slices/categorySlice";

const Category = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);

  const [categoryState, setCategoryState] = useState({
    newCategory: "",
    editedCategory: { _id: "", name: "" },
  });

  useEffect(() => {
    dispatch(categoryListAsync());
  }, []);

  const handleAddCategory = () => {
    dispatch(addCategoryAsync({ name: categoryState.newCategory }));
    setCategoryState((prevState) => ({ ...prevState, newCategory: "" }));
  };

  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategoryAsync(categoryId));
  };

  const handleUpdateCategory = () => {
    dispatch(updateCategoryAsync(categoryState.editedCategory));
    setCategoryState((prevState) => ({
      ...prevState,
      editedCategory: { _id: "", name: "" },
    }));
  };

  const handleEditBtn = (categoryId, categoryName) => {
    setCategoryState({
      ...categoryState,
      editedCategory: { _id: categoryId, name: categoryName },
    });
  };

  return (
    <div>
      <h2>Categories</h2>

      <ul>
        {categories.map((category) => (
          <li key={category._id}>
            {category.name}
            <button onClick={() => handleRemoveCategory(category._id)}>
              Remove
            </button>
            <button onClick={() => handleEditBtn(category._id, category.name)}>
              Edit
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={categoryState.newCategory}
        onChange={(e) =>
          setCategoryState((prevState) => ({
            ...prevState,
            newCategory: e.target.value,
          }))
        }
      />
      <button onClick={handleAddCategory}>Add Category</button>

      {categoryState.editedCategory._id && (
        <div>
          <h3>Edit Category</h3>
          <input
            type="text"
            value={categoryState.editedCategory.name}
            onChange={(e) =>
              setCategoryState((prevState) => ({
                ...prevState,
                editedCategory: {
                  ...prevState.editedCategory,
                  name: e.target.value,
                },
              }))
            }
          />
          <button onClick={handleUpdateCategory}>Update Category</button>
        </div>
      )}
    </div>
  );
};

export default Category;
