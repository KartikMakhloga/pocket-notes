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

const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
