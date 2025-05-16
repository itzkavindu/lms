import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
  bookImage: {
    type: String,
    required: true,
  },
  bookName: {
    type: String,
    required: true,
  },
  extraAdding: {
    type: String,
  },
  bookAuthor: {
    type: String,
    required: true,
  },
  bookPrice: {
    type: Number,
    required: true,
  },
  availableStock: {
    type: Number,
    required: true,
  }
}, {
  timestamps: true // Adds createdAt and updatedAt
});

const Book = mongoose.model('Book', bookSchema);
export default Book;
