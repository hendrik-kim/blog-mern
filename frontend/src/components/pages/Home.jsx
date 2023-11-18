import { useSelector } from "react-redux";
import { selectAllPosts } from "./../../slices/postSlice";

function Home() {
  const posts = useSelector(selectAllPosts);
  console.log("home", posts);
  const publicPosts = posts.filter((post) => post.title.postVisibility === "public");
    const renderedPosts = publicPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.title.title}</h3>
      <h4>{post.title.postVisibility}</h4>
      <p>{post.title.content}</p>
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
