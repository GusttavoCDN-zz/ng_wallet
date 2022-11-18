import app from './config/app';

const port = Number(process.env.PORT) || 3000;

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
