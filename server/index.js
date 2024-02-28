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
		origin:"https://localhost:5173",
		credentials:true,
	})
	)
	
connectDB();

const PORT = process.env.PORT || 3000;
app.use('/api/v1', routes);

app.get('/', (req, res) => {
  res.send('live api');
});


app.listen(PORT, () => {
  console.log('Server is running on port 3000');
});
