//link to author model
const authors = require('../models/author')

//handle request to get all authors
const getAllAuthors = (req, res) => {
    res.send(authors) // send list to browser
}

// function to handle a req to a particular author
const getAuthorByID = (req, res) => {
    //search for author in the db via id
    const author = authors.find(author => author.id === req.params.id);

    if (author){
        res.send(author); // send back the author details
    }
    else {
        //currently an emprt list will be sent if author not found
        res.send([]);
    }
}

//handle req to add an author
const addAuthor = (req, res) => {
    //assemble new author
    newAuthor = req.body
    //add to db
    authors.push(newAuthor)
    //return entire authors list to browser as a check
    res.send(authors)
}

module.exports = {
    getAllAuthors, getAuthorByID, addAuthor
}