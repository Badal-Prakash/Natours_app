const dotenv = require('dotenv');
const mongoose = require('mongoose');
const app = require('./app');

dotenv.config({ path: './config.env' });
// const DB =
//   'mongodb+srv://lav14251:C9KNchi5xsW2aQ4X@cluster0.hytlboy.mongodb.net/natours?retryWrites=true&w=majority&appName=Cluster0';
const LOCAL_DB = 'mongodb://localhost:27017/natours';
mongoose
  .connect(LOCAL_DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(() => console.log('DB connection successful!'));

const port = 3000;
app.listen(port, () => {
  console.log(`listening on port :${port}`);
});
