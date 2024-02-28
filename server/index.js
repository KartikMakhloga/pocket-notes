import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import routes from './routes/route.js';
import cors from 'cors';

const app = express();
app.use(express.json());

dotenv.config();

app.use(
	cors({
		origin:"http://localhost:5173",
		credentials:true,
	})
)

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1', routes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
