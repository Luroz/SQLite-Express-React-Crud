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
                
                // var insert = 'INSERT INTO user (name, email, age) VALUES (?,?,?)'
                // db.run(insert, ["admin","admin@example.com", 25])
                // db.run(insert, ["admin2","admin2@example.com", 25])
                // db.run(insert, ["admin3","admin3@example.com", 25])
                // db.run(insert, ["admin4","admin4@example.com", 25])
                // db.run(insert, ["admin5","admin5@example.com", 25])
                // db.run(insert, ["admin6","admin6@example.com", 25])
                // db.run(insert, ["admin7","admin7@example.com", 25])
                // db.run(insert, ["admin8","admin8@example.com", 25])
                // db.run(insert, ["admin9","admin9@example.com", 25])
                // db.run(insert, ["admin10","admin10@example.com", 25])
                // db.run(insert, ["admin11","admin11@example.com", 25])
                // db.run(insert, ["admin12","admin12@example.com", 25])
                // console.log("first insert")
            }
        });  
        console.log('Connected to the SQLite database.')
    }
});


module.exports = db