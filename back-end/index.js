const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const routes = require('./routes');
const bodyParser = require('body-parser');


dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch(e => console.log("MongoDB error", e));

app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`server started ${PORT}`);
})