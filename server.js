// source : https://codeshack.io/basic-login-system-nodejs-express-mysql/
const mysql = require('mysql')
const express = require('express')
const session = require('express-session')
const path = require('path')

const connection = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'if-management-system'
})

const app = express()

app.use(session({
    secret : 'secret',
    resave : true,
    saveUninitialized : true
}))
app.use(express.json)
app.use(express.urlencoded({ extended : true }))
app.use(express.static(path.join(__dirname, 'static')))


app.get('/', function(request, response){
    response.sendFile(path.join(__dirname+'/index.html'))
})

app.post('/auth', function(request, response){
    const username = request.body.username
    const password = request.body.password

    if (username && password){
        connection.query('SELECT * FROM user WHERE username = ? AND password = ?', [username, password], function(error, results, fields){
            if (error) throw error
            if (results.length > 0){
                request.session.loggedin = true
                request.session.username = username

                response.redirect('/home')
            } else {
                response.send('Incorrect username and/or password')
            }
            response.end()
        })
    } else {
        response.send('please enter username and password')
        response.end()
    }
})

app.get('/home', function(request, response){
    if (request.session.loggedin){
        response.sendFile(path.join(__dirname+'/page/success.html'))
    } else {
        response.send('Please login to view this page')
    }
    response.end()
})

const port = 3000
app.listen(port, () => console.log(`App is listening on port ${port}`))