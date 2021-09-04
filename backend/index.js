const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.status(200).send('Welcome to My Photo Space!!')
});

app.listen(3000, (error) => {
    if(error){
        console.error('Error on start : ' + error)
        return;
    }

    console.log('Server started on http://localhost:3000')
});