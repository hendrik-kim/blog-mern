import { NavLink, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
function RootLayout() {
  const user = useSelector((state) => state.user); // Assuming you have a user slice in your Redux store

  return (
    <div>
      <header>
        <nav style={{ display: "flex", gap: 10 }}>
          <NavLink to="/">Logo</NavLink>
          <NavLink to="/search">Search</NavLink>
          {user && user.isAdmin && <NavLink to="/category">Category</NavLink>}
          <NavLink to="/new-post">Write a Post</NavLink>
          <NavLink to="/my-page">My page</NavLink>
          <NavLink to="/profile">User Profile</NavLink>
          <NavLink to="/sign-in">Sign In</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
