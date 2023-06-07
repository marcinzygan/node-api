const express = require('express');

const app = express();
const morgan = require('morgan');
const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControler');
//middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(express.json());
app.use(express.static(`${__dirname}/public`));

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();

  next();
});

//FUNCTIONS FOR ROUTES

//////////////// ROUTES ///////////////////
// GET REQUEST ALL TOURS
// app.get('/api/v1/tours', getAllTours);
// GET REQUEST SINGLE TOUR BY PARAMS
// app.get(`/api/v1/tours/:id`, getSingleTour);
// POST REQUEST
// app.post('/api/v1/tours', createTour);
// PATCH REQUEST
// app.patch('/api/v1/tours/:id', updateTour);
// DELETE REQUEST
// app.delete('/api/v1/tours/:id', deleteTour);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', usersRouter);

// Middleware for 404
app.all('*', (req, res, next) => {
  // res.status(404).json({
  //   status: 'fail',
  //   message: `Can't find ${req.originalUrl}`,
  // });
  // const err = new Error(`Can't find ${req.originalUrl}`);
  // err.status = 'fail';
  // err.statusCode = 404;
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});
app.use(globalErrorHandler);
module.exports = app;
