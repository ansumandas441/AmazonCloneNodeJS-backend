const productData = {
  product: {
    'name': 'test product',
    'price': 100,
    'description': 'test product description',
    'tag': [
      'latest',
    ],
  },
  faultyNameProduct: {
    'price': 100,
    'description': 'test product description',
    'tag': [
      'latest',
    ],
  },
  faultyPriceProduct: {
    'name': 'test product',
    'description': 'test product description',
    'tag': [
      'latest',
    ],
  },
  faultyNameAndPriceProduct: {
    'description': 'test product description',
    'tag': [
      'latest',
    ],
  },
  requpdateProduct: {
    'name': 'test product',
    'price': 1,
    'description': 'This is test product description',
    'tags': ['latest1','latest2'],
  },
};
export default productData;