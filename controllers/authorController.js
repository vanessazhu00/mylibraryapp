//link to author model
const authors = require("mongoose")

//import author model
const Author = mongoose.model("Author")

//handle request to get all authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find()
        return res.send(authors)
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
    }
}

// function to handle a req to a particular author
const getOneAuthor = async (req, res) => {
    try {
        const oneAuthor = await Author.findOne( {"authorID":req.params.id} )
        if(oneAuthor === null) { //no author found in db
            res.status(404)
            return res.send("Author not found")
        }
        return res.send(oneAuthor) //author was found
    } catch (err) {
        res.status(400)
        return res.send("Database query failed")
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
    getAllAuthors, getOneAuthor, addAuthor
}