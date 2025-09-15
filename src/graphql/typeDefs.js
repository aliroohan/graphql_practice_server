const { gql } = require('graphql-tag');

const commonTypeDefs = `type User {
    _id: ID!
    name: String!
    email: String!
    password: String!
    role: String!
  }

  type Author {
    _id: ID!
    name: String!
    bio: String
  }

  type Book {
    _id: ID!
    isbn: String!
    title: String!
    author: Author!
    image_url: String!
    price: Float!
    quantity: Int!
    description: String
  }
  
  type BookOrder {
    book: Book!
    quantity: Int!
    price: Float!
  }

  type Cart {
    _id: ID!
    user: User!
    books: [BookOrder!]!
    totalAmount: Float!
  }

  type Order {
    _id: ID!
    user: User!
    books: [BookOrder!]!
    totalAmount: Float!
    status: String!
  }
`

const generalTypeDefs = gql`
  ${commonTypeDefs}

   enum Role {
      ADMIN
      USER
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  type Query {
    getAllBooks: [Book]
    getBook(id: ID!): Book
  }

  type Mutation {
    createUser(role: Role, user: UserInput!): User
    login(email: String!, password: String!): String!
  }
`

const userTypeDefs = gql`
  ${commonTypeDefs}


  enum Role {
      ADMIN
      USER
  }

  input UserInput {
    name: String!
    email: String!
    password: String!
  }

  input OrderInput {
    bookId: ID!
    quantity: Int!
    price: Float!
  }


  type Query {
    getAllBooks: [Book]
    getBook(id: ID!): Book
    getUser(id: ID!): User
    getAuthors: [Author]
    getAuthorById(id: ID!): Author
    getCart: Cart
    getOrders(id: ID!): [Order]
    getOrderById(id: ID!): Order
  }

  type Mutation {
    createUser(role: Role, user: UserInput!): User
    login(email: String!, password: String!): String!
    updateUser(id: ID!, user: UserInput!): User
    addToCart(bookId: ID!): Cart
    removeOneFromCart(bookId: ID!): Cart
    removeFromCart(bookId: ID!): Cart
    clearCart: Cart
    createOrder(books: [OrderInput!]!): Order
  }

`;

const adminTypeDefs = gql`
  ${commonTypeDefs}

  input UserInput {
    name: String
    email: String
    password: String
  }

  type Query {
    getAllBooks: [Book]
    getBook(id: ID!): Book
    getAllUsers: [User]
    getUser(id: ID!): User
    getAuthors: [Author]
    getAuthorById(id: ID!): Author
    getOrders(id: ID!): [Order]
    getOrderById(id: ID!): Order
  }

  type Mutation {
    updateUser(id: ID!, user: UserInput!): User
    deleteUser(id: ID!): User
    createAuthor(name: String!, bio: String): Author
    updateAuthor(id: ID!, name: String, bio: String): Author
    deleteAuthor(id: ID!): Author
    createBook(isbn: String!, title: String!, authorId: ID!, image_url: String!, price: Float!, quantity: Int!, description: String): Book
    updateBook(id: ID!, image_url: String, price: Float, quantity: Int, description: String): Book
    deleteBook(id: ID!): Book
    updateOrder(id: ID!, status: String!): Order
  }
`



module.exports = { userTypeDefs, adminTypeDefs, generalTypeDefs };