import React from "react";
import Posting from "../components/Posting";
import { useAppSelector } from "../store/configureStore";
import { selectUser } from "../slices/accountSlice";
import { globalErrors } from "../utils/error";

function Mypage() {
  const userInfo = useAppSelector(selectUser);
  if (!userInfo) {
    return (
      <div>
        <h2>Error in Write a post page</h2>
        <p>{globalErrors[401]}</p>
      </div>
    );
  }
  return (
    <div>
      <h2>Mypage</h2>
      <Posting postVisibility="all" userId={userInfo?._id} showButtons={true} />
    </div>
  );
}

export default Mypage;
