const server = require('../api/server')
const request = require('supertest')

const { add } = require('../users/users-model')

const db = require('../database/dbConfig')

it('should set db environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing')
})

describe('Testing login endpoint', () => {
    const user = { username: "testtest", password: "testtest" }

})

describe('testing register and login', () => {
    describe("registering a new user", () => {
        const newUser = { username: 'Testuser', password: 'thisistest' }
        // beforeEach(() => {
        //     return db('users').truncate()
        // })
        it('should add user in spot 2', async () => {
            await add(newUser)
        })
        //This stops working when you comment out the truncate LOL
        it('should return status 200', async () => {
            return request(server)
                .post('/api/auth/register')
                .send({
                    username: 'testuser',
                    password: 'testuser'
                })
                .then(res => {
                    expect(res.status).toBe(201)
                    expect(res.type).toBe("application/json")
                })
        })
        //This works if you comment out the before each
        it('should return a token', () => {
            return request(server).post('/api/auth/login')
                .send({
                    username: 'testuser',
                    password: 'testuser'
                })
                .then(res => {
                    // put this as expect 400 because of the before each, change to 200 if you comment out before each
                    expect(res.status).toBe(200)
                    expect(res.type).toBe("application/json")
                })
        })
    })
})






