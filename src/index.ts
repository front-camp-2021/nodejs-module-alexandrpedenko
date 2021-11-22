import express from 'express';
import AppRouter from './routes';
import { errorMiddleware } from './middlewares/error.middleware';

const app = express();
const router = new AppRouter(app);

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Credentials', 'true');
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Expose-Headers', 'X-Total-Count');
  next();
});

app.set('port', process.env.PORT || 3001);
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

router.init();
app.use(errorMiddleware);

const port = app.get('port');
const server = app.listen(port, () =>
  console.log(`Server started on http://localhost:${port}`)
);

export default server;
