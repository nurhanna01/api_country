import express from 'express';
import cors from 'cors';

import db from './database/db.js';
import countryRouter from './routes/countryRouter.js';

const port = process.env.PORT || 3000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

db.sync()
  .then(() => {
    console.log('Database connected!');
  })
  .catch((err) => {
    console.log('Failed to sync database', err);
  });

app.use('/api/country', countryRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
