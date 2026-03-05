import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function UpdateCoffee() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    coffeeName: "",
    availableQuantity: "",
    supplier: "",
    taste: "",
    category: "",
    details: "",
    photoURL: "",
  });

  useEffect(() => {
    fetch(`http://localhost:5000/coffees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData({
          coffeeName: data.coffeeName || "",
          availableQuantity: data.availableQuantity || "",
          supplier: data.supplier || "",
          taste: data.taste || "",
          category: data.category || "",
          details: data.details || "",
          photoURL: data.photoUrl || "",
        });
      });
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // image upload
  const handleImage = async (e) => {
    const file = e.target.files[0];

    const imgData = new FormData();
    imgData.append("image", file);

    const url =
      "https://api.imgbb.com/1/upload?key=6a20b906fa471d7c1313b490467293ca";

    const res = await fetch(url, {
      method: "POST",
      body: imgData,
    });

    const data = await res.json();

    setFormData({
      ...formData,
      photoURL: data.data.display_url,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/coffees/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        photoUrl: formData.photoURL,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Coffee Updated Successfully ☕");
        navigate("/");
      });
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-[#F5F4F1] p-6">
      
      <div className="bg-white shadow-xl rounded-xl w-full max-w-4xl p-10">

        <h2 className="text-3xl font-bold text-center mb-8">
          Update Coffee
        </h2>

        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >

          <input
            type="text"
            name="coffeeName"
            placeholder="Coffee Name"
            value={formData.coffeeName}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="number"
            name="availableQuantity"
            placeholder="Available Quantity"
            value={formData.availableQuantity}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="supplier"
            placeholder="Supplier"
            value={formData.supplier}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="taste"
            placeholder="Taste"
            value={formData.taste}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={formData.category}
            onChange={handleChange}
            className="input input-bordered w-full"
          />

          {/* Image Upload */}
          <input
            type="file"
            onChange={handleImage}
            className="file-input file-input-bordered w-full"
          />

          <textarea
            name="details"
            placeholder="Coffee Details"
            value={formData.details}
            onChange={handleChange}
            className="textarea textarea-bordered w-full md:col-span-2"
          ></textarea>

          <button
            type="submit"
            className="btn btn-primary md:col-span-2 text-lg"
          >
            Update Coffee
          </button>

        </form>
      </div>
    </div>
  );
}

export default UpdateCoffee;