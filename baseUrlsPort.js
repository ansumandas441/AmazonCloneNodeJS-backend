const BASE_URL = `http://localhost:${process.env.PORT || 3001}`;

module.exports = {
    BASE_URL,
    ADD_PRODUCTS_ENDPOINT: `${BASE_URL}/products/add`
}