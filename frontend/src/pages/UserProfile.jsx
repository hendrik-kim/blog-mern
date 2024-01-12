import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  selectIsAuthenticated,
  selectUser,
  validateUserSession,
  editUserProfile,
} from "../slices/accountSlice";
import { selectLoading } from "../slices/commonSlice";
import { selectErrorMessage } from "../slices/commonSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";
import useInput from "../hooks/useInput";
import Input from "../components/Input";
import defaultProfileSVG from "../assets/defaultProfile.svg";

function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectLoading);
  const errorMessage = useAppSelector(selectErrorMessage);
  const initialUserValue = {
    username: userInfo?.username || "",
    bio: userInfo?.bio || localStorage.getItem("bio") || "",
  };
  const { formValues, handleChange } = useInput(initialUserValue);
  const [profileImage, setProfileImage] = useState(() => {
    //If there is a profile image that user has been uploaded, set it as a initial value. If not, set the default profile image.
    if (userInfo && userInfo.profileImage) {
      return userInfo.profileImage;
    } else {
      return "";
    }
  });
  const [isFormChanged, setIsFormChanged] = useState(false);

  useEffect(() => {
    dispatch(validateUserSession());

    if (userInfo && userInfo.bio) {
      // Get the current 'bio' from localStorage
      const storedBio = localStorage.getItem("bio");

      // Compare with the current 'bio' in userInfo
      if (userInfo.bio !== storedBio) {
        // If different, update localStorage
        localStorage.setItem("bio", userInfo.bio);
      }
    }
  }, [dispatch]);

  useEffect(() => {
    const hasFormChanged =
      formValues.username !== initialUserValue.username ||
      formValues.bio !== initialUserValue.bio;

    setIsFormChanged(hasFormChanged);

    //TODO: Reload alert when user tries to leave without saving the inputs that they've modified. (refresh & navigating to another page)
  }, [formValues]);

  const handleImageChange = (e) => {
    e.preventDefault();
    const selectedFile = e.target.files[0];

    // Check if the selected file is an image
    if (selectedFile && selectedFile.type.startsWith("image/")) {
      // Limit image size (adjust the value as needed)
      if (selectedFile.size > 5 * 1024 * 1024) {
        alert(
          "Image size exceeds the limit (5MB). Please choose a smaller image."
        );
        return;
      }

      // Read the selected image as a data URL
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsFormChanged(true);
      };
      reader.readAsDataURL(selectedFile);
    } else {
      alert("Please choose a valid image file.");
    }
  };

  const handleImageRemove = () => {
    if (profileImage !== defaultProfileSVG || profileImage !== "") {
      setProfileImage(defaultProfileSVG);
      setIsFormChanged(true);
    }

    //FIXME: need to fix the case where user had no image & upload image & remove it back. Then there is no change so isFormChanged should be false.
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //Prevent storing default profile image to the user.
    if (profileImage === defaultProfileSVG) {
      console.log("profile image same as default");
      setProfileImage("");
    }

    //If there is no change in username, pass only the rest of the form values to prevent 409 error.
    if (formValues.username === initialUserValue.username) {
      dispatch(
        editUserProfile({
          userId: userInfo._id,
          profileImage: profileImage,
          bio: formValues.bio,
        })
      );
    } else {
      dispatch(
        editUserProfile({
          userId: userInfo._id,
          profileImage: profileImage,
          ...formValues,
        })
      );
    }
    setIsFormChanged(false);
  };

  return (
    <div>
      <h1>My Profile</h1>
      {loading ? (
        <p>Loading...</p>
      ) : isAuthenticated && userInfo ? (
        <form onSubmit={handleSubmit}>
          <div>
            <div
              style={{
                maxWidth: "50px",
                height: "50px",
                overflow: "hidden",
                borderRadius: "50%",
              }}
            >
              {/* FIXME: Should render on first render  */}
              <img
                src={profileImage === "" ? defaultProfileSVG : profileImage}
                alt="user profile"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </div>
            {/* For future styling, use a label to hie the file input.  */}
            <label style={{ cursor: "pointer", display: "inline-block" }}>
              Update
              <input
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
            </label>
            <button
              type="button"
              onClick={handleImageRemove}
              disabled={profileImage === defaultProfileSVG}
            >
              Remove
            </button>
          </div>
          <Input
            type="text"
            label="Username: "
            name="username"
            value={formValues.username}
            onChange={handleChange}
          />
          <Input
            type="textarea"
            label="Bio: "
            placeholder="Enter your bio..."
            name="bio"
            value={formValues.bio}
            onChange={handleChange}
          />
          <p>{errorMessage ? errorMessage : ""}</p>
          <button type="submit" disabled={!isFormChanged || errorMessage}>
            Save
          </button>
        </form>
      ) : (
        <>
          <h3>You are not signed in yet! Please sign in first.</h3>
          <button onClick={() => navigate("/sign-in")}>Log in</button>
        </>
      )}
    </div>
  );
}

export default UserProfile;
