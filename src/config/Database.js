const mongoose = require("mongoose");
require('dotenv').config();

class Database {
    constructor() {
        this.connection = null;
    }

    connect() {
        console.log("Connecting to the database....");

        mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }).then(() => {
            console.log("Connected to database");
            this.connection = mongoose.connection;
        }).catch(err => {
            console.log(err);
        })
    }
}

module.exports = Database;