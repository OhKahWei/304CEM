const mongoose = require('mongoose');

const db = "mongodb+srv://ohkahwei:handsomeoh@cluster0.wjcic.mongodb.net/MovieDB?retryWrites=true&w=majority";

mongoose
    .connect(db)
    .then(() => {
        console.log("Connected to database");
    }
    )
    .catch(() => {
        console.log("Error Connecting to database");
    }
    )

    const heroSchema = new mongoose.Schema({
         movietitle: {type: String},
         mpaa: {type:String}, 
         summary: {type:String}, 
         article: {type:String}, 
         imdb: {type:String},
        rotten: {type:String}

      
    
    }
    
    );
    
    
    const Record = mongoose.model('assignments', heroSchema);
    
    module.exports = Record;