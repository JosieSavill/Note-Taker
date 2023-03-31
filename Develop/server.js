const express = require('express');
const path = require('path');
const  fs = require('fs');
const data = require('./db/db.json')



const PORT = process.env.port || 3001;

const app = express();

//catch all files to return
app.use(express.json());
app.use(express.urlencoded( {extended: true} ));


app.use(express.static("public"))

app.get("/", function(req, res){
    res.sendFile( __dirname + "/public/assets/index.html")
})

app.get("/notes", function(req, res){
    res.sendFile(  __dirname + "/public/assets/notes.html")
})

app.get("/api/notes", function(req,res){
    res.json(data)


})

app.post("/api/notes", function(req,res){
    console.log("data coming in?", req.body); //data comes in
    fs.readFile('./db/db.json', 'utf8', function(err, data){
      
        // Display the file content
        console.log(data);
        
        //convert into an object
       //add our data to an object
       //convert new object into string
       //write a new file
       //res.sucess


    });
   



})






app.listen(PORT, function(){
    console.log("Server listening on port: " + PORT)
})













// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT} 🚀`)
// );