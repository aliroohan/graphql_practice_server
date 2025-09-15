const userService = require('../services/user');
const bookService = require('../services/book');
const authorService = require('../services/author');
const cartService = require('../services/cart');
const orderService = require('../services/order');

const requireAuth = (user) => {
    if (!user || !user._id) {
        throw new Error('Unauthorized');
    }
};

const generalResolvers = {
    Query: {
        getAllBooks: async () => {
            return await bookService.getAllBooks();
        },
        getBook: async (_, { id }) => {
            return await bookService.getBookById(id);
        }
    },
    Mutation: {
        createUser: async (_, { role, user }) => {
            const payload = role ? { ...user, role } : user;
            return await userService.createUser(payload);
        },
        login: async (_, { email, password }) => {
            const { token } = await userService.login(email, password);
            return token;
        }
    },
    Book: {
        author: async (book) => {
            const authorId = book.author;
            return await authorService.getAuthorById(authorId);
        }
    }
};

const userResolvers = {
    Query: {
        getUser: async (_, { id }) => {
            return await userService.getUserById(id);
        },
        getAuthors: async () => {
            return await authorService.getAllAuthors();
        },
        getAuthorById: async (_, { id }) => {
            return await authorService.getAuthorById(id);
        },
        getCart: async (_, __, { user }) => {
            requireAuth(user);
            return await cartService.getCart(user._id);
        },
        getOrders: async (_, { id }) => {
            return await orderService.getOrders(id);
        },
        getOrderById: async (_, { id }) => {
            return await orderService.getOrderById(id);
        }
    },
    Mutation: {
        updateUser: async (_, { id, user }) => {
            return await userService.updateUser(id, user);
        },
        addToCart: async (_, { bookId }, { user }) => {
            requireAuth(user);
            const cart = await cartService.addToCart(user._id, bookId);
            return cart;
        },
        removeOneFromCart: async (_, { bookId }, { user }) => {
            requireAuth(user);
            return await cartService.removeOneFromCart(user._id, bookId);
        },
        removeFromCart: async (_, { bookId }, { user }) => {
            requireAuth(user);
            return await cartService.removeItemFromCart(user._id, bookId);
        },
        clearCart: async (_, __, { user }) => {
            requireAuth(user);
            return await cartService.clearCart(user._id);
        },
        createOrder: async (_, { books }, { user }) => {
            requireAuth(user);
            const mappedBooks = (books || []).map(b => ({ book: b.bookId, quantity: b.quantity, price: b.price }));
            return await orderService.createOrder(user._id, mappedBooks);
        }
    },
    Book: {
        author: async (book) => {
            const authorId = book.author;
            return await authorService.getAuthorById(authorId);
        }
    },
    BookOrder: {
        book: async (bookOrder) => {
            const bookId = bookOrder.book;
            return await bookService.getBookById(bookId);
        }
    },
    Cart: {
        user: async (cart) => {
            const userId = cart.user;
            return await userService.getUserById(userId);
        }
    },
    Order: {
        user: async (order) => {
            const userId = order.user;
            return await userService.getUserById(userId);
        }
    }
};

const adminResolvers = {
    Query: {
        getAllBooks: async () => {
            return await bookService.getAllBooks();
        },
        getBook: async (_, { id }) => {
            return await bookService.getBookById(id);
        },
        getAllUsers: async () => {
            return await userService.getAllUsers();
        },
        getUser: async (_, { id }) => {
            return await userService.getUserById(id);
        },
        getAuthors: async () => {
            return await authorService.getAllAuthors();
        },
        getAuthorById: async (_, { id }) => {
            return await authorService.getAuthorById(id);
        },
        getOrders: async (_, { id }) => {
            return await orderService.getOrders(id);
        },
        getOrderById: async (_, { id }) => {
            return await orderService.getOrderById(id);
        }
    },
    Mutation: {
        updateUser: async (_, { id, user }) => {
            return await userService.updateUser(id, user);
        },
        deleteUser: async (_, { id }) => {
            return await userService.deleteUser(id);
        },
        createAuthor: async (_, { name, bio }) => {
            return await authorService.createAuthor({ name, bio });
        },
        updateAuthor: async (_, { id, name, bio }) => {
            return await authorService.updateAuthor(id, { name, bio });
        },
        deleteAuthor: async (_, { id }) => {
            return await authorService.deleteAuthor(id);
        },
        createBook: async (_, { isbn, title, authorId, image_url, price, quantity, description }) => {
            return await bookService.createBook({ isbn, title, author: authorId, image_url, price, quantity, description });
        },
        updateBook: async (_, { id, image_url, price, quantity, description }) => {
            return await bookService.updateBook(id, { image_url, price, quantity, description });
        },
        deleteBook: async (_, { id }) => {
            return await bookService.deleteBook(id);
        },
        updateOrder: async (_, { id, status }) => {
            return await orderService.updateOrderStatus(id, status);
        }
    },
    Book: {
        author: async (book) => {
            const authorId = book.author;
            return await authorService.getAuthorById(authorId);
        }
    },
    BookOrder: {
        book: async (bookOrder) => {
            const bookId = bookOrder.book;
            return await bookService.getBookById(bookId);
        }
    },
    Cart: {
        user: async (cart) => {
            const userId = cart.user;
            return await userService.getUserById(userId);
        }
    },
    Order: {
        user: async (order) => {
            const userId = order.user;
            return await userService.getUserById(userId);
        }
    }
};

module.exports = {
    userResolvers,
    adminResolvers,
    generalResolvers
};