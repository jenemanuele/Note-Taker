const fs = require('fs');
const path = require('path');

const express = require('express');
const app = express();

// const allNotes = require('db/db.json');

app.get('/api/notes', (req, res) => {
    let results = animals;
    console.log(req.query)
    res.json(notes);
});


function createNewNote(body, notesBatch) {
    const newNote = body;
    if (!Array.isArray(notesBatch))
    notesBatch = [];

    if (notesBatch.length === 0)
        notesBatch.push(0);

        body.id = notesBatch[0];
        notesBatch[0]++;

        notesBatch.push(newNote);
        fs.writeFileSync(
            // path.join(dirname)
            JSON.stringify(notesBatch, null)
        );
        return newNote;
}



app.listen(3001, () => {
    console.log(`API server now on port 3001!`);
});

