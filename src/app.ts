import express from 'express';
import { config } from './config/envs';
import routes from './routes/routes';
import { connectMongoDB } from './config/mongoDBConfig';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
connectMongoDB();

app.use('/api', routes);

app.listen(config.PORT, () => {
  console.log(`PORT ${config.PORT} listening correctly`);
});
