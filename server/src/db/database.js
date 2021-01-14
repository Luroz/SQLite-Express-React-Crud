const sqlite3 = require('sqlite3').verbose()

const DB_SOURCE = "db.sqlite"

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      // Cannot open database
    console.error(err.message)
    throw err
    }else{
        db.run(`CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            age INTEGER,
            email UNIQUE
            )`,
        (err) => {
            if (err) {
                // Table already created
                console.log(err)
            }else{
                
                // var insert = 'INSERT INTO user (name, email, age) VALUES (?,?,?)'

                // db.run(insert, ["admin","admin@example.com", 25])
                // console.log("first insert")
            }
        });  
        console.log('Connected to the SQLite database.')
    }
});


module.exports = db