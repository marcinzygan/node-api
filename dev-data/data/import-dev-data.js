const fs = require('fs');
/* eslint-disable import/no-extraneous-dependencies */
const dotenv = require('dotenv');
const mongoose = require('mongoose');

const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('DB connection sucess');
  });

// READ FILE

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);
console.log(tours);

//import data to database

const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('data sucessfully loaded');
  } catch (error) {
    console.log(error);
  }
};
// delete all data from collection
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('data sucessfully deleted');
  } catch (error) {
    console.log(error);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
