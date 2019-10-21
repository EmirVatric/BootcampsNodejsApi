const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')

//load env vars
dotenv.config({ path: './config/config.env' })

const app = express();

//middleware

//dev loggin middleware
if (process.env.NODE_ENV == 'development') {
  app.use(morgan('dev'))
}

//routes
const bootcamps = require('./routes/bootcamps')

//Mount routes
app.use('/api/v1/bootcamps', bootcamps)




const PORT = process.env.PORT || 5000;
app.listen(PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);