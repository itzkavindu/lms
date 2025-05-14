import { useState } from 'react';
import { BookOpen, ArrowLeft, Plus, DollarSign, Package, Image, User } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

export default function AddBookForm() {
  const navigate = useNavigate();

  const [formData, setState] = useState({
    bookImage: '',
    bookName: '',
    extraAdding: '',
    bookAuthor: '',
    bookPrice: '',
    availableStock: ''
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "bookImage") {
      setState({ ...formData, bookImage: files[0] });
    } else if (name === "bookAuthor") {
      const onlyLetters = value.replace(/[^A-Za-z\s]/g, '');
      setState({ ...formData, [name]: onlyLetters });
    } else {
      setState({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    // Validate file input
    if (!formData.bookImage) {
      Swal.fire({
        icon: "error",
        title: "Missing File",
        text: "Please select a book image.",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    const formPayload = new FormData();
    formPayload.append("bookImage", formData.bookImage);
    formPayload.append("bookName", formData.bookName);
    formPayload.append("extraAdding", formData.extraAdding);
    formPayload.append("bookAuthor", formData.bookAuthor);
    formPayload.append("bookPrice", parseFloat(formData.bookPrice));
    formPayload.append("availableStock", parseInt(formData.availableStock));

    // Log form-data for debugging
    for (let [key, value] of formPayload.entries()) {
      console.log(`${key}:`, value);
    }

    const response = await axios.post("http://localhost:5000/api/books", formPayload);

    Swal.fire({
      icon: "success",
      title: "Book Added!",
      text: "The book was successfully added.",
      confirmButtonColor: "#10B981",
    }).then(() => {
      navigate("/admin/books");
    });

    setState({
      bookImage: "",
      bookName: "",
      extraAdding: "",
      bookAuthor: "",
      bookPrice: "",
      availableStock: "",
    });
  } catch (error) {
    console.error("Error submitting form:", error);
    Swal.fire({
      icon: "error",
      title: "Failed to Add Book",
      text: error.response?.data?.message || "Something went wrong!",
      confirmButtonColor: "#EF4444",
    });
  }
};
  

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden border border-purple-200 p-10">
        <h1 className="text-3xl font-bold text-center text-purple-700 mb-8 tracking-wide">Add a New Book</h1>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Book Image */}
          <FormInput
            label="Book Image"
            name="bookImage"
            type="file"
            icon={<Image className="w-5 h-5 mr-2 text-purple-500" />}
            onChange={handleChange}
            accept="image/*"
          />

          {/* Book Name */}
          <FormInput
            label="Book Name"
            name="bookName"
            value={formData.bookName}
            onChange={handleChange}
            placeholder="Enter book title"
            icon={<BookOpen className="w-5 h-5 mr-2 text-blue-500" />}
          />

          {/* Extra Adding */}
          <FormInput
            label="Extra Adding"
            name="extraAdding"
            value={formData.extraAdding}
            onChange={handleChange}
            placeholder="Additional info (optional)"
            icon={<Plus className="w-5 h-5 mr-2 text-indigo-500" />}
          />

          {/* Book Author (letters only) */}
          <FormInput
            label="Book Author"
            name="bookAuthor"
            value={formData.bookAuthor}
            onChange={handleChange}
            placeholder="Author's name"
            icon={<User className="w-5 h-5 mr-2 text-violet-500" />}
          />

          {/* Book Price (positive number only) */}
          <FormInput
            label="Book Price"
            name="bookPrice"
            value={formData.bookPrice}
            onChange={handleChange}
            placeholder="Rs. 0.00"
            type="number"
            icon={<DollarSign className="w-5 h-5 mr-2 text-pink-500" />}
            min="0"
            onKeyDown={(e) => {
              if (!/^\d$/.test(e.key) &&
                  !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />

          {/* Available Stock (positive integer only) */}
          <FormInput
            label="Available Stock"
            name="availableStock"
            value={formData.availableStock}
            onChange={handleChange}
            placeholder="Stock count"
            type="number"
            icon={<Package className="w-5 h-5 mr-2 text-emerald-500" />}
            min="0"
            onKeyDown={(e) => {
              if (!/^\d$/.test(e.key) &&
                  !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault();
              }
            }}
          />

          {/* Buttons */}
          <div className="col-span-1 md:col-span-2 flex justify-between items-center mt-4">
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-green-400 to-emerald-600 text-white font-semibold rounded-xl shadow-md hover:scale-105 transition transform"
            >
              Add Book
            </button>
            <button
              type="button"
              className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium rounded-xl shadow hover:scale-105 flex items-center transition"
            >
              <ArrowLeft className="w-4 h-4 mr-2" /> Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Form Input Component
function FormInput({
  label,
  icon,
  name,
  value,
  onChange,
  placeholder,
  type = "text",
  min,
  onKeyDown,
  accept
}) {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-700 mb-1 flex items-center">
        {icon} {label}
      </label>
      <input
        type={type}
        name={name}
        value={type === "file" ? undefined : value}
        onChange={onChange}
        placeholder={placeholder}
        min={min}
        onKeyDown={onKeyDown}
        accept={accept}
        className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-purple-400 bg-white"
      />
    </div>
  );
}
