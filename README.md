<p align="center">
  <img src="https://raw.githubusercontent.com/PKief/vscode-material-icon-theme/ec559a9f6bfd399b82bb44393651661b08aaf7ba/icons/folder-markdown-open.svg" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">AMAZONCLONENODEJS-BACKEND</h1>
</p>
<p align="center">
    <em>Node, Mongo, Connect.This slogan captures the essence of the backends use of Node.js, MongoDB, and connections to external services to facilitate commerce operations. It's catchy, memorable, and doesn't include the project name.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/github/license/ansumandas441/AmazonCloneNodeJS-backend?style=default&logo=opensourceinitiative&logoColor=white&color=0080ff" alt="license">
	<img src="https://img.shields.io/github/last-commit/ansumandas441/AmazonCloneNodeJS-backend?style=default&logo=git&logoColor=white&color=0080ff" alt="last-commit">
	<img src="https://img.shields.io/github/languages/top/ansumandas441/AmazonCloneNodeJS-backend?style=default&color=0080ff" alt="repo-top-language">
	<img src="https://img.shields.io/github/languages/count/ansumandas441/AmazonCloneNodeJS-backend?style=default&color=0080ff" alt="repo-language-count">
<p>
<p align="center">
	<!-- default option, no dependency badges. -->
</p>

<br><!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary><br>

