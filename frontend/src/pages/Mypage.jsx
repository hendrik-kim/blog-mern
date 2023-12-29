import React from "react";
import Posting from "../components/Posting";
import { useAppSelector } from "../store/configureStore";
import { selectUser } from "../slices/accountSlice";
import { Navigate } from "react-router-dom";

function Mypage() {
  const userInfo = useAppSelector(selectUser);

  return (
    <div>
      <h2>Mypage</h2>
      {userInfo ? (
        <Posting
          postVisibility="all"
          userId={userInfo?._id}
          showButtons={true}
        />
      ) : (
        <Navigate to="/sign-in" />
      )}
    </div>
  );
}

export default Mypage;
