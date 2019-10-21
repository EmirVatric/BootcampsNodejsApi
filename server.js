const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const colors = require('colors')
const connectDB = require('./config/db')

//load env vars
dotenv.config({ path: './config/config.env' });

//connecto to database
connectDB()

const app = express();

//middleware
//body parser
app.use(express.json())

//dev loggin middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}
//routes
const bootcamps = require('./routes/bootcamps')

//Mount routes
app.use('/api/v1/bootcamps', bootcamps)




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