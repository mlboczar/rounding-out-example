const express = require('express');
const app = express();
const PORT = 8080;
const morgan = require('morgan');
const houseRouter = require('./routes/houses');
const studentRouter = require('./routes/students');
const { db } = require('./db');

const setup = async () => {
  try {
    // logging middleware
    app.use(morgan('dev'));

    app.use('/houses', houseRouter);
    app.use('/students', studentRouter);

    //Custom 404 response
    //there's no error that happened, route couldn't be found
    app.use((req, res) => {
      res.status(404).send('No spells here - try again!');
    });

    //500 & other error handling
    app.use((err, req, res, next) => {
      const status = err.status || 500;
      res.status(status).send(err.message);
    });

    // syncing the database before listening to the port!
    await db.sync();
    app.listen(PORT, () => {
      console.log(`Casting spells on PORT ${PORT}`);
    });
  } catch(e) {
    console.log(e);
  }
}

setup();
