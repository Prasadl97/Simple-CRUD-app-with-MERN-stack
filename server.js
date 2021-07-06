const express = require('express');
const mongoose = require('mongoose')//to communicate with mongo db
const bodyParser = require('body-parser');//to understand incoming objects as js objects to be understand by server
const cors = require('cors');


const app = express();//to invoke express(STEP 1)


//import routes 
const postRoutes = require('./routes/posts');



//app middleware
app.use(bodyParser.json());
app.use(cors());

app.use(postRoutes);//user's request from front end will hit here.then the request is directed to our defined routes.
//in there necessary actions will happen(saving,printing success msg)


const PORT = 8000;//(STEP 2)

const DB_URL = 'mongodb+srv://prasadl97:prasad@mernapp.u7kzv.mongodb.net/mernCrud?retryWrites=true&w=majority'//(STEP 3)

mongoose.connect(DB_URL,{
    useNewUrlParser: true, 
    useUnifiedTopology: true
})
.then(() =>{//handling the promise generated from above code if connection successful
    console.log('Connection successful');
})

.catch((err) => console.log('DB coonection error',err));




app.listen(PORT,() =>{
        console.log(`App is running on ${PORT}`);
});

