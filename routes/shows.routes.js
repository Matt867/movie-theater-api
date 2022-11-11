const { Router } = require('express')
const { Show } = require('../models/Show')
const showRouter = Router()

// GET Request - all shows from db /shows
showRouter.get('/', async (req, res) => {
    const shows = await Show.findAll()

    res.json(shows)
})

// GET Request - get specific show /shows/:id
showRouter.get('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id)
        if (show) {
            res.json(show)
        } else {
            throw new Error("Show does not exist")
        }
    } catch (error) {
        res.status(404).send(error.message)
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


// PUT Request - change a shows rating
showRouter.put('/:id/watched', async (req, res) => {
    try {
        show = await Show.findByPk(req.params.id);
        if (show) {
            await Show.update(req.body, { where: { id: req.params.id } })
            res.sendStatus(201)
        } else {
            throw new Error("Invalid show id")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// PUT Request - update the status on a specific show from “canceled” to “on-going” or vice versa /shows/:id/updates
showRouter.put('/:id/updates', async (req, res) => {
    const validStatuses = ['cancelled', 'on-going']
    try {
        show = await Show.findByPk(req.params.id);
        if (req.body.status && req.body.status.length > 5 && req.body.status.length < 25){
            if (show) {
                await Show.update(req.body, {where: {id: req.params.id}});
                res.sendStatus(201)
            } else {
                res.status(404).send("Invalid show id")
            }
        } else {
            throw new Error("Invalid status")
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

// DELETE Request - should be able to delete a specific show /shows/:id
showRouter.delete('/:id', async (req, res) => {
    try {
        const show = await Show.findByPk(req.params.id)
        if (show) {
            await show.destroy()
            res.sendStatus(200)
        } else {
            throw new Error("Invalid show id")
        }
    } catch (error) {
        res.status(404).send(error.message)
    }
})




module.exports = showRouter
