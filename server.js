const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const db = require('./db/db.json')
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));


//display index page
app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/public/index.html'))
);


//display notes page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


//get saved notes
app.get('/api/notes', function (req, res) {
    fs.readFile(__dirname + '/db/db.json', (err, req) => {
        return res.json(JSON.parse(req))

    })
});

//post new notes
app.post('/api/notes', function (req, res) {
    fs.readFile(__dirname + '/db/db.json', (err, data) => {
        const notes = JSON.parse(data)
        notes.push(req.body)
        notes.forEach((note, i) => { note.id = i + 1 })
        fs.writeFile(__dirname + '/db/db.json', JSON.stringify(notes), (err, data) => {
            res.json(notes);
        });

    });

})

app.listen(PORT, () =>
    console.log(`App Listener port - http://localhost:${PORT}`)
);