- [ Overview](#-overview)
- [ Features](#-features)
- [ Repository Structure](#-repository-structure)
- [ Modules](#-modules)
- [ Getting Started](#-getting-started)
  - [ Installation](#-installation)
  - [ Usage](#-usage)
  - [ Tests](#-tests)
- [ Project Roadmap](#-project-roadmap)
- [ Contributing](#-contributing)
- [ License](#-license)
- [ Acknowledgments](#-acknowledgments)
</details>
<hr>

##  Overview

The AmazonCloneNodeJS-backend is a robust Node.js solution powering an e-commerce application. It manages user authentication, handles product creation and CRUD operations, routes payment transactions through Stripe, and supports cart functionality. The project initializes with crucial dependencies like Express, Mongoose, and MongoDB, providing a foundation for server setup, CORS, routing, and database interactions. Connections to external services like payment gateways are centralized, ensuring seamless communication between components. This comprehensive backend infrastructure facilitates user registration, product listing, cart manipulation, order processing, and secure access control.

---

##  Features



---

##  Repository Structure

```sh
└── AmazonCloneNodeJS-backend/
    ├── LICENSE
    ├── README.md
    ├── baseUrlsPort.js
    ├── certificates
    │   └── X509-cert-2381793436636801278.pem
    ├── connections.js
    ├── controllers
    │   ├── authController.js
    │   ├── cartController.js
    │   ├── orderController.js
    │   ├── paymentController.js
    │   └── productController.js
    ├── install_package_notes
    ├── middlewares
    │   └── authMiddleWares.js
    ├── models
    │   ├── cartModel.js
    │   ├── couponModel.js
    │   ├── orderModel.js
    │   ├── productModel.js
    │   └── userModel.js
    ├── new.js
    ├── package-lock.json
    ├── package.json
    ├── products.js
    ├── routes
    │   ├── authRouter.js
    │   ├── cartRouter.js
    │   ├── index.js
    │   ├── orderRouter.js
    │   ├── paymentRouter.js
    │   ├── productRouter.js
    │   └── staticRouter.js
    ├── server.js
    ├── service
    │   └── auth.js
    └── views
        └── signup.ejs
```

---

##  Modules

<details closed><summary>.</summary>

| File                                                                                                                  | Summary                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                   | ---                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| [baseUrlsPort.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/baseUrlsPort.js)             | Export configurable base URL and API endpoint for adding products in this Node.JS backend project.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| [package.json](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/package.json)                   | Initiates Node.js backend project amazonclonebackend with defined dependencies like Express, Mongoose, Stripe, and more in the package.json file. This configuration enables server setup, CORS support, routing, and authentication services within the larger AmazonClone repository framework.                                                                                                                                                                                                                                                                                                                                                                                                                        |
| [products.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/products.js)                     | Create and manage product data by exporting a Mongoose model based on a schema, defining title, image URL, price, and rating fields in the repositorys backend architecture.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| [package-lock.json](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/package-lock.json)         | The `connections.js` file in the given `AmazonCloneNodeJS-backend` repository is a crucial component of the projects architecture, which focuses on handling various connections between different services and modules within the system.By analyzing the repository structure, this file can be found under the root directory among other files like controllers and certificates. Its primary purpose lies in managing and establishing links to external services such as payment gateways or databases, enabling seamless data exchange and functionality between components. This centralized approach ensures a consistent and efficient methodology for making external connections throughout the application. |
| [server.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/server.js)                         | Initialize Express server with CORS and cookie-parser middleware. Configure view engine, content security policy, and error handling. Connect to MongoDB. Import routes for authentication, products, payment, and cart, protecting some with access level restrictions. Listen on defined port.                                                                                                                                                                                                                                                                                                                                                                                                                         |
| [connections.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/connections.js)               | Initiates database connection using Mongoose and config data in parent repository. Establishes a connection to MongoDB via the provided URL and optional SSL options upon server startup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| [install_package_notes](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/install_package_notes) | Express for routing, CORS for cross-origin requests, development dependency Nodemon, MongoDB database and connector Mongoose, authentication tokens, user validation (bcrypt, uuid), ELK stack, and payment processor Stripe.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| [new.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/new.js)                               | Establishes MongoDB connection for the application using Mongoose and X.509 certificate-based authentication. Configures TestModel schema, retrieves document count from testDB database, and eventually disconnects after operation completion.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

</details>

<details closed><summary>service</summary>

| File                                                                                              | Summary                                                                                                                                                           |
| ---                                                                                               | ---                                                                                                                                                               |
| [auth.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/service/auth.js) | Generates JSON web tokens for user sessions in this Node.js backend, using the provided secret key. Implements functions to set and get session data from tokens. |

</details>

<details closed><summary>middlewares</summary>

| File                                                                                                                        | Summary                                                                                                                                                                                                                  |
| ---                                                                                                                         | ---                                                                                                                                                                                                                      |
| [authMiddleWares.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/middlewares/authMiddleWares.js) | This middleware module handles user session verification by decoding and checking tokens using the auth service. Additionally, it restricts access based on given roles, ensuring secure routes for specific user types. |

</details>

<details closed><summary>models</summary>

| File                                                                                                             | Summary                                                                                                                                                                                                                                                                               |
| ---                                                                                                              | ---                                                                                                                                                                                                                                                                                   |
| [userModel.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/models/userModel.js)       | Model user data with Mongoose in this file, defining schema for fields like username, email, role, and password. Instantiate Mongoose model User and export it for database operations.                                                                                               |
| [orderModel.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/models/orderModel.js)     | Model order schema for an e-commerce platform using Mongoose in Node.js, defining schema for user id, product list with product Id and quantity, shipping address, status, updated at, and payment Id. Creates an Order model to export for further application usage.                |
| [cartModel.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/models/cartModel.js)       | Create a Mongoose schema for the cart model in this backend project, defining an email property and an array of products with productId, name, price, total, and quantity properties, as well as subTotalPrice. Exports the Cart model.                                               |
| [productModel.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/models/productModel.js) | Model product data by defining its schema using Mongoose in this file. The schema includes essential attributes like name, price, description, and tags for each product. Mongoose converts the schema into a model named Product which is exported for usage within the application. |
| [couponModel.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/models/couponModel.js)   | Creates a Mongoose model, Coupon, for managing coupons within the application, defining schema properties for code, discount type, value, expiration date, usage limit, used count, and product restrictions.                                                                         |

</details>

<details closed><summary>views</summary>

| File                                                                                                  | Summary                                                                                                                                                                                                                                                                              |
| ---                                                                                                   | ---                                                                                                                                                                                                                                                                                  |
| [signup.ejs](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/views/signup.ejs) | Create visually engaging sign-up pages for users in this Node.JS application. The views/signup.ejs file is responsible for rendering the HTML structure and content for the sign-up route, enhancing user experience and registration functionality within the backend architecture. |

</details>

<details closed><summary>controllers</summary>

| File                                                                                                                            | Summary                                                                                                                                                                                                                                                                                                                                                                  |
| ---                                                                                                                             | ---                                                                                                                                                                                                                                                                                                                                                                      |
| [paymentController.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/controllers/paymentController.js) | Processes Stripe payments in this Node.JS backend by creating and confirming payment intents. Calculates total price from request items and communicates with the Stripe API to facilitate transactions.                                                                                                                                                                 |
| [productController.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/controllers/productController.js) | Create an engaging product controller that handles CRUD operations efficiently using Express and MongoDB. Design routes for adding, getting, editing price, deleting products, and searching with queries. Ensure each action returns appropriate status codes and JSON responses to enable seamless interaction between front-end applications and the back-end server. |
| [authController.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/controllers/authController.js)       | The authController.js file handles user registration and login operations in the application by validating provided email and password inputs against existing records, hashing passwords, creating new users if necessary, and generating session tokens for authentication.                                                                                            |
| [cartController.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/controllers/cartController.js)       | Retrieve product details with id.2. Update product quantity.3. Add a new product to cart.4. Delete a product from cart.5. Delete the entire cart.6. View the contents of a cart and total price.7. Calculate the price in real-time. (optional)8. Use coupons and apply discounts (optional).9. Finalize order by checking out and clearing cart.                        |
| [orderController.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/controllers/orderController.js)     | The `orderController.js` file processes requests for placing single orders, cart orders, getting order details, and retrieving order status. It interacts with the Order model in the cartModel.js for handling various order-related operations.                                                                                                                        |

</details>

<details closed><summary>routes</summary>

| File                                                                                                               | Summary                                                                                                                                                                                                                            |
| ---                                                                                                                | ---                                                                                                                                                                                                                                |
| [orderRouter.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/orderRouter.js)     | Routes the incoming requests for order-related functionality in this Amazon clone Node.js backend. Imports orderController functions to handle getting orders, order details, and order status. Exports express router as default. |
| [productRouter.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/productRouter.js) | Define and handle HTTP requests. This file exports Express routers for adding, editing, deleting, getting product details by ID or name, fetching all products, and searching them. (routes/productRouter.js)                      |
| [paymentRouter.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/paymentRouter.js) | Manage and process payment transactions by routing requests to appropriate controllers. Routes for creating payment intents and confirming payments using paymentController.                                                       |
| [staticRouter.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/staticRouter.js)   | It exports an Express router handling GET requests for the /signup endpoint, rendering the signup view. Integral to displaying the sign-up page within this backend application.                                                   |
| [index.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/index.js)                 | Navigate through the Express application by handling base URL routes in this file. Routes for homepage, API documentation, and error handling are defined, ensuring seamless interaction with the AmazonCloneNodeJS-backend.       |
| [cartRouter.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/cartRouter.js)       | Route newcomer, cartRouter.js facilitates interactions with the shopping cart. It processes additions, checkout, calculates totals, handles edits, and offers cart viewing, removal, and deletion utilizing linked cartController. |
| [authRouter.js](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/master/routes/authRouter.js)       | Route file for handling user authentication in express-based backend application. Contains post routes for registration, login, and logout, each dispatching respective functions from authController to process the requests.     |

</details>

---

##  Getting Started

**System Requirements:**

* **JavaScript**: `version x.y.z`

###  Installation

<h4>From <code>source</code></h4>

> 1. Clone the AmazonCloneNodeJS-backend repository:
>
> ```console
> $ git clone https://github.com/ansumandas441/AmazonCloneNodeJS-backend
> ```
>
> 2. Change to the project directory:
> ```console
> $ cd AmazonCloneNodeJS-backend
> ```
>
> 3. Install the dependencies:
> ```console
> $ npm install
> ```

###  Usage

<h4>From <code>source</code></h4>

> Run AmazonCloneNodeJS-backend using the command below:
> ```console
> $ node app.js
> ```

###  Tests

> Run the test suite using the command below:
> ```console
> $ npm test
> ```

---

##  Project Roadmap

- [X] `► INSERT-TASK-1`
- [ ] `► INSERT-TASK-2`
- [ ] `► ...`

---

##  Contributing

Contributions are welcome! Here are several ways you can contribute:

- **[Report Issues](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/issues)**: Submit bugs found or log feature requests for the `AmazonCloneNodeJS-backend` project.
- **[Submit Pull Requests](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/blob/main/CONTRIBUTING.md)**: Review open PRs, and submit your own PRs.
- **[Join the Discussions](https://github.com/ansumandas441/AmazonCloneNodeJS-backend/discussions)**: Share your insights, provide feedback, or ask questions.

<details closed>
<summary>Contributing Guidelines</summary>

1. **Fork the Repository**: Start by forking the project repository to your github account.
2. **Clone Locally**: Clone the forked repository to your local machine using a git client.
   ```sh
   git clone https://github.com/ansumandas441/AmazonCloneNodeJS-backend
   ```
3. **Create a New Branch**: Always work on a new branch, giving it a descriptive name.
   ```sh
   git checkout -b new-feature-x
   ```
4. **Make Your Changes**: Develop and test your changes locally.
5. **Commit Your Changes**: Commit with a clear message describing your updates.
   ```sh
   git commit -m 'Implemented new feature x.'
   ```
6. **Push to github**: Push the changes to your forked repository.
   ```sh
   git push origin new-feature-x
   ```
7. **Submit a Pull Request**: Create a PR against the original project repository. Clearly describe the changes and their motivations.
8. **Review**: Once your PR is reviewed and approved, it will be merged into the main branch. Congratulations on your contribution!
</details>

<details closed>
<summary>Contributor Graph</summary>
<br>
<p align="center">
   <a href="https://github.com{/ansumandas441/AmazonCloneNodeJS-backend/}graphs/contributors">
      <img src="https://contrib.rocks/image?repo=ansumandas441/AmazonCloneNodeJS-backend">
   </a>
</p>
</details>

---

##  License

This project is protected under the [SELECT-A-LICENSE](https://choosealicense.com/licenses) License. For more details, refer to the [LICENSE](https://choosealicense.com/licenses/) file.

---

##  Acknowledgments

- List any resources, contributors, inspiration, etc. here.

[**Return**](#-overview)

---
