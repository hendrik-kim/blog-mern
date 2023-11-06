import asyncHandler from 'express-async-handler';

// Dummy function for user login
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  // Dummy check for username and password
  if (username === 'test' && password === 'password') {
    res.json({
      message: 'Login successful',
      user: { id: 1, username: 'test' },
    });
  } else {
    res.status(401);
    throw new Error('Invalid username or password');
  }
});

export { loginUser };
