const express = require('express');
const { fstat } = require('fs');
const path = require('path');
const app = express();
const db = require('./Develop/db/db.json')
const PORT = 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) =>
    res.sendFile(path.join(__dirname, '/Develop/public/index.html'))
);

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/Develop/public/notes.html'))
});

app.get('/api/notes', function (req, res) {
    fs.readFile(__dirname + '/db/db.json', (err, req) => {
        return res.json(json.parse(req)
        
    })
});

app.listen(PORT, () =>
    console.log(`App Listener port - http://localhost:${PORT}`)
);