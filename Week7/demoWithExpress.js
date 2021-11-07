const express = require('express');
const app = express();
const axios = require('axios');

const apikey = '869744ce';
//const title = 'Avengers';


app.get('/getMovie', (req, res) => {
    const title = req.query.title; 
    
    const querystr = `https://www.omdbapi.com/?t=${title}&apikey=${apikey}`;

    axios.get(querystr).then((response) =>
    {
        res.send(response.data.Title + "" + response.data.Year + "" +response.data.Director + "");
    });

});

app.get('/deleteMovie', (req, res) => {
res.send('Deleting movie');


});

app.listen(5000, () => {
    console.log('Server listening to port 5000');
});