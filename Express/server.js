const express = require('express')
const app = express()
const path = require('path')
const ErrorHandler = require('./erros/ErrorHandler')
const mainRouter = require('./routes/index')
const productRouters = require('./routes/products')
//Envoirment Variables
const PORT = process.env.PORT || 3000

//Static Middleware

app.use(express.static("public"))




// Receiving Data from the Client into JSON Format in Express by default express is expecting a string
app.use(express.json())



//Normal Form Data Submission
// app.use(express.urlencoded({ extended: false }))





// EJS VIEW ENGINE
app.set('view engine', 'ejs')
// console.log(app.get("view engine"));
app.set('views', path.join(__dirname, '/templates')) // set name of folder where ejs files are stored
console.log(app.get("views"));
// app.get("/", (req,res) => {
//     res.render('index', {
//         title: "Home Page"
//     })
// })
// app.get("/about", (req,res) => {
//     res.render('about', {
//         title: "About Page"
//     })
// })



//Routing

// app.get("/", (req,res) => {
//     res.sendFile(path.resolve(__dirname) + '/index.html')
// })
// app.get("/about", (req,res) => {
//     res.sendFile(path.resolve(__dirname) + '/about.html')
// })

// External Routes (Routes from other files)

app.use(mainRouter)
app.use(productRouters)


// Error Handler Middleware
// app.use((req,res,next) => {
//     return res.json({message: "Page Not Found"})
// })

app.use((err,req, res, next) => {
    if(err instanceof ErrorHandler) {
        res.status(err.status).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    } else{
        res.status(500).json({
            error: {
                message: err.message,
                status: err.status
            }
        })
    }
    console.log("Error: ", err.message);
       
})

//Server Running
app.listen(PORT, () => {
    console.log(`Server running at ${PORT}`)
})

