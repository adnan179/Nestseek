import React, { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import axios from "axios";
import LoadingSpinner from "../components/Loading";
import Navbar from "../components/Navbar.jsx";

const SellerPage = () => {
  const { auth } = useAuth();
  const [properties, setProperties] = useState([]);
  const [form, setForm] = useState({
    city: "",
    area: "",
    bedrooms: "",
    bathrooms: "",
    nearbyHospitals: "",
    nearbyColleges: "",
    additionalInfo: "",
    files: [],
  });
  const [updatingPropertyId, setUpdatingPropertyId] = useState(null);

  //function to fetch seller's properties
  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/properties/myproperties",
          {
            headers: {
              Authorization: `Bearer ${auth.token}`,
            },
          }
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    if (auth && auth.token) {
      fetchProperties();
    }
  }, [auth]);

  //function to handle file change
  const handleFileChange = (e) => {
    setForm({
      ...form,
      files: Array.from(e.target.files),
    });
  };

  //function to delete properties
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/properties/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      setProperties(properties.filter((property) => property._id !== id));
    } catch (error) {
      console.error("Error deleting property:", error);
    }
  };

  //function to update the existing properties
  const handleUpdate = (id) => {
    // Find the property with the given id
    const propertyToUpdate = properties.find((property) => property._id === id);
    if (propertyToUpdate) {
      // Set the form state with the values of the property being updated
      setForm({
        city: propertyToUpdate.city,
        area: propertyToUpdate.area,
        bedrooms: propertyToUpdate.bedrooms,
        bathrooms: propertyToUpdate.bathrooms,
        nearbyHospitals: propertyToUpdate.nearbyHospitals,
        nearbyColleges: propertyToUpdate.nearbyColleges,
        additionalInfo: propertyToUpdate.additionalInfo || "",
      });
      // Set the updatingPropertyId state to the id of the property being updated
      setUpdatingPropertyId(id);
    }
  };

  //function to add a new property
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("city", form.city);
      formData.append("area", form.area);
      formData.append("bedrooms", form.bedrooms);
      formData.append("bathrooms", form.bathrooms);
      formData.append("nearbyHospitals", form.nearbyHospitals);
      formData.append("nearbyColleges", form.nearbyColleges);
      formData.append("additionalInfo", form.additionalInfo);
      form.files.forEach((file) => formData.append("files", file));

      const url = updatingPropertyId
        ? `http://localhost:4000/properties/update/${updatingPropertyId}`
        : "http://localhost:4000/properties/post";

      const response = await axios.post(url, formData, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setProperties((prev) =>
        updatingPropertyId
          ? prev.map((property) =>
              property._id === updatingPropertyId ? response.data : property
            )
          : [...prev, response.data]
      );

      setForm({
        city: "",
        area: "",
        bedrooms: "",
        bathrooms: "",
        nearbyHospitals: "",
        nearbyColleges: "",
        additionalInfo: "",
        files: [],
      });
      setUpdatingPropertyId(null);
    } catch (error) {
      console.error("Error updating/adding property:", error);
    }
  };

  //loading animation
  if (!auth || !auth.token) {
    return <LoadingSpinner />;
  }

  return (
    <div class="w-full min-h-screen">
      <Navbar />
      <div class="px-14 pt-5 flex flex-col">
        <h1 class="text-xl font-bold text-blue-600">Hello, Seller!</h1>
        <form
          onSubmit={handleFormSubmit}
          class=" flex flex-col gap-2 shadow border p-5 rounded mt-5"
        >
          <div className="grid grid-cols-3 gap-2">
            {/* <!-- city Input --> */}
            <div className="inputGroup">
              <input
                type="text"
                placeholder=" "
                required
                autocomplete="off"
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                className="inputElement peer "
              />
              <label for="city" class="labelElement">
                City:<span class="text-red-600">*</span>
              </label>
            </div>
            {/* <!-- Area Input --> */}
            <div className="inputGroup">
              <input
                type="text"
                placeholder=" "
                required
                autocomplete="off"
                value={form.area}
                onChange={(e) => setForm({ ...form, area: e.target.value })}
                className="inputElement peer w-full"
              />
              <label for="area" class="labelElement">
                Area:<span class="text-red-600">*</span>
              </label>
            </div>
            {/* <!-- Bedrooms Input --> */}
            <div class="inputGroup">
              <input
                type="text"
                placeholder=" "
                required
                autocomplete="off"
                value={form.bedrooms}
                onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                class="inputElement peer"
              />
              <label for="bedrooms" class="labelElement">
                No. of bedrooms:<span class="text-red-600">*</span>
              </label>
            </div>
            {/* <!-- Bathrooms Input --> */}
            <div class="inputGroup">
              <input
                type="text"
                placeholder=" "
                required
                autocomplete="off"
                value={form.bathrooms}
                onChange={(e) =>
                  setForm({ ...form, bathrooms: e.target.value })
                }
                class="inputElement peer"
              />
              <label for="bathrooms" class="labelElement">
                No. of bathrooms:<span class="text-red-600">*</span>
              </label>
            </div>
            {/* <!-- Nearby Hospitals Input --> */}
            <div class="inputGroup">
              <input
                type="text"
                placeholder=" "
                required
                autocomplete="off"
                value={form.nearbyHospitals}
                onChange={(e) =>
                  setForm({ ...form, nearbyHospitals: e.target.value })
                }
                class="inputElement peer"
              />
              <label for="nearbyHospitals" class="labelElement">
                Nearby Hospitals:<span class="text-red-600">*</span>
              </label>
            </div>
            {/* <!-- Nearby Colleges Input --> */}
            <div class="inputGroup">
              <input
                type="text"
                placeholder=" "
                required
                autocomplete="off"
                value={form.nearbyColleges}
                onChange={(e) =>
                  setForm({ ...form, nearbyColleges: e.target.value })
                }
                class="inputElement peer"
              />
              <label for="nearbyColleges" class="labelElement">
                Nearby Colleges:<span class="text-red-600">*</span>
              </label>
            </div>
            {/* <!-- Additional Info Input --> */}
            <div class="inputGroup">
              <input
                type="text"
                placeholder=" "
                autocomplete="off"
                value={form.additionalInfo}
                onChange={(e) =>
                  setForm({ ...form, additionalInfo: e.target.value })
                }
                class="inputElement peer"
              />
              <label for="additionalInfo" class="labelElement">
                Additional Info:<span className="font-light">(optional)</span>
              </label>
            </div>
            {/* <!-- Images Input --> */}
            <div class="inputGroup">
              <input
                type="file"
                multiple
                placeholder=" "
                onChange={handleFileChange}
                class="inputElement peer"
              />
              <label htmlFor="files" class="labelElement">
                Images:<span className="font-light">(optional)</span>
              </label>
            </div>
          </div>
          {/* <!-- Submit Button --> */}
          <div className="flex items-center">
            <button
              class="flex w-[200px] h-[50px] px-4 py-2 bg-green-600 text-white font-medium justify-center items-center rounded 
              shadow-sm hover:scale-105 transition duration-200"
              type="submit"
            >
              Post Property
            </button>
          </div>
        </form>
        <div>
          <h2>Your Properties</h2>
          <div class="grid grid-cols-3 gap-3">
            {properties.map((property) => (
              <div class="flex flex-col gap-2 p-5" key={property._id}>
                <div class="flex">
                  {property.area} - {property.bedrooms} Bedrooms
                </div>
                <div class="flex flex-row gap-1">
                  <button
                    class="flex bg-red-600 rounded px-4 py-2 text-white font-medium"
                    onClick={() => handleDelete(property._id)}
                  >
                    Delete
                  </button>
                  <button
                    class="flex bg-blue-600 rounded px-4 py-2 text-white font-medium"
                    onClick={() => handleUpdate(property._id)}
                  >
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerPage;
