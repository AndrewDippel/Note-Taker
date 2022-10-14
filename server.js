const { json } = require('express');
const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const app = express();
const db = require('./Develop/db/db.json')
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//display index page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);


//display notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
});


//get saved notes
app.get('/api/notes', function (req, res) {
    fs.readFile(__dirname + '/db/db.json', (err, req) => {
        return res.json(json.parse(req)
        
    })
});

//post new notes
app.post('/api/notes', function (req, res) {
    json.parse(fs.readFile(__dirname + '/db/db.json')).push(req.body);
    json.parse(fs.readFile(__dirname + '/db/db.json')).forEach((note, i) => { note.id = i + 1 });
    fs.writeFile(__dirname + '/db/db.json', json.stringify(json.parse(fs.readFile(__dirname + '/db/db.json'))));
    res.json(json.parse(fs.readFile(__dirname + '/db/db.json')));
})

app.listen(PORT, () =>
    console.log(`App Listener port - http://localhost:${PORT}`)
);