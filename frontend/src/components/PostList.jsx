import { useSelector } from "react-redux";
import { selectAllPosts } from "../slices/postSlice";

const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const publicPosts = posts.filter((post) => post.selectedOption === "public");
  const renderedPosts = publicPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title}</h3>
      <h4>{post.selectedOption}</h4>
      <p>{post.content.substring(0, 100)}</p>
    </article>
  ));
  return (
    <div>
      <section>
        <h2>Posts</h2>
        {renderedPosts}
      </section>
    </div>
  );
};

export default PostList;
