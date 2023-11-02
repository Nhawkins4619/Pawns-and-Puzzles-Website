import express from "express"
import mysql from "mysql"
import cors from "cors"
const app = express();

app.use(cors())


app.use(express.json());

const db = mysql.createConnection({
    host: process.env.REACT_APP_HOST,
    user: process.env.REACT_APP_USER,
    password: process.env.REACT_APP_PASSWORD,
    database: process.env.REACT_APP_DATABASE,
    port: process.env.REACT_APP_PORT
})
app.get("/", (_req, res) => {
    res.json({ message: "Connected" });
});
//Api control that gets user data
app.post("/SignIn", async (req, res) => {
    try {
        const Email = req.body.Email;
        const Password = req.body.Password;
        db.query(
            "SELECT * FROM users WHERE Email = ? AND Password = ?;",
            [Email, Password],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    res.send({ message: "None", err: err })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None" })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that checks to see if email is valid to reset password
app.post("/ForgotPassword", async (req, res) => {
    try {
        const Email = req.body.Email;
        db.query(
            "SELECT * FROM users WHERE Email = ?;",
            [Email],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    res.send({ message: "None", err: err })
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None" })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "API" })
        console.log(`Your error: ${error.message}`)
    }
})
//Api control that updates the User password in the database based off of email 
app.post("/ResetPassword", async (req, res) => {
    try {
        const Email = req.body.Email;
        const Password = req.body.Password
        db.query(
            "UPDATE users SET Password = ? WHERE Email = ?;",
            [Password, Email],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    res.send({ message: "None", err: err })
                }
                else {
                    res.send(result)
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "API" })
        console.log(`Your error: ${error.message}`)
    }
})
//Api control that pulls all games from the game table and searches by wildcard keyword
app.post("/Games", async (req, res) => {
    try {
        var Gname = req.body.Gname;
        Gname = '%' + Gname + '%'
        console.log('Gname pt2 ', Gname)
        db.query(
            "SELECT * FROM game WHERE Gname LIKE ? ;",
            [Gname],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None", error: 'No result matches your query' })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that inserts new user entries into the user table
app.post("/Register", async (req, res) => {
    try {
        const EmailReg = req.body.EmailReg;
        const PasswordReg = req.body.PasswordReg;
        db.query(
            "INSERT INTO users (Email, Password) VALUES (?,?);",
            [EmailReg, PasswordReg],
            (err, result) => {
                console.log(`error message: ${err}`)
                console.log(`result:`)
                console.log(JSON.stringify(result))
                if (err) {
                    try {
                        console.log('error code:', err.code)
                        console.log('error code:', JSON.stringify(err.code))
                        if (JSON.stringify(err.code) == "ER_DUP_ENTRY") {
                            res.send({ message: "duplicate entry", err: err })
                        }
                        else {
                            res.send({ message: "None", err: err })
                        }
                    }
                    catch {
                        res.send({ message: "None", err: err })
                    }
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None" })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None" })
        console.log(`Your error: ${error.message}`)
    }
})
//Api control that joins the user table and the comment table so we may render all reviews 
app.post("/Comment", async (req, res) => {
    try {
        db.query(
            "SELECT X.ChatID, X.Comment, X.userID, Y.Email FROM reviews X INNER JOIN users Y ON X.userId = Y.userId",
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No result matches your query' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that allows inserting of a new comment into the comment table 
app.post("/AddComment", async (req, res) => {
    try {
        const comment = req.body.commentEntry;
        const userId = req.body.userId;
        db.query(
            "INSERT INTO reviews ( Comment, userId) VALUES(?,?)",
            [comment, userId],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that deletes comments from the comment table
app.post("/DeleteComment", async (req, res) => {
    try {
        const ChatID = req.body.reviewID
        db.query(
            "DELETE FROM `reviews` WHERE ChatID = ?",
            [ChatID],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that updates the comment based off of chatID
app.post("/UpdateComment", async (req, res) => {
    try {
        const comment = req.body.comment;
        const userId = req.body.userId
        db.query(
            "UPDATE reviews SET Comment = ? WHERE ChatID = ?;",
            [comment, userId],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control pulls all games for each vendor, or based off of vendorID
app.post("/GetGames", async (req, res) => {
    try {
        const VendorID = req.body.VendorID
        db.query(
            "SELECT * FROM game WHERE VendorID = ?;",
            [VendorID],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None", error: 'No result matches your query' })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that Adds a game to the game table
app.post("/AddGame", async (req, res) => {
    try {
        const Gname = req.body.Gname;
        const descp = req.body.descp;
        const price = req.body.price;
        const vendorId = req.body.vendorID;
        const Type = req.body.Type;
        db.query(
            "INSERT INTO game ( Gname, descp, price, VendorID, Type) VALUES(?,?,?,?,?)",
            [Gname, descp, price, vendorId, Type],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control the gets all vendors based off of wildcard search query
app.post("/GetVendor", async (req, res) => {
    try {
        var Vname = req.body.Vname;
        Vname = '%' + Vname + '%'
        console.log('Vname ', Vname)
        db.query(
            "SELECT * FROM vendors WHERE Vname LIKE ? ;",
            [Vname],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None", error: 'No result matches your query' })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that updates the game table based off gameID
app.post("/UpdateGames", async (req, res) => {
    try {
        const GameID = req.body.GameId;
        const Gname = req.body.Gname;
        const descp = req.body.descp;
        const price = req.body.price;
        const Type = req.body.Type;
        db.query(
            "UPDATE game SET Gname = ?, descp = ?, price = ?, Type = ?  WHERE GameID = ?;",
            [Gname, descp, price, Type, GameID],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that deletes a game based off GameID
app.post("/DeleteGame", async (req, res) => {
    try {
        const GameID = req.body.GameID;
        db.query(
            "DELETE FROM `game` WHERE GameID = ?",
            [GameID],
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else if (result.length > 0) {
                    res.send(result)
                }
                else {
                    res.send({ message: "None", error: 'No comment' })
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that orders games by Low to High
app.post("/AscGames", async (req, res) => {
    try {

        db.query(
            "SELECT * FROM game ORDER BY Price ASC ;",
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None", error: 'No result matches your query' })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
//Api control that orders games by High to Low
app.post("/DESCGames", async (req, res) => {
    try {

        db.query(
            "SELECT * FROM game ORDER BY Price DESC ;",
            async (err, result) => {
                if (err) {
                    res.send({ err: err.message })
                }
                else {
                    if (result.length > 0) {
                        res.send(result)
                    }
                    else {
                        res.send({ message: "None", error: 'No result matches your query' })
                    }
                }
            }
        );
    }
    catch (error) {
        res.send({ message: "None", error: { error } })
    }
})
app.listen('5000', () => {
    console.log("Connected to server")
})


