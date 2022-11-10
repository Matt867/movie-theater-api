const request = require("supertest")
const app = require('../server')

// GET Request - all shows from db /shows
describe('Testing /shows endpoint', () => {
    test('GET /shows', (done) => {
        request(app)
            .get('/shows')
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                typeof res.body == 'object'
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            });
    })
})

// GET Request - get specific show /shows/:id
describe('Testing /shows/:id endpoint', () => {

    test('Test of GET /shows/4 with valid id', (done) => {
        request(app)
            .get('/shows/4')
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {
                typeof res.body.data == 'object'
            })
            .expect((res) => {
                res.body.data === `{
                    "id": 4,
                    "title": "American Horror Story",
                    "genre": "Sitcom",
                    "rating": 5,
                    "status": "on-going",
                    "createdAt": "2022-11-10T15:52:48.775Z",
                    "updatedAt": "2022-11-10T15:52:48.775Z",
                    "userId": null
                }`
            })
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    })

    test('Test of GET /shows/:id with invalid id', (done) => {
        request(app)
            .get('/shows/843')
            .expect("Content-Type", /json/)
            .expect(404)
            .expect((res) => {
                typeof res.body === 'string'
            })
            .expect((res) => [
                res.body.message === "Show does not exist"
            ])
            .end((err, res) => {
                if (err) return done(err);
                return done()
            })
    })
})

// GET Request - get shows of specific genre /shows/genres/Comedy
describe('Test of GET /shows/genres/:genre endpoint', () => {

    test('Test of this endpoint with a valid capitalised genre', (done) => {
        request(app)
            .get('/shows/genres/Comedy')
            .expect("Content-Type", /json/)
            .expect(200)
            .expect((res) => {

            })
    })

})

// PUT Request - update a rating on a specific show using an endpoint that has been watched /shows/:id/watched


// PUT Request - update the status on a specific show from “canceled” to “on-going” or vice versa /shows/:id/updates


// DELETE Request - should be able to delete a specific show /shows/:id
