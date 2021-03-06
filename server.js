const PORT = process.env.PORT || 3001;
const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

// STORAGE FOR store notes
const store = require('./db/db.json');
const { allowedNodeEnvironmentFlags } = require('process');
const res = require('express/lib/response');


// MIDDLEWARE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

app.get('/api/notes', (req, res) => {
    console.log(store)
    res.json(store);
});
console.log(store.notes);

app.post('/api/notes', (req, res) => {
   console.log('LINE 25 REQ ' + req);
   console.log(store);
   debugger;
    saveNote(req.body, store);
   
    res.redirect(req.get(req.originalUrl));
    
});

function saveNote(input, presentStore) {
    presentStore.push({title: input.title, text: input.text, id: input.id});
    console.log(presentStore.length);
    createNote(presentStore);
    
}


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});


app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.get('*', (req, res) =>{
    res.sendFile(path.join(__dirname, './public/index.html'));
});



function createNote (body) {
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(body, null)
    // return createNote;
    );
};

function deleteNote (body) {
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(body, null)

    );
};

app.delete('/api/notes/:id', (body) => {
    deleteNote(store),
    res.json(true);
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});