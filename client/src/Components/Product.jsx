import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Product() {
  const [coffees, setCoffees] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // ✅ Fetch coffees
  useEffect(() => {
    fetch("http://localhost:5000/coffees")
      .then((res) => res.json())
      .then((data) => {
        setCoffees(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching coffees:", err);
        setLoading(false);
      });
  }, []);

  // ✅ Delete coffee
  const handleDelete = (id) => {
    const confirmDelete = confirm("Are you sure you want to delete this coffee?");
    if (!confirmDelete) return;

    fetch(`http://localhost:5000/coffees/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert("Coffee deleted successfully!");
          setCoffees(coffees.filter((coffee) => coffee._id !== id));
        } else {
          alert("Failed to delete coffee!");
        }
      })
      .catch((err) => console.error("Delete error:", err));
  };

  // ✅ Navigate for Edit
  const handleEdit = (id) => {
    navigate(`/updateCoffee/${id}`);
  };

  // ✅ Navigate for View
  const handleView = (id) => {
    navigate(`/coffee/${id}`);
  };

  return (
    <div className="bg-gray-100 min-h-screen p-6">
      <h2 className="text-3xl font-bold text-center mb-4 text-amber-800">
        ☕ Our Coffee Collection
      </h2>

      {/* Total coffee count */}
      <p className="text-center text-gray-700 mb-6">
        Total Coffees:{" "}
        <span className="font-semibold text-amber-700">{coffees.length}</span>
      </p>

      {/* Loading state */}
      {loading ? (
        <p className="text-center text-gray-600 text-lg">Loading coffees...</p>
      ) : coffees.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No coffees available. Please add some!
        </p>
      ) : (
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6">
          {coffees.map((coffee) => (
            <div
              key={coffee._id}
              className="bg-white shadow-lg rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300"
            >
              {/* Coffee Image */}
              <img
                src={coffee.photoUrl}
                alt={coffee.coffeeName}
                className="w-full h-80 object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
              />

              {/* Coffee Info */}
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-1">
                  {coffee.coffeeName}
                </h3>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Category:</span> {coffee.category}
                </p>
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Supplier:</span> {coffee.supplier}
                </p>
                <p className="text-gray-600 mb-3">
                  <span className="font-medium">Taste:</span> {coffee.taste}
                </p>

                {/* Buttons: View / Edit / Delete */}
                <div className="flex justify-center gap-3 mt-4">
                  <button
                    onClick={() => handleView(coffee._id)}
                    className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    View
                  </button>
                  <button
                    onClick={() => handleEdit(coffee._id)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(coffee._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Product;