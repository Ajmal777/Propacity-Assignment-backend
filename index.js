const express = require('express');
require('dotenv').config();
require('./utils/connectDB');
const cors = require('cors');
const error = require('./middlewares/error');
const routes = require('./routes');
const S3 = require('aws-sdk/clients/s3')
const app = express();
const PORT = process.env.PORT;
app.use(express.json());
app.use(cors({
    origin: '*',
}))

app.use('/api', routes);

app.use(error);

app.listen(PORT, () => console.log('server running at port:', PORT))
