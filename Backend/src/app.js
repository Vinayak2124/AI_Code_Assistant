const express = require('express')
const app = express();
const cors = require('cors')
app.use(cors())

const aiRoutes = require("./routes/ai.routes")
app.use(express.json());
app.get("/", (req, res) => {
    res.send("Hello World!");
})

app.use('/ai',aiRoutes)

module.exports = app;