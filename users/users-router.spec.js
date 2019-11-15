const db = require('../database/dbConfig')
const server = require('../api/server')
const request = require('supertest')

const { find } = require('./users-model')

describe('Will return all users(1 expected)', () => {
    it('should return properly', async () => {
        await find()
    })

    it("should return 401 because request is not authorized", () => {
        return request(server).get('/api/users').then(res => {
            expect(res.status).toBe(401)
        })
    })
})