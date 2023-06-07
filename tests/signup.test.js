const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require ('./test_helper')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

describe('adding user', () => {
    beforeEach(async () => {
        await User.deleteMany({})
        const newUser = new User(helper.initialUsers[0])
        await newUser.save()
    })
    test('succeeds with a unique name and a password', async () => {
        const initialUsers = await helper.getUsersInDB()
        const newUser = {
            name: 'testUser',
            password: '123456',
        }
        await api
            .post('/api/signup')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const finalUsers = await helper.getUsersInDB()
        expect(finalUsers).toHaveLength(initialUsers.length + 1)
        
        const userNames = finalUsers.map(user => user.name)
        expect(userNames).toContain('testUser')
    })
    test('fails if name or password is missing', async () => {
        const initialUsers = await helper.getUsersInDB()
        const userWithNoPassword = {
            name: 'testUser',
        }
        const userWithNoName = {
            password: '123456'
        }

        await api
            .post('/api/signup')
            .send(userWithNoPassword)
            .expect(400)
        await api
            .post('/api/signup')
            .send(userWithNoName)
            .expect(400)
        
        const finalUsers = await helper.getUsersInDB()
        expect(finalUsers).toHaveLength(initialUsers.length)
    })
    test('fails with an existing name', async () => {
        const initialUsers = await helper.getUsersInDB()
        const newUser = {
            name: 'firstuser',
            password: '123456',
        }
        await api
            .post('/api/signup')
            .send(newUser)
            .expect(400)
        const finalUsers = await helper.getUsersInDB()
        expect(finalUsers).toHaveLength(initialUsers.length)
    })
    test('fails if name or password is below the required characters', async () => {
        const initialUsers = await helper.getUsersInDB()
        const userWithShortName = {
            name: 'te',
            password: '123456'
        }
        const userWithShortPassword = {
            name: 'test',
            password: '123'
        }

        await api
            .post('/api/signup')
            .send(userWithShortName)
            .expect(400)
        await api
            .post('/api/signup')
            .send(userWithShortPassword)
        
        const finalUsers = await helper.getUsersInDB()
        expect(finalUsers).toHaveLength(initialUsers.length)
    })

})

afterAll(async () => {
    await mongoose.connection.close()
})