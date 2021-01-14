const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const dotenv = require("dotenv");

let db = require("./src/db/database.js")

dotenv.config();
const app = express()

//** Middleware */
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//** Port */
var HTTP_PORT = 4000 
app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});

//** ROUTES */
//Test
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

//get users
    app.get("/api/users", (req, res, next) => {
        const sql = "select * from user"
        const params = []
        db.all(sql, params, (err, rows) => {
            if (err) {
            res.status(400).json({"error":err.message});
            return;
            }
            res.json({
                "message":"success",
                "data":rows
            })
        });
    });

//search user
    app.get("/api/user/:id", (req, res, next) => {
        const sql = "select * from user where id = ?"
        const params = [req.params.email]
        db.get(sql, params, (err, row) => {
            if (err) {
            res.status(400).json({"error":err.message});
            return;
            }
            res.json({
                "message":"success",
                "data":row
            })
        });
    });

//create users
    app.post("/api/user/", (req, res, next) => {
        const errors=[]
        if (!req.body.email){
            errors.push("No email");
        }
        if (!req.body.email){
            errors.push("No age");
        }
        if (errors.length){
            res.status(400).json({"error":errors.join(",")});
            return;
        }
        const data = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age

        }
        const sql ='INSERT INTO user (name, email, age) VALUES (?,?,?)'
        const params =[data.name, data.email, data.age]
        db.run(sql, params, function (err, result) {
            if (err){
                res.status(400).json({"error": err.message})
                return;
            }
            res.json({
                "message": "Creation successfull",
                "data": data,
                "id" : this.lastID
            })
        });
    })

//update user
app.patch("/api/user/:id", (req, res, next) => {
    const data = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age
    }
    const sql = `UPDATE user set 
    name = COALESCE(?,name), 
    email = COALESCE(?,email), 
    age = COALESCE(?,age) 
    WHERE id = ?`
    const params = [data.name, data.email, data.age, req.params.id]

    db.run(sql, params,function (err, result) {
        if (err){
            res.status(400).json({"error": res.message})
            return;
        }
        res.json({
            message: "success",
            data: data,
            changes: this.changes
        })
    });
})

//delete user
    app.delete("/api/user/:id", (req, res, next) => {
        db.run(
            'DELETE FROM user WHERE id = ?',
            req.params.id,
            function (err, result) {
                if (err){
                    res.status(400).json({"error": res.message})
                    return;
                }
                res.json({"message":"deleted", changes: this.changes})
        });
    })

    app.use((req, res) => {
      res.status(404).json({ message: "Direccion Inexistente." });
    });