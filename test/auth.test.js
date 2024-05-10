const supertest = require("supertest")
const app = require("../dist/src/app");
const authData = require('./testData/data/auth.test.data');
const User = require('../dist/src/models/userModel');

require("dotenv").config();

describe("POST /auth/api/register", ()=>{
    test(`should innitiate the registration process`, async ()=>{
      return supertest(app)
          .post("/auth/api/register")
          .send(authData.registrationData)
          .expect('Content-Type',/application\/json/)
          .expect(200)
        });
    }
);

describe("POST /auth/api/login", ()=>{
    test(`should log in the user`, async ()=>{
      return supertest(app)
          .post("/auth/api/login")
          .send(authData.loginData)
          .expect('Content-Type',/application\/json/)
          .expect(200)
        });
    }
);

afterAll(async ()=>{
    const deleteDoc = await User.deleteOne({email: authData.registrationData.email});
    console.log("DELETE DOC",deleteDoc);
});

