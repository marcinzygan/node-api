const express = require('express');
const rateLimit = require('express-rate-limit');
const app = express();
const morgan = require('morgan');
const helmet = require('helmet');
const tourRouter = require('./routes/tourRoutes');
const usersRouter = require('./routes/userRoutes');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorControler');

//GLOBAL middleware
//Set Security HTTP headers
app.use(helmet());
// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// Limit request from same API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from that IP . Please try again in 1 hour',
});

app.use('/api', limiter);
// Body parser , reading data from body into req.body
app.use(express.json());
//Servig static files
app.use(express.static(`${__dirname}/public`));
// Test middleware
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
