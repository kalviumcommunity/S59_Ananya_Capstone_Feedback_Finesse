const request = require("supertest")
const app = require("../app")
const mongoose = require('mongoose')
const User = require("../models/user-schema")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')

const createUser = async (userData) => {
  const { name, username, email, password, role } = userData
  const hashedPassword = bcrypt.hashSync(password, 10)
  const user = new User({ name, username, email, password: hashedPassword, role })
  await user.save()
  return user
}

beforeAll(async () => {
  await mongoose.connect(process.env.URI)
})

afterAll(async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
})

describe("Testing the paths", () => {
  jest.setTimeout(10000)

  test("It should test the root path", async () => {
    const response = await request(app).get("/")
    expect(response.statusCode).toBe(200)
  })

  describe('POST /register/signup', () => {
    jest.setTimeout(10000)

    test('It should create and register a new user successfully', async () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@jest.com',
        password: 'testpassword',
        role: 'user'
      }
      const response = await request(app).post('/register/signup').send(newUser)
      expect(response.statusCode).toBe(201)
      expect(response.body).toHaveProperty('message', 'User registered successfully')
      expect(response.body).toHaveProperty('token')
      const user = await User.findOne({ username: newUser.username })
      expect(user).toBeTruthy() 
    })

    test('It should return 400 if email already exists', async () => {
      const existingUser = {
        name: 'Existing User',
        username: 'existinguser',
        email: 'existing@jest.com',
        password: 'existingpassword',
        role: 'user'
      }
      await createUser(existingUser) 
      const newUser = { ...existingUser, username: 'newuser' }
      const response = await request(app).post('/register/signup').send(newUser)
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('message', 'An account already exists with the entered email')
    })

    test('It should return 400 if username already exists', async () => {
      const existingUser = {
        name: 'Existing User',
        username: 'existinguser',
        email: 'existinguser@jest.com',
        password: 'existingpassword',
        role: 'user'
      }
      await createUser(existingUser) 
      const newUser = { ...existingUser, email: 'newuser@jest.com' }
      const response = await request(app).post('/register/signup').send(newUser)
      expect(response.statusCode).toBe(400)
      expect(response.body).toHaveProperty('message', 'An account already exists with the entered username')
    })

    test('It should handle errors gracefully', async () => {
      await mongoose.connection.close()

      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@jest.com',
        password: 'testpassword',
        role: 'user'
      }
      const response = await request(app).post('/register/signup').send(newUser)
      expect(response.statusCode).toBe(500)
      expect(response.body).toHaveProperty('message', 'Internal server error')
      await mongoose.connect(process.env.URI)
    })
  })

  describe("POST /register/login", () => {
    jest.setTimeout(10000)
  
    test('should register login successfully with correct credentials', async () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@jest.com',
        password: 'testpassword',
        role: 'user'
      }
      await createUser(newUser) 
      const response = await request(app).post('/register/login').send({ username: 'testuser', password: 'testpassword' })
      expect(response.statusCode).toBe(200)
      expect(response.body).toHaveProperty('message', 'Login successful')
      expect(response.body).toHaveProperty('token')
    })
  
    test('should return 400 if user not found', async () => {
      const response = await request(app).post('/register/login').send({ username: 'nonexistentuser', password: 'somepassword' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toBe('User not found')
    })
  
    test('should return 400 if wrong password', async () => {
      const newUser = {
        name: 'Test User',
        username: 'testuser',
        email: 'testuser@jest.com',
        password: 'testpassword',
        role: 'user'
      }
      await createUser(newUser)
      const response = await request(app).post('/register/login').send({ username: 'testuser', password: 'wrongpassword' })
      expect(response.statusCode).toBe(400)
      expect(response.body).toBe('Wrong credentials')
    })
  
    test('should handle errors gracefully', async () => {
      await mongoose.connection.close()

      const response = await request(app).post('/register/login').send({ username: 'testuser', password: 'testpassword'})
      expect(response.statusCode).toBe(500)
      expect(response.body).toHaveProperty('message', 'Internal server error')
      await mongoose.connect(process.env.URI)
    })
  })

})
