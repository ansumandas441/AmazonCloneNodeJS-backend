const BASE_PORT = 3001
const BASE_URL = `http://localhost:${process.env.PORT || BASE_PORT}`;

module.exports = {
    BASE_URL,
    ADD_PRODUCTS_ENDPOINT: `${BASE_URL}/products/add`
}