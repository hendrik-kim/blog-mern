import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryListAsync,
  addCategoryAsync,
  removeCategoryAsync,
  updateCategoryAsync,
} from "../../slices/categorySlice";

// Define a functional component name as Category
const Category = () => {

  // Use Redux hooks to access the redux store, dispatch action and retrieve data
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const status = useSelector((state) => state.categories.status);
  const error = useSelector((state) => state.categories.error);

  // Set up local state using React useState for managing new category input and edited category data
  const [newCategory, setNewCategory] = useState("");
  const [editedCategory, setEditedCategory] = useState({ _id: "", name: "" });

  // Dispatch the categoryListAsync when the component mounts to fetch the categoryList
  useEffect(() => {
    dispatch(categoryListAsync());
  }, [dispatch]);

  // Define a funtion to dispatch the addCategory action with the new category name
  const handleAddCategory = () => {
    dispatch(addCategoryAsync({ name: newCategory }));
    setNewCategory("");
  };

  // Define a funtion to dispatch the removeCategory action with the selected category ID
  const handleRemoveCategory = (categoryId) => {
    dispatch(removeCategoryAsync(categoryId));
  };

  // Define a funtion to dispatch the updateCategory action with the edited category data
  const handleUpdateCategory = () => {
    dispatch(updateCategoryAsync(editedCategory));
    setEditedCategory({ _id: "", name: "" });
  };

  // Define a funtion to set the edited category data when the edit btn is clicked
  const handleEditBtn = (categoryId, categoryName) => {
    setEditedCategory({ _id: categoryId, name: categoryName });
  };
  
  return (
    <div>
      <h2>Categories</h2>
      {status === "loading" && <p>Loading...</p>}
      {status === "failed" && <p>Error: {error}</p>}
      {status === "succeeded" && (
        <ul>
          {categories.map((category) => (
            <li key={category._id}>
              {category.name}
              <button onClick={() => handleRemoveCategory(category._id)}>
                Remove
              </button>
              <button
                onClick={() => handleEditBtn(category._id, category.name)}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}
      <input
        type="text"
        value={newCategory}
        onChange={(e) => setNewCategory(e.target.value)}
      />
      <button onClick={handleAddCategory}>Add Category</button>

      {editedCategory._id && (
        <div>
          <h3>Edit Category</h3>
          <input
            type="text"
            value={editedCategory.name}
            onChange={(e) =>
              setEditedCategory({ ...editedCategory, name: e.target.value })
            }
          />
          <button onClick={handleUpdateCategory}>Update Category</button>
        </div>
      )}
    </div>
  );
};

export default Category;
