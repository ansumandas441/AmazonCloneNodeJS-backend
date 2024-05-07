const supertest = require("supertest")
const app = require("../app");
const cartData = require('./testData/data/cart.test.data');
const { connectMongoDb } = require('../connections');
const mongoose = require('mongoose');

require("dotenv").config();

let token = '';
let editableProductId = '';
let searchOrGetId = '65a9acf346611ac10aea9790'

beforeAll(async () => {
    //Already present cart
    const response = await supertest(app)
    .post('/auth/api/login')
    .send({
      email:'hello2@gmail.com',
      password:'viltrum'
    });
    token = response.header['set-cookie'][0].split('token=')[1].split(';')[0];

    const disposableCartResponse = await supertest(app)
    .post('/auth/api/login')
    .send({
      email:'testCart@gmail.com',
      password:'viltrum'
    });
    disposableCartToken = disposableCartResponse.header['set-cookie'][0].split('token=')[1].split(';')[0];

    //create a disposable cart
    await supertest(app)
        .post("/cart/api/add")
        .set('Cookie', [`token=${disposableCartToken}`])
        .send(cartData.cartEntry)
    //      

    //No cart present
    const noCartResponse = await supertest(app)
    .post('/auth/api/login')
    .send({
      email:'test@gmail.com',
      password:'viltrum'
    });
    noCartToken = noCartResponse.header['set-cookie'][0].split('token=')[1].split(';')[0];
  }
); 

describe("GET /cart/api/view", ()=>{
    test(`should return all carts`, async ()=>{
      return supertest(app)
          .get("/cart/api/view")
          .set('Cookie', [`token=${token}`])
          .expect('Content-Type',/application\/json/)
          .expect(200)
    });
  
    test(`should return 400 if not cart found`, async ()=>{
        return supertest(app)
            .get("/cart/api/view")
            .set('Cookie', [`token=${noCartToken}`])
            .expect('Content-Type',/application\/json/)
            .expect(404)
      });

    test(`should return unauthorized when not authenticated`, async () => {
      // Make the request without an authentication token
      return supertest(app)
        .get("/cart/api/view")
        .set('Cookie', [`token=invalidToken}`])
        .expect(401); // Assuming 401 is the status code for unauthorized access
    });
  });

describe("GET /cart/api/total", ()=>{
    test(`should return the total order value of the cart`, async ()=>{
        return supertest(app)
            .get("/cart/api/total")
            .set('Cookie', [`token=${token}`])
            .send(cartData.cartEntry)
            .expect('Content-Type',/application\/json/)
            .expect(200)
        });  
    }
)    

describe("POST /cart/api/add", ()=>{
    test(`should add one product`, async ()=>{
      return supertest(app)
          .post("/cart/api/add")
          .set('Cookie', [`token=${token}`])
          .send(cartData.cartEntry)
          .expect('Content-Type',/application\/json/)
          .expect(200)
        });
    test(`should return product already exists`, async ()=>{
        return supertest(app)
            .post("/cart/api/add")
            .set('Cookie', [`token=${token}`])
            .send(cartData.cartEntry)
            .expect('Content-Type',/application\/json/)
            .expect(400)
            });    
    test(`should return invalid request`, async ()=>{
        return supertest(app)
            .post("/cart/api/add")
            .set('Cookie', [`token=${token}`])
            .send(cartData.invalidQuantityCart)
            .expect('Content-Type',/application\/json/)
            .expect(400)
        });
    test(`should return product not found`, async ()=>{
        return supertest(app)
            .post("/cart/api/add")
            .set('Cookie', [`token=${token}`])
            .send(cartData.nonExistentProductCart)
            .expect('Content-Type',/application\/json/)
            .expect(404)
        });          
    }
)

describe("POST /cart/api/checkout", ()=>{
    test(`should checkout the cart`, async ()=>{
        return supertest(app)
            .post("/cart/api/checkout")
            .set('Cookie', [`token=${disposableCartToken}`])
            .send(cartData.checkoutCartData)
            .expect('Content-Type',/application\/json/)
            .expect(200)
        });  
    }
) 

describe("PUT /cart/api/edit", ()=>{
    test(`should edit one product`, async ()=>{
      return supertest(app)
          .put("/cart/api/edit")
          .set('Cookie', [`token=${token}`])
          .send(cartData.editedCartEntry)
          .expect('Content-Type',/application\/json/)
          .expect(200)
        });
    test(`should return invalid request`, async ()=>{
        return supertest(app)
            .put("/cart/api/edit")
            .set('Cookie', [`token=${token}`])
            .send(cartData.invalidQuantityCart)
            .expect('Content-Type',/application\/json/)
            .expect(400)
        });    
    test(`should return cart could not be found`, async ()=>{
        return supertest(app)
            .put("/cart/api/edit")
            .set('Cookie', [`token=${noCartToken}`])
            .send(cartData.editedCartEntry)
            .expect('Content-Type',/application\/json/)
            .expect(404)
        });
    test(`should return product could not be found`, async ()=>{
        return supertest(app)
            .put("/cart/api/edit")
            .set('Cookie', [`token=${noCartToken}`])
            .send(cartData.editedCartEntry)
            .expect('Content-Type',/application\/json/)
            .expect(404)
        });        
    }
)

describe("DELETE /cart/api/remove", ()=>{
    test(`should delete one product`, async ()=>{
      return supertest(app)
          .del("/cart/api/remove")
          .set('Cookie', [`token=${token}`])
          .send(cartData.deleteCartEntry)
          .expect('Content-Type',/application\/json/)
          .expect(200)
        });
    }
)

describe("DELETE /cart/api/clear", ()=>{
    test(`should delete one product`, async ()=>{
      return supertest(app)
          .del("/cart/api/clear")
          .set('Cookie', [`token=${disposableCartToken}`])
          .expect('Content-Type',/application\/json/)
          .expect(200)
        });
    }
)