require('dotenv').config()
const mongoose = require("mongoose")

console.log(process.env.PORT);

//connect to mongodb - database login retrieved from environment variables - you should use your own atlas cluster
CONNECTION_STRING = "mongodb+srv://vfzhu:<password>@cluster0.nv09y.mongodb.net/mylibraryapp?retryWrites=true&w=majority"
dbAddress = CONNECTION_STRING.replace("<username>", process.env.MONGO_USERNAME).replace("<password>", process.env.MONGO_PASSWORD)

console.log(dbAddress)

mongoose.connect(dbAddress || "mongodb://localhost", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    dbName: "mylibraryapp"
})

const db = mongoose.connection

db.on("error", err => {
    console.error(err);
    process.exit(1)
})

db.once("open", async() => {
    console.log("Mongo connection started on " + db.host + ":" + db.port)
})

require("./author")