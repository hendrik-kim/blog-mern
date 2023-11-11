import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  try {
    const isProduction = process.env.NODE_ENV === 'production';
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });

    res.cookie('jwt', token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'strict',
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    throw error;
  }
};

export default generateToken;
