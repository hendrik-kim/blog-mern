import { useSelector } from "react-redux";
import { selectAllPosts } from "./../../slices/postSlice";

function Home() {
  const posts = useSelector(selectAllPosts);
  const publicPosts = posts.filter((post) => post.selectedOption === "public");
  const renderedPosts = publicPosts.map((post) => (
    <article key={post.id}>
      {/* user name required */}
      <h3>{post.title}</h3>
      <h4>{post.selectedOption}</h4>
      <p>{post.content.substring(0, 100)}</p>
      <p>posting time: {post.timestamp}</p>
    </article>
  ));
  return (
    <div>
      <section>
        {/* display only public posting */}
        <h2>Postings in home page</h2>
        {renderedPosts}
      </section>
    </div>
  );
}

export default Home;
