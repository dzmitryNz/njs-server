import * as express from 'express';
// import path from 'path';
// import cookieParser from 'cookie-parser';
import * as logger from 'morgan';

import indexRouter from './routes/index';
import usersRouter from './routes/users';
import receiptsRouter from './routes/receipts';
import ingredientsRouter from './routes/ingredients';

const App = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

App.use(logger('dev'));
App.use(express.json());
App.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

App.use('/', indexRouter);
App.use('/users', usersRouter);
App.use('/receipts', receiptsRouter);
App.use('/ing', ingredientsRouter);

// catch 404 and forward to error handler
App.use(function(req, res, next) {
  res.json({ statusCode: 404 })
});

// error handler
App.use(function(err, req, res, next) {
  res.json({ 
    statusCode: 500, 
    mesage: err.message,
    stack: err.stack
    })
});

export default App;
