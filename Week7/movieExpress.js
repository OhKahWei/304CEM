const axios = require('axios');
const express = require('express');
const app = express();
const Film = require('./connect');
const ejs = require('ejs'); 
const Record = require('./connect');

app.set('view engine', 'ejs');
app.use(express.static('public'));


const apikey = 'F1DvA6NLVLgDBtjESFmaZAAUVMelL0GD';
const apikey1 = 'k_j8pdrjmu';

var movie, rating, movietitle, mpaa, summary, article, imdb, rotten; 
var searchList = [
    
]; 

//const title = 'Avengers: EndGame';

app.get('/', (req,res) => {
    Record.find({}, function(err, assignments){
        res.render('index',{
            moviesList : assignments,
            searchResult : searchList
        });
    })

        
    
})

app.get('/getMovie', (req, res) => {
    
    const title = req.query.title;

    const querystr = `https://imdb-api.com/en/API/SearchTitle/${apikey1}/${title}`;


    axios.get(querystr).then( (response) => {
        
                searchList = response.data.results; 
                console.log(searchList);  
        
        res.redirect(req.get('referer'));
    
           
        });

});


app.get('/addMovie', (req, res) => {
    const title = req.query.title;

    const querystr = `https://api.nytimes.com/svc/movies/v2/reviews/search.json?query=${title}&api-key=${apikey}`;


    axios.get(querystr).then( (response) => {

            movietitle = response.data.results[0].display_title;
               mpaa = response.data.results[0].mpaa_rating;
               summary = response.data.results[0].summary_short;
               article = response.data.results[0].multimedia.src;
               

        const apikey1 = 'k_j8pdrjmu';
        const movieName = response.data.results[0].display_title;
        const querystr1 = `https://imdb-api.com/en/API/SearchTitle/${apikey1}/${movieName}`;

        axios.get(querystr1).then( (response) => 
        {

            const movieID = response.data.results[0].id;
            const movieRating = `https://imdb-api.com/en/API/Ratings/${apikey1}/${movieID}`;

            axios.get(movieRating).then( (response) => 
            {
                
               imdb = response.data.imDb ;
             rotten = 0;

             filmValue = new Film ({
                movietitle: movietitle, 
                mpaa: mpaa, 
                summary: summary, 
                article: article, 
                imdb: imdb, 
                rotten: rotten,
                
              });
              
              filmValue
                .save()   
                
                .then((result) => {
                  console.log("Success" + result);
                })
              
                .catch((error) => {
                  console.log("Error" + error);
                });
                res.redirect(req.get('referer'));
            });
            
        });
           
        });

});



app.get('/deleteMovie', (req, res) =>{

    const title = req.query.title;
    Film.deleteOne({_id: `${title}`}, function(err){
        
        if (err) return handleError(err);
        console.log("Success");
    });
    res.redirect(req.get('referer'));
});//close deletemovie

app.get('/editMovie', (req, res) =>{
    
    const title = req.query.title;
    const data = req.query.data;
    
    Film.updateOne({_id: `${title}`}, {rotten: `${data}`}, function(err, res){
        
        if (err) return handleError(err);
        console.log("Success");
    });
    res.redirect(req.get('referer'));
});//close editmovie

app.listen(5000, () => {
    console.log('Server listening to port 5000');
})