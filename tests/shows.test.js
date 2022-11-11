const request = require("supertest")
const app = require('../server')
const seed = require('../seed')
const { db } = require("../db")
const { User } = require("../models")

beforeAll(async () => {
    await seed()
})

// GET Request - all shows from db /shows
describe('Testing /shows endpoint', () => {
    test('GET /shows', async () => {
        const response = await request(app).get('/shows')
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })
})

// GET Request - get specific show /shows/:id
describe('Testing /shows/:id endpoint', () => {

    test('Test of GET /shows/4 with valid id', async () => {
        const response = await request(app).get('/shows/4')
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
        expect(response.body.genre).toBe("Sitcom")
        expect(response.body.id).toBe(4)
        expect(response.body.title).toBe("American Horror Story")
    })

    test('Test of GET /shows/:id with invalid id', async () => {
        const response = await request(app).get("/shows/843")
        expect(response.statusCode).toBe(404)
        expect(response.error.text).toBe("Show does not exist")
    })
})

// GET Request - get shows of specific genre /shows/genres/Comedy
describe('Test of GET /shows/genres/:genre endpoint', () => {

    test('Test of this endpoint with a valid capitalised genre', async () => {
        const response = await request(app).get('/shows/genres/Comedy')
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
        expect(response.body[0].title).toBe("The Office")
        expect(response.body.length).toBe(4)
    })

    test('Test of this endpoint with a valid genre but it is not capitalised', async () => {
        const response = await request(app).get('/shows/genres/comedy')
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
        expect(response.body[0].title).toBe("The Office")
        expect(response.body.length).toBe(4)
    })

    test('Test of this endpoint with a invalid genre', async () => {
        const response = await request(app).get('/shows/genres/doesNotExist')
        expect(response.statusCode).toBe(404)
        expect(response.error.text).toBe("Invalid genre")
    })

})

// PUT Request - update a rating on a specific show using an endpoint that has been watched /shows/:id/watched
describe('Test of PUT /shows/:id/watched endpoint', () => {

    let showEdit = {
        rating: 5,
    }

    test('Test of this endpoint with a valid id', async () => {
        const response = await request(app).put('/shows/2/watched').send(showEdit)
        expect(response.statusCode).toBe(201)
    })

    test('Test of this endpoint with an invalid id', async () => {
        const response = await request(app).put('/shows/843/watched').send(showEdit)
        expect(response.statusCode).toBe(404)
        expect(response.error.text).toBe("Invalid show id")
    })

})

// PUT Request - update the status on a specific show from “cancelled” to “on-going” or vice versa /shows/:id/updates
describe('Test of PUT /shows/:id/updates endpoint', () => {

    let cancelShow = {
        status: 'cancelled',
    }

    let ongoingShow = {
        status: 'on-going'
    }

    let invalidStatus = {
        status: 'inv'
    }
    let invalidStatus2 = {
        status: 'invdwadwadwadwadwadwadawdwadawdawdwadawdawdawdawdawdawdawd'
    }
    let invalidStatus3 = {
        status: ''
    }

    test('Test of this endpoint toggling from on-going to cancelled', async () => {
        const response = await request(app).put('/shows/2/updates').send(cancelShow)
        expect(response.statusCode).toBe(201)
    })

    test('Test of this endpoint toggling from cancelled to on-going', async () => {
        const response = await request(app).put('/shows/2/updates').send(ongoingShow)
        expect(response.statusCode).toBe(201)
    })

    test('Test of this endpoint with an invalid id', async () => {
        const response = await request(app).put('/shows/843/updates').send(ongoingShow)
        expect(response.statusCode).toBe(404)
        expect(response.error.text).toBe("Invalid show id")
    })

    test('Test of this endpoint with an invalid status', async () => {
        const response = await request(app).put('/shows/843/updates').send(invalidStatus)
        expect(response.statusCode).toBe(400)
        expect(response.error.text).toBe("Invalid status")
    })

    test('Test of this endpoint with an invalid status', async () => {
        const response = await request(app).put('/shows/843/updates').send(invalidStatus2)
        expect(response.statusCode).toBe(400)
        expect(response.error.text).toBe("Invalid status")
    })

    test('Test of this endpoint with an invalid status', async () => {
        const response = await request(app).put('/shows/843/updates').send(invalidStatus3)
        expect(response.statusCode).toBe(400)
        expect(response.error.text).toBe("Invalid status")
    })

})

// DELETE Request - should be able to delete a specific show /shows/:id
describe('Test of DELETE /shows/:id endpoint', () => {

    test('Test of endpoint using valid id', async () => {
        const response = await request(app).delete('/shows/4')
        expect(response.statusCode).toBe(200)
    })

    test('Test of endpoint using an invalid id', async () => {
        const response = await request(app).delete('/shows/843')
        expect(response.statusCode).toBe(404)
        expect(response.error.text).toBe("Invalid show id")
    })

})
