// Source -> https://heynode.com/tutorial/process-user-login-form-expressjs/

const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:false }))

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

app.get('/success', (req, res) => {
    res.sendFile(__dirname+'/page/success.html')
})

app.post('/', (req, res) => {
    const username = req.body.username
    const password = req.body.password
    res.send(`Username: ${username} Password: ${password}`)
})

const port = 3000
app.listen(port, () => console.log(`App is running on port ${port}`))