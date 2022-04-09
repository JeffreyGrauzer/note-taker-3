const router = require('express').Router();
const fs = require('fs');
const { nanoid } = require('nanoid');
const id = nanoid();

let notes;

router.get('/notes', (req, res) => {
  
    notes = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(notes);
});


router.post('/notes', (req, res) => {
    req.body.id = id;
    let newNote = req.body;
    notes.push(newNote);

    fs.writeFileSync('db/db.json', JSON.stringify(notes), 'utf8');

    res.json(notes);
});


router.delete('/notes/:id', (req, res) => {

    const noteId = req.params.id;
    let noNotes = notes.filter( currentNote => {
        return currentNote.id != noteId;
    })
    fs.writeFileSync('db/db.json', JSON.stringify(noNotes), 'utf8');
    res.json(noNotes);
});

module.exports = router;
