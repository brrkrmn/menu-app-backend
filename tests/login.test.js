const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require ('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('login', () => {
    beforeEach(async () => {
        await helper.clearDB()
        await helper.addTestUserToDB()
    })
    test('succeeds with valid credentials', async () => {
        const user = helper.initialUsers[0]
        const response = await api
            .post('/api/login')
            .send(user)
            .expect(200)
            .expect('Content-Type', /application\/json/)

            const token = (response.body.token)
        expect(token).toBeDefined()
    })
    test('fails with invalid credentials', async () => {
        const user = helper.initialUsers[0]
        const response = await api
            .post('/api/login')
            .send({...user, password: 'wrongPassword'})
            .expect(401)
            .expect('Content-Type', /application\/json/)
        expect(response.body.error).toContain('Invalid name or password')
    })
})

afterAll(async () => {
    await mongoose.connection.close()
})