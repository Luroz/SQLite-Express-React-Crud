const sqlite3 = require('sqlite3').verbose()

const DB_SOURCE = "db.sqlite"

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      // Cannot open database
    console.error(err.message)
    throw err
    }else{
        db.run(`CREATE TABLE IF NOT EXISTS user (
            name text, 
            age INTEGER,
            email PRIMARY KEY UNIQUE
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err)
            }else{
                //Insert data at the inception of the db
            }
        });  
        console.log('Connected to the SQLite database.')
    }
});


module.exports = db