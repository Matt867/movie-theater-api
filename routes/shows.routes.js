const { Router } = require('express')
const { Show } = require('../models/Show')
const showRouter = Router()

showRouter.get('/', async (req, res) => {
    const shows = await Show.findAll()

    res.json(shows)
})

showRouter.get('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id)
        if (show) {
            res.json(show)
        } else {
            throw new Error("Show does not exist")
        }
    } catch (error) {
        res.status(404).send(error)
    }
})

// GET Request - get shows of specific genre /shows/genres/:genre
showRouter.get('/genres/:genre', async (req, res) => {
    try {
        const genre = req.params.genre.charAt(0).toUpperCase() + req.params.genre.slice(1);
        const shows = await Show.findAll({where: {genre: genre}})
        if (shows.length !== 0) {
            res.send(shows)
        } else {
            throw new Error("Invalid genre")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})


module.exports = showRouter
