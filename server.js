const express = require("express")
const bodyParser = require("body-parser")


const app = express()

// Port
var HTTP_PORT = 8000 

app.listen(HTTP_PORT, () => {
    console.log("Server running on port %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root 
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


app.use(function(req, res){
    res.status(404);
});

