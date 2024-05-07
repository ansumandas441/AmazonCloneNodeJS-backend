const supertest = require("supertest")
const app = require("../app");
const productData = require('./testData/data/product.test.data');

require("dotenv").config();

let token = '';
let editableProductId = '';
let searchOrGetId = '65a9acf346611ac10aea9790'

beforeAll(async () => {
  const response = await supertest(app)
  .post('/auth/api/login')
  .send({
    email:'test@gmail.com',
    password:'viltrum'
  });
  token = response.header['set-cookie'][0].split('token=')[1].split(';')[0];
});

describe("GET /product/api/getAll", ()=>{
  test(`should return all products`, async ()=>{
    return supertest(app)
        .get("/product/api/getAll")
        .set('Cookie', [`token=${token}`])
        .expect('Content-Type',/application\/json/)
        .expect(200)
  });

  test(`should return unauthorized when not authenticated`, async () => {
    // Make the request without an authentication token
    return supertest(app)
      .get("/product/api/getAll")
      .set('Cookie', [`token=invalidToken}`])
      .expect(401); // Assuming 401 is the status code for unauthorized access
  });
});

describe("GET /product/api/getById", ()=>{
  test(`should return one product`, async ()=>{
    return supertest(app)
        .get("/product/api/getById")
        .set('Cookie', [`token=${token}`])
        .query({id:searchOrGetId})
        .expect('Content-Type',/application\/json/)
        .expect(200)
  });
});

describe("GET /product/api/getByName", ()=>{
  test(`should return one product`, async ()=>{
    return supertest(app)
        .get("/product/api/getByName")
        .set('Cookie', [`token=${token}`])
        .query({name:'Mixer'})
        .expect('Content-Type',/application\/json/)
        .expect(200)
  });
});

describe("POST /product/api/add", ()=>{
  test(`should add one product`, async ()=>{
    return supertest(app)
        .post("/product/api/add")
        .set('Cookie', [`token=${token}`])
        .send(productData.product)
        .expect('Content-Type',/application\/json/)
        .expect(201)
        .then((res)=>{
          editableProductId = res.body._id;
        });
  });

  test(`should return error if name is missing`, async ()=>{
    return supertest(app)
        .post("/product/api/add")
        .set('Cookie', [`token=${token}`])
        .send(productData.faultyNameProduct)
        .expect('Content-Type',/application\/json/)
        .expect(400)
  });

  test(`should return error if price is missing`, async ()=>{
    return supertest(app)
        .post("/product/api/add")
        .set('Cookie', [`token=${token}`])
        .send(productData.faultyPriceProduct)
        .expect('Content-Type',/application\/json/)
        .expect(400)
  });

  test(`should return error if name and price is missing`, async ()=>{
    return supertest(app)
        .post("/product/api/add")
        .set('Cookie', [`token=${token}`])
        .send(productData.faultyNameAndPriceProduct)
        .expect('Content-Type',/application\/json/)
        .expect(400)
  });
});

describe("PUT /product/api/edit", ()=>{
  test(`should edit one product`, async ()=>{
    return supertest(app)
        .put("/product/api/edit")
        .set('Cookie', [`token=${token}`])
        .query({id:editableProductId})
        .send(productData.requpdateProduct)
        .expect('Content-Type',/application\/json/)
        .expect(200)
  });
});

describe("DELETE /product/api/delete", ()=>{
  test(`should delete one product`, async ()=>{
    return supertest(app)
        .del("/product/api/delete")
        .set('Cookie', [`token=${token}`])
        .query({id:editableProductId})
        .expect('Content-Type',/application\/json/)
        .expect(200)
  });
});

describe("GET /product/api/search", ()=>{
  test(`should search matched products`, async ()=>{
    return supertest(app)
        .get("/product/api/search")
        .set('Cookie', [`token=${token}`])
        .query({id:searchOrGetId})
        .expect('Content-Type',/application\/json/)
        .expect(200)
  });
});