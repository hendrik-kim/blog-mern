import { NavLink, Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div>
      <header>
        <nav style={{ display: "flex", gap: 10 }}>
          <NavLink to="/">Logo</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/category">Category</NavLink>
          <NavLink to="/new-post">Write a Post</NavLink>
          <NavLink to="/my-page">My page</NavLink>
          <NavLink to="/profile">User Profile</NavLink>
          <NavLink to="/sign-in">Sign In</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
          {/* temp */}
          <NavLink to="/edit-post">Edit post</NavLink>
        </nav>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default RootLayout;
