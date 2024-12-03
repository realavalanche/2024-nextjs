const mongoose = require('mongoose');
const connection =
  'mongodb+srv://realavalanche-user:Computer%404@realavalanche-cluster-dqckt.mongodb.net/test?retryWrites=true&w=majority';
mongoose
  .connect(connection, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Database Connected Successfully'))
  .catch((err) => console.log(err));
