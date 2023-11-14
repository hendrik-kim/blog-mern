import React from "react";
import { useSelector } from "react-redux";
import { selectAllPosts } from "./../../slices/postSlice";

const Mypage = () => {
  const posts = useSelector(selectAllPosts);
  const renderedPosts = posts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <h4>{post.selectedOption}</h4>
      <p>{post.content.substring(0, 100)}</p>
      <p>posting time: {post.timestamp}</p>
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
