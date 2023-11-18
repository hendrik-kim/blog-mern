import React from "react";
import { useSelector,useDispatch } from "react-redux";
import { selectAllPosts } from "./../../slices/postSlice";
import { deletePosting } from "./../../slices/postSlice";
const Mypage = () => {
   const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deletePosting({ id: id }));
  };
  // category part should be displaying.
  const posts = useSelector(selectAllPosts);
  console.log("myPage", posts);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.id}</h3>
      <h3>{post.title.title}</h3>
      <h4>{post.title.postVisibility}</h4>
      <p>{post.title.content}</p>
      <p>posting time: {post.timestamp}</p>
      <button onClick={()=>handleDelete(post.id)}>Delete</button>
    </article>
  ));
  return (
    <div>
      <section>
        <h2>Posting in My page</h2>
        {renderedPosts}
      </section>
    </div>
  );
};

export default Mypage;
