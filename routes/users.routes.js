const { Router } = require('express')
const { User, Show } = require('../models/index')
const userRouter = Router()

// GET Request - all users /users
userRouter.get('/', async (req, res) => {
    const users = await User.findAll()

    res.json(users)
})

// GET Request - one user /users/:id
userRouter.get('/:id', async (req, res) => {
    const id = req.params.id
    try {
        const user = await User.findByPk(id)
        if (user) {
            res.json(user)
        } else {
            throw new Error("User does not exist")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// GET Request - all shows watched by a user /users/:UserId/shows
userRouter.get('/:UserId/shows', async (req, res) => {
    const UserId = req.params.UserId
    try {
        const shows = await Show.findAll({where: { userId: UserId }})
        if (shows) {
            res.json(shows)
        } else {
            throw new Error("Invalid user id")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// PUT Request - update and add a show if a user has watched it /users/:UserId/shows/:showid
userRouter.put('/:UserId/shows/:ShowId', async (req, res) => {
    const UserId = req.params.UserId
    const ShowId = req.params.ShowId
    try {
        const show = await Show.findByPk(ShowId)
        const user = await User.findByPk(UserId)
        if (show && user) {
            await show.setUser(user)
            res.sendStatus(201)
        } else {
            throw new Error("Invalid ShowId or UserId")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = userRouter
