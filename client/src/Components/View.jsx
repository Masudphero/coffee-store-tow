import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

function ViewProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [coffee, setCoffee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/coffees/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCoffee(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <p className="text-center mt-20 text-lg font-semibold">
        Loading coffee details...
      </p>
    );
  }

  if (!coffee) {
    return (
      <p className="text-center mt-20 text-red-500 font-semibold">
        Coffee not found!
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F4F1] flex items-center justify-center p-6">

      <div className="bg-white shadow-xl rounded-2xl max-w-5xl w-full grid md:grid-cols-2 gap-8 p-8">

        {/* Coffee Image */}
        <div className="flex justify-center items-center">
          <img
            src={coffee.photoUrl}
            alt={coffee.coffeeName}
            className="rounded-xl w-full h-[350px] object-cover hover:scale-105 transition duration-300"
          />
        </div>

        {/* Coffee Details */}
        <div className="flex flex-col justify-center space-y-4">

          <h2 className="text-3xl font-bold">
            {coffee.coffeeName}
          </h2>

          <div className="space-y-2 text-gray-700 text-lg">

            <p>
              <span className="font-semibold">Category:</span> {coffee.category}
            </p>

            <p>
              <span className="font-semibold">Supplier:</span> {coffee.supplier}
            </p>

            <p>
              <span className="font-semibold">Taste:</span> {coffee.taste}
            </p>

            <p>
              <span className="font-semibold">Available:</span>{" "}
              {coffee.availableQuantity}
            </p>

            <p>
              <span className="font-semibold">Details:</span> {coffee.details}
            </p>

          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">

            <button
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Go Back
            </button>

            <Link to={`/updatecoffee/${id}`}>
              <button className="btn btn-primary">
                Update Coffee
              </button>
            </Link>

          </div>

        </div>
      </div>
    </div>
  );
}

export default ViewProduct;