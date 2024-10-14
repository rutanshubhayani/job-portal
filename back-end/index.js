const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log("Database connected"))
    .catch(e => console.log("MongoDB error", e));

app.listen(PORT, () => {
    console.log(`server started ${PORT}`);
})