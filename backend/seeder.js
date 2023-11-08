import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { faker } from '@faker-js/faker';
import Post from './models/postModel.js';
import connectDB from './config/database.js';
import User from './models/userModel.js';
import bcrypt from 'bcryptjs';

dotenv.config({ path: '../.env.development' });

connectDB();

const createUsers = async () => {
  const userPromises = [];

  userPromises.push(
    new User({
      username: 'adminUser',
      email: 'test@test.com',
      password: 'password',
      isAdmin: true,
    }).save()
  );

  for (let i = 0; i < 10; i++) {
    userPromises.push(
      new User({
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: 'password',
        isAdmin: false,
      }).save()
    );
  }

  const users = await Promise.all(userPromises);
  return users;
};

const createPosts = async (users) => {
  try {
    await Post.deleteMany();

    const samplePosts = users.map((user) => ({
      user: user._id,
      title: faker.lorem.sentence(),
      imageUrl: `https://source.unsplash.com/random/800x600?sig=${Math.random()}`,
      category: faker.commerce.department(),
      content: faker.lorem.paragraphs(5),
    }));

    await Post.insertMany(samplePosts);
    console.log('Data Imported!'.green.inverse);
  } catch (error) {
    console.error(`${error}`.red.inverse);
    throw error;
  }
};

const main = async () => {
  try {
    const users = await createUsers();
    await createPosts(users);
  } catch (error) {
    console.error(`${error}`.red.inverse);
  } finally {
    mongoose.disconnect();
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  main();
}
