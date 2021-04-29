const mongoose = require("mongoose")
const Author = mongoose.model("Author")

//get epxress-validator to validate user data in forms
const expressValidator = require('express-validator')

// get all authors
const getAllAuthors = async(req, res) => {
    try {
        const authors = await Author.find()
        return res.json(authors)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// find one author by their id
const getOneAuthor = async(req, res) => {
    try {
        const oneAuthor = await Author.findOne({ "authorId": req.params.authorId })
        if (oneAuthor === null) { // no author found in database
            res.status(404)
            return res.send("Author not found")
        }
        return res.json(oneAuthor) // author was found
    } catch (err) { // error occurred
        res.status(400)
        return res.send("Database query failed")
    }
}

//search authors
const searchAuthors = async(req, res) => {
    //first validate user input
    const validationErrors = expressValidator.validationResult(req)
    if (!validationErrors.isEmpty()) {
        return res.status(422).render('error', { errorCode: '422', message: 'Search works on alphabet characters only.' })

    }
    //if we get this far there are no validation errors so proceed with search
    var query = {}
    if (req.body.authorId !== '') {
        query["authorId"] = { $regex: new RegExp(req.body.authorId, 'i') }
    }
    if (req.body.first_name !== '') {
        query["first_name"] = { $regex: new RegExp(req.body.first_name, 'i') }
    }
    if (req.body.last_name !== '') {
        query["last_name"] = { $regex: new RegExp(req.body.last_name, 'i') }
    }
}

// change an author (POST)
const updateAuthor = async(req, res) => {
    const new_author = req.body // construct changed Author object from body of POST

    try {
        const author = await Author.findOne({ "authorId": req.body.authorId }) // check that an author with this Id already exists
        if (!author) { // if author is not already in database, return an error
            res.status(400)
            return res.send("Author not found in database")
        }

        Object.assign(author, new_author) // replace properties that are listed in the POST body
        let result = await author.save() // save updated author to database
        return res.send(result) // return saved author to sender

    } catch (err) { // error detected
        res.status(400)
        return res.send("Database update failed")
    }
}

// add an author (POST)
const addAuthor = async(req, res) => {
    const author = new Author(req.body) // construct a new Author object from body of POST

    try {
        let result = await author.save() // save new author object to database
        return res.send(result) // return saved object to sender
    } catch (err) { // error detected
        res.status(400)
        return res.send("Database insert failed")
    }
}

// remember to export the functions
module.exports = {
    getAllAuthors,
    getOneAuthor,
    searchAuthors,
    updateAuthor,
    addAuthor
}