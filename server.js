const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors");
const dotenv = require("dotenv");

let db = require("./src/db/database.js")

dotenv.config();
const app = express()

//middleware
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(function(req, res){
    res.status(404);
});
// Port
var HTTP_PORT = 8000 

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
        var sql = "select * from user"
        var params = []
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



