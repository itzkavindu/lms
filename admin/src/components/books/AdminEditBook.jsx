import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

function AdminEditBook() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    bookName: "",
    bookAuthor: "",
    bookPrice: "",
    availableStock: "",
    extraAdding: "",
    bookImage: null, // Store File object
    previewImage: "", // For displaying current or new image
  });

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/books/${id}`
        );
        setFormData({
          ...response.data,
          bookImage: null, // Reset for file input
          previewImage: response.data.bookImage, // Backend image path
        });
      } catch (error) {
        console.error("Error fetching book:", error.message);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "bookImage" && files[0]) {
      setFormData({
        ...formData,
        bookImage: files[0],
        previewImage: URL.createObjectURL(files[0]), // Show preview of new image
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      const updatePayload = new FormData();
      updatePayload.append("bookName", formData.bookName);
      updatePayload.append("bookAuthor", formData.bookAuthor);
      updatePayload.append("bookPrice", parseFloat(formData.bookPrice));
      updatePayload.append("availableStock", parseInt(formData.availableStock));
      updatePayload.append("extraAdding", formData.extraAdding);

      if (formData.bookImage) {
        updatePayload.append("bookImage", formData.bookImage); // Only append if new image
      }

      await axios.put(`http://localhost:5000/api/books/${id}`, updatePayload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Book updated successfully!");
      navigate("/books");
    } catch (error) {
      console.error("Error updating book:", error.message);
      alert("Failed to update book!");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        Update Book
      </h1>
      <form onSubmit={handleUpdate} className="space-y-6">
        <input
          type="text"
          name="bookName"
          value={formData.bookName}
          onChange={handleChange}
          placeholder="Book Name"
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="text"
          name="bookAuthor"
          value={formData.bookAuthor}
          onChange={handleChange}
          placeholder="Author"
          className="w-full p-3 border rounded-xl"
        />

        <input
          type="number"
          name="bookPrice"
          value={formData.bookPrice}
          onChange={handleChange}
          placeholder="Price"
          className="w-full p-3 border rounded-xl"
          min="0"
        />

        <input
          type="number"
          name="availableStock"
          value={formData.availableStock}
          onChange={handleChange}
          placeholder="Available Stock"
          className="w-full p-3 border rounded-xl"
          min="0"
        />

        <input
          type="text"
          name="extraAdding"
          value={formData.extraAdding}
          onChange={handleChange}
          placeholder="Description (optional)"
          className="w-full p-3 border rounded-xl"
        />

        {/* Image Preview */}
        {formData.previewImage && (
          <div className="mb-4">
            <img
              src={formData.previewImage} // Use previewImage instead of bookImage
              alt="Book"
              className="w-48 h-60 object-contain rounded-xl border mb-2"
            />
            <p className="text-sm text-gray-500">Current Image</p>
          </div>
        )}

        {/* Upload New Image */}
        <input
          type="file"
          name="bookImage"
          accept="image/*"
          onChange={handleChange}
          className="w-full p-3 border rounded-xl"
        />

        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl"
        >
          Update Book
        </button>
      </form>
    </div>
  );
}

export default AdminEditBook;
