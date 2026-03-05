import React, { useState } from "react";

function AddCoffeeForm() {
  const [formData, setFormData] = useState({
    coffeeName: "",
    availableQuantity: "",
    supplier: "",
    taste: "",
    category: "",
    details: "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const imgData = new FormData();
    imgData.append("image", imageFile);

    const url = "https://api.imgbb.com/1/upload?key=6a20b906fa471d7c1313b490467293ca";

    const res = await fetch(url, {
      method: "POST",
      body: imgData,
    });

    const imgResult = await res.json();
    const photoURL = imgResult.data.display_url;

    const coffeeData = {
      ...formData,
      photoURL: photoURL,
    };

    fetch("http://localhost:5000/coffees", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(coffeeData),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Coffee Added Successfully ☕");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F5F4F1] p-6">

      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          Add New Coffee
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">

          <input
            type="text"
            name="coffeeName"
            placeholder="Coffee Name"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="availableQuantity"
            placeholder="Available Quantity"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="supplier"
            placeholder="Supplier"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="taste"
            placeholder="Taste"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          {/* Image Upload */}
          <input
            type="file"
            onChange={handleImage}
            className="file-input file-input-bordered w-full"
          />

          {/* Details */}
          <textarea
            name="details"
            placeholder="Coffee Details"
            onChange={handleChange}
            className="textarea textarea-bordered w-full md:col-span-2"
          ></textarea>

          {/* Button */}
          <button
            type="submit"
            className="btn btn-primary md:col-span-2 text-lg"
          >
            Add Coffee
          </button>

        </form>

      </div>

    </div>
  );
}

export default AddCoffeeForm;