const express = require('express')

//add our router
const authorRouter = express.Router()

//require the author controller
const authorController = require('../controllers/authorController.js')

// handle the GET request to get all authors
authorRouter.get('/', authorController.getAllAuthors)
//handle the get req ti handle /:id path / get one author
authorRouter.get('/:authorId', authorController.getOneAuthor)
//handle post requests to add one author
authorRouter.post('/', authorController.addAuthor)

//export the router
module.exports = authorRouter