const express = require('express')
const app = express()
const db = require('./db')
const seed = require('./seed')
app.use(express.json())

// const userRouter = require('./routes/users.routes')
const showRouter = require('./routes/shows.routes')
const userRouter = require('./routes/users.routes')

// app.use("/users", userRouter)
app.use("/shows", showRouter)
app.use("/users", userRouter)

// app.listen(5001, async () => {
//     await seed()
// })

module.exports = app
