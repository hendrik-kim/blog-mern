import { useSelector } from "react-redux";
import { selectAllPosts } from "./../../slices/postSlice";

function Home() {
  const posts = useSelector(selectAllPosts);
  console.log("home :", posts);
  const publicPosts = posts.filter((post) => post.postVisibility === "public");
  const reversedPosts = [...publicPosts].reverse();
  const renderedPosts = reversedPosts.map((post, i) => (
    <article key={i}>
      <h3>{post.title}</h3>
      <h4>{post.postVisibility}</h4>
      <p>{post.content}</p>
      <p>posting time: {post.timestamp}</p>
    </article>
  ));
  return (
    <div>
      <h2>Posting in HomePage</h2>
      {renderedPosts}
    </div>
  );
}

export default Home;
