const request = require("supertest")
const seed = require("../seed")
const app = require('../server')

// GET Request - all users /users
describe('Testing /users endpoint', () => {
    test('GET /users', async () => {
        const response = await request(app).get("/users")
        expect(response.headers['content-type']).toEqual(expect.stringContaining("json"))
        expect(response.statusCode).toBe(200)
    })
})

// GET Request - one user /users/:id
describe('Testing /users/:id endpoint', () => {

    test('Test of GET /users/2 with valid id', async () => {
        const response = await request(app).get("/users/2")
        expect(response.statusCode).toBe(200)
        expect(response.body.id).toBe(2)
        expect(response.body.username).toBe("someone@gmail.com")
        expect(response.body.password).toBe("asdfsAS2@1")
    })

    test('Test of GET /users/:id with invalid id', async () => {
        const response = await request(app).get("/users/843")
        expect(response.statusCode).toBe(404)
        expect(response.error.text).toBe("User does not exist")
    })
})


// GET Request - all shows watched by a user /users/:UserId/shows


// PUT Request - update and add a show if a user has watched it /users/:UserId/shows/:showid
