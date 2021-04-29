const express = require('express')

//add our router
const authorRouter = express.Router()

// express-validator to validate user data in forms
const expressValidator = require('express-validator')

//require the author controller
const authorController = require('../controllers/authorController.js')

// handle the GET request to get all authors
authorRouter.get('/', authorController.getAllAuthors)
    //handle the get req ti handle /:id path / get one author
authorRouter.get('/:authorId', authorController.getOneAuthor)
    //search for an author
authorRouter.post('/search', expressValidator.body('authorId').isAlpha().optional({ checkFalsy: true }), (req, res) =>
        authorController.searchAuthors(req, res)) //includes validation of user input
    //handle post requests to update one author
authorRouter.post('/:authorId', authorController.updateAuthor)
    //handle post requests to add one author
authorRouter.post('/', authorController.addAuthor)

//export the router
module.exports = authorRouter