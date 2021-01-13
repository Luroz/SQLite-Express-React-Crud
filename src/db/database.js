const sqlite3 = require('sqlite3').verbose()
const md5 = require('md5')

const DB_SOURCE = "db.sqlite"

let db = new sqlite3.Database(DB_SOURCE, (err) => {
    if (err) {
      // Cannot open database
    console.error(err.message)
    throw err
    }else{
        db.run(`CREATE TABLE IF NOT EXIST user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name text, 
            email text UNIQUE, 
            password text, 
            age INTEGER
            CONSTRAINT email_unique UNIQUE (email)
            )`,
        (err) => {
            if (err) {
                // Table already created
            }else{
                
                var insert = 'INSERT INTO user (name, email, password, age) VALUES (?,?,?,?)'

                db.run(insert, ["admin","admin@example.com",md5("admin123456"), 25])
                console.log("first insert")
            }
        });  
        console.log('Connected to the SQLite database.')
    }
});


module.exports = db