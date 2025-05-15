import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import gameRoutes from './routes/gameRoutes';

dotenv.config();

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.use('/api', gameRoutes);

app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
