const express = require('express');
const app = express();
const helmet = require('helmet');
const cors = require('cors');
const images = require('./src/routes/images');

const PORT = process.env.PORT || 9090;

app.use(express.json());
app.use(cors({
    origin: process.env.ORIGIN || `http://localhost:${PORT}`
}));
app.use(helmet());
app.use('/images', images);

app.listen(3000, (error) => {
    if(error){
        console.error('Error on start : ' + error)
        return;
    }

    console.log(`Server started on http://localhost:${PORT}`)
});