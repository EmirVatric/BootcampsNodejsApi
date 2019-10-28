const path = require('path')
const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const fileupload = require('express-fileupload')
const errorHandler = require('./middleware/error')
const connectDB = require('./config/db')

//load env vars
dotenv.config({
  path: './config/config.env'
});

//connecto to database
connectDB()


//routes
const bootcamps = require('./routes/bootcamps');
const courses = require('./routes/courses');

const app = express();

//body parser
app.use(express.json())

//dev logger middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

// File uploading
app.use(fileupload());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))

//Mount routes
app.use('/api/v1/bootcamps', bootcamps);
app.use('/api/v1/courses', courses);

//error handler
app.use(errorHandler)

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server and exit
  server.close(() => {
    process.exit(1)
  })
})