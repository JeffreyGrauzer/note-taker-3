const router = require('express').Router();
const fs = require('fs');
// npm package that assigns unique id's
const { nanoid } = require('nanoid');
const id = nanoid();

let notes;

// gets the notes data
router.get('/notes', (req, res) => {
    //reads the json file and returns to the client.
    notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(notes);
});

// create new entry
router.post('/notes', (req, res) => {
    req.body.id = id;

    // takes body and pushes to notes array
    let incoming = req.body;
    notes.push(incoming);

    // writes the new note to the db
    fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8');

    // sends updated note list to user
    res.json(notes);
});

// delete note 
router.delete('/notes/:id', (req, res) => {
    // get id from request
    const noteId = req.params.id;
    //uses filter to create a new array with all the old info except the requested note with the incoming id
    let notesSans = notes.filter( currentNote => {
        return currentNote.id != noteId;
    })

    // writes the notes to the json file without the deleted note
    fs.writeFileSync('db/db.json', JSON.stringify(notesSans), 'utf8');
    res.json(notesSans);
});

module.exports = router;
