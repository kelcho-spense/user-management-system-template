// src/index.ts
import express from 'express';
import userRoutes from './routes/userRoutes';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use('/api/users', userRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
