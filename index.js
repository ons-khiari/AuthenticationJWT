const express = require('express')
const app = express()
const dotenv = require('dotenv').config()
const PORT = process.env.PORT
const connectdb = require('./Config/db')
const authRoutes = require('./Routes/AuthRoutes')
const cors = require('cors')
const secretToken = require('./Helpers/token')


connectdb()
app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


// t7b tgenerati token jdid bch testa3mlou fel .env use this ^3^
// console.log("gnerating secret token:", secretToken.generateToken());