const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js')

dotenv.config({path: './config/.env'});

const PORT = process.env.PORT || 8080;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    {
        extended: true
    }
));

// Connecting to database
connectDB();

app.use('/api/users', require('./routes/uesrRoutes.js'));

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`)
})