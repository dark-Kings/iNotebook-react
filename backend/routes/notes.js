const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');



//Route 1) Get all the NOtes using : Get "/api/notes/fetchallnotes" - Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route 2) Add a new NOtes using : Post "/api/notes/addnote" - Login required

router.post('/addnote', fetchUser, [
    body('title', 'Enter a valid name').isLength({ min: 3 }),
    body('description', 'Enter a valid email').isLength({ min: 5 })
], async (req, res) => {

    try {
        const { title, description, tag } = req.body;
        // if there are errors, return bad reuest and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        });
        const saveNote=await note.save()
        res.json(saveNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
});

//Route 3) Update an existing Note using : Put "/api/notes/updatenote" - Login required

router.put('/updatenote/:id',fetchUser, async (req, res) => {
try {
    const {title,description,tag}=req.body;

    //Create a newNote object
    const newNote = {};
    if(title){
        newNote.title= title;
    }
    if(description){
        newNote.desscription = description;
    }
    if(tag){
        newNote.tag= tag;
    }

    //Find the note to be updated and update it

    let note = await Note.findById(req.params.id);
    if(!note){
    console.log("no note");
       return res.status(401).send("Not Found");
    }
    if(note.user.toString()!== req.user.id){
       console.log("no match");
        return res.status(401).send("Not Allowed")
    }
      note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
      res.json(note);
    
} catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
}
});

//Route 4) Delete an existing Note using : Delete "/api/notes/deletenote" - Login required

router.delete('/deletenote/:id',fetchUser, async (req, res) => {

    try {
        //Find the note to be delete and delete it
    
        let note = await Note.findById(req.params.id);
        if(!note){
        console.log("no note");
           return res.status(401).send("Not Found");
        }

        // Allow deletion only if user owns this Note
        if(note.user.toString()!== req.user.id){
           console.log("no match");
            return res.status(401).send("Not Allowed")
        }
          note = await Note.findByIdAndDelete(req.params.id);
          res.json({"Success":"Note has been deleted",note:note});
        
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
    });

module.exports = router;