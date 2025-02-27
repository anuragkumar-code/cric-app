
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const { Sequelize } = require('sequelize');

//import all routes after this only
const userRoutes = require('./routes/authRoutes');
const playerRoutes = require('./routes/playerRoutes');

const app = express();
const port = process.env.PORT;

app.use(cors());

// app.use(cors());
app.use(express.json());
// app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.use('/api/v1/auth', userRoutes);
app.use('/api/v1/player', playerRoutes);

// console.log(port)
// console.log(`Environment variable NODE_SERVER_PORT: ${process.env.NODE_SERVER_PORT}`);

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.MYSQL_HOST,
  dialect: 'mysql',
  logging: console.log, 
});


sequelize.authenticate()
  .then(() => {
    console.log('Connected to database');
  })
  .catch((err) => {
    console.error('Error connecting to database:', err);
  });


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});