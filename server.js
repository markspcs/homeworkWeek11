const express = require("express");
const path = require("path");
const fs = require("fs");

const PORT = 8080;
const app = express();
const dbFile = "./db/db.json";

const debug = 1;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'))


var dbNotes = JSON.parse(fs.readFileSync(dbFile, 'utf8', function (err) {
  if (err) {
    console.log(`dbNotes error: ${err}`);
  }
}));/// FINISH THIS TO GET NOTES

//ROUTES
//============================================
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});
app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});


app.get("/api/notes", function (req, res) {
  return res.json(dbNotes);
});
app.post("/api/notes", function (req, res) {
  //let newNote = req.body;
  console.log(req.body);
  let newNote = Object.assign(getNewId(), req.body);
  debug && console.log(`new note from post: ${newNote}`);
  console.log(newNote);
  dbNotes.push(newNote);
  //ADD NEW NOTE TO FS
  fs.writeFileSync(dbFile, JSON.stringify(dbNotes));
  res.json(dbNotes); // return notes with new note included
});
app.delete("/api/notes/:id", function (req, res) {
  let delNote = req.params.id;
  debug && console.log(`app.delete: ${delNote}`);
  debug && console.log(dbNotes);
  let delIndex = dbNotes.findIndex(x => x.id == delNote);
  //let delIndex = dbNotes.map(function (item) { return item.id }).indexOf(delNote);
  debug && console.log(`delIndex: ${delIndex}`);
  dbNotes.splice(delIndex, 1);
  fs.writeFileSync(dbFile, JSON.stringify(dbNotes));
  res.json(dbNotes);
  //read db.json
  //remove id from db.json
  //rewrite db.json
});


app.listen(PORT, function () {
  console.log(`server.js is listening on PORT:  ${PORT}`);
});

/////////////////////////
//get new ID
function getNewId() {
  let newId = {};
  console.log(dbNotes);
  console.log(dbNotes.length);
  if (dbNotes.length) {
    newId.id = dbNotes[dbNotes.length -1].id + 1;
    console.log (`last id in else: ${dbNotes[dbNotes.length -1].id}`);
  }
  else {
    newId.id = 0; 
  }
  debug && console.log(`lastID of getNewId: ${newId.id}`);
  return newId;
}
