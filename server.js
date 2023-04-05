require("dotenv").config();
const express = require('express');
const path = require('path');
const  fs = require('fs');
const data = require('./db/db.json')
// requiring clog.js ??
const { clog } = require('./db/middleware/clog');


const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);


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
app.delete("/api/notes/:id", function(req,res){
    console.log("delete:", req.params.id,  req.params)
    fs.readFile('./db/db.json', 'utf8', function(err, data){

        //convert into an object
        let newData = JSON.parse(data);

        newData.splice(req.params.id,1);

        //console.log("did i splice?", newData);

        let output = JSON.stringify(newData);
    
        //write a new file
        fs.writeFile("./db/db.json", output, function(){
 
             res.json({
                      message: "success"
             })
 
        })



    });


})

app.post("/api/notes", function(req,res){
    //console.log("data coming in?", req.body); //data comes in
    fs.readFile('./db/db.json', 'utf8', function(err, data){
      
        // Display the file content
        console.log("data start",data);
          //convert into an object
        let newData = JSON.parse(data);

        //add our data to an object
        newData.push({
            id: newData.length,
            title: req.body.title, 
            text: req.body.text
        })
        console.log("data after the push",newData);

       //convert new object into string
        let output = JSON.stringify(newData);
    
       //write a new file
       fs.writeFile("./db/db.json", output, function(){

            res.json({
                     message: "success"
            })

       })

       


    });
   



})






app.listen(PORT, function(){
    console.log("Server listening on port: http://localhost:" + PORT)
})













// app.listen(PORT, () =>
//   console.log(`App listening at http://localhost:${PORT} 🚀`)
// );