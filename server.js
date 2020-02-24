const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 8080;
const app = express();
const dbFile = "./db/db.json";

const debug = 1;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


var dbNotes = JSON.parse(fs.readFile(dbFile, 'utf8', function(err) {
    if(err) {
        console.log(err);
    }
}));/// FINISH THIS TO GET NOTES

//ROUTES
//============================================
app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });
app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });


app.get("/api/notes", function(req, res) {
    return res.json(dbNotes);
  });
app.post("/api/notes", function(req, res) {
    let newNote = req.body;
    dbNotes.push(newNote);
    //ADD NEW NOTE TO FS
    fs.writeFileSync(JSON.stringify(dbNotes), dbFile);
    res.json(dbNotes); // return notes with new note included
  });
app.delete("/api/notes/:id", function(req, res) {
    let delNote = req.params.id;
    debug && console.log(delNote);

    let delIndex = dbNotes.map(function(item) {return item.id}).indexOf(delNote);
    dbNotes.splice(delIndex, 1);
    fs.writeFileSync(JSON.stringify(dbNotes), dbFile);
    //read db.json
    //remove id from db.json
    //rewrite db.json
});


app.listen(PORT, function() {
    console.log(`server.js is listening on PORT:  ${PORT}`);
});

