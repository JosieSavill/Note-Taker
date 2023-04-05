require("dotenv").config();
const express = require('express');
const path = require('path');
const  fs = require('fs');
const data = require('./db/db.json')
// requiring clog.js ??
const { clog } = require('./db/middleware/clog');
const { v4: uuidv4 } = require('uuid');

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
  
    
    fs.readFile('./db/db.json', 'utf8', function(err, data){
        res.json(JSON.parse(data))
    })


})
app.delete("/api/notes/:id", function(req,res){
    console.log("delete:", req.params.id,  req.params)
    fs.readFile('./db/db.json', 'utf8', function(err, data){

        // const arryOfNums = [2,3,4]

        // const numsDoubled = arryOfNums.map((num) => num*2)
        // console.log(numsDoubled); // logs [3,4,8]

        //convert into an object
        let existingNotes = JSON.parse(data);

        // const updatedNotesList = existingNotes.filter((note) => {
        //     return note.id !== req.params.id
        // })

        const updatedNotesList = []

        for (let i = 0; i < existingNotes.length; i++) {
            const note = existingNotes[i];
            if (note.id !== req.params.id) {
                updatedNotesList.push(note)
            }
        }


        let output = JSON.stringify(updatedNotesList);
    
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

        const newNote = {
            id: uuidv4(), 
            title: req.body.title, 
            text: req.body.text
        }
        //add our data to an object
        newData.push(newNote)
        console.log("data after the push",newData);

       //convert new object into string
        let output = JSON.stringify(newData);
    
       //write a new file
       fs.writeFile("./db/db.json", output, function(){

            res.json(newNote)

       })

       


    });
   



})






app.listen(PORT, function(){
    console.log("Server listening on port: http://localhost:" + PORT)
})













