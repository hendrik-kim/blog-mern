import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/database.js';
import postRoutes from './routes/postRoutes.js';
import userRoutes from './routes/userRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';
import swaggerDocument from './utilities/swagger.js';
import passportConfig from './config/passportConfig.js';
import swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import passport from 'passport';

dotenv.config();
const envFile =
  process.env.NODE_ENV === 'production'
    ? '.env.production'
    : '.env.development';
dotenv.config({ path: envFile });

connectDB();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.use(
  session({
    secret: 'temp_session_key', // FIXME: Need to generate and use the proper session key later.
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passportConfig();

app.use(
  cors({
    origin: process.env.APP_CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());

app.use('/api/posts', postRoutes);
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/public/')));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
} else {
  app.get('/', (req, res) => {
    res.send('API Server is running...');
  });
}

app.listen(
  process.env.PORT || 5000,
  console.log(`API Server running in ${process.env.NODE_ENV} mode`.green.bold)
);
