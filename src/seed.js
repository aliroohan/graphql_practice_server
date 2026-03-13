const mongoose = require("mongoose");
const connectDB = require("./config/dbConfig");
const Author = require("./models/author");
const Book = require("./models/book");

const authorsData = [
  { name: "George Orwell", bio: "English novelist, essayist, journalist and critic." },
  { name: "J.K. Rowling", bio: "British author, best known for the Harry Potter series." },
  { name: "Isaac Asimov", bio: "American writer and professor of biochemistry." },
  { name: "Jane Austen", bio: "English novelist known primarily for her six major novels." },
  { name: "Frank Herbert", bio: "American science fiction author best known for the novel Dune." },
  { name: "Stephen King", bio: "American author of horror, supernatural fiction, suspense, crime, science-fiction, and fantasy novels." },
  { name: "Agatha Christie", bio: "English writer known for her 66 detective novels and 14 short story collections." },
  { name: "J.R.R. Tolkien", bio: "English writer, poet, philologist, and academic, best known as the author of the high fantasy works The Hobbit and The Lord of the Rings." },
  { name: "Gabriel Garcia Marquez", bio: "Colombian novelist, short-story writer, screenwriter, and journalist." },
  { name: "Toni Morrison", bio: "American novelist, essayist, and college professor." }
];

const generateBooksData = (authors) => {
    const adjectives = ["Crimson", "Silent", "Lost", "Forgotten", "Hidden", "Final", "Dark", "Golden", "Eternal", "Shattered", "Mystic", "Broken", "Whispering", "Fading", "Rising"];
    const nouns = ["Kingdom", "Secret", "Journey", "Dream", "Shadow", "City", "Ocean", "Star", "Prophecy", "Throne", "Forest", "Mountain", "River", "Chronicle", "Legacy"];
    const categories = ["Fantasy", "Science Fiction", "Mystery", "Thriller", "Romance", "Historical", "Horror", "Adventure"];

    const books = [];
    
    // We want 100 books, let's randomly generate them combinations
    for (let i = 0; i < 100; i++) {
        const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
        const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
        const randomCategory = categories[Math.floor(Math.random() * categories.length)];
        
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        
        // Ensure somewhat unique ISBNs
        const isbn = `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`;
        
        books.push({
            isbn: isbn,
            title: `The ${randomAdjective} ${randomNoun}`,
            author: randomAuthor._id,
            image_url: `https://picsum.photos/seed/${isbn}/200/300`, // random placeholder image based on isbn
            price: Number((Math.random() * 20 + 5).toFixed(2)), // Random price between 5 and 25
            quantity: Math.floor(Math.random() * 100) + 1, // Random quantity between 1 and 100
            description: `An epic ${randomCategory.toLowerCase()} story exploring the mysteries of the ${randomAdjective.toLowerCase()} ${randomNoun.toLowerCase()}.`
        });
    }

    return books;
};

const seedDB = async () => {
    try {
        await connectDB();
        
        console.log("Clearing existing data...");
        await Author.deleteMany({});
        await Book.deleteMany({});
        
        console.log("Seeding authors...");
        const createdAuthors = await Author.insertMany(authorsData);
        console.log(`Inserted ${createdAuthors.length} authors.`);
        
        console.log("Seeding books...");
        const booksData = generateBooksData(createdAuthors);
        const createdBooks = await Book.insertMany(booksData);
        console.log(`Inserted ${createdBooks.length} books.`);
        
        console.log("Database seeded successfully!");
        process.exit(0);
    } catch (error) {
        console.error("Error seeding database:", error);
        process.exit(1);
    }
};

seedDB();
