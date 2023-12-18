import React from "react";
import Posting from "../components/Posting";
import { useAppSelector } from "../store/configureStore";
import { selectUser } from "../slices/accountSlice";

function Mypage() {
  const userInfo = useAppSelector(selectUser);
  return (
    <div>
      <h2>Mypage</h2>
      <Posting postVisibility="all" userId={userInfo?._id} showButtons={true} />
    </div>
  );
}

export default Mypage;
