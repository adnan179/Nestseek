import React, { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [properties, setProperties] = useState([]);
  const [selectedProperty, setSelectedProperty] = useState(null);
  const [sellerDetails, setSellerDetails] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/buyer/properties"
        );
        setProperties(response.data);
      } catch (error) {
        console.error("Error fetching properties:", error);
      }
    };

    fetchProperties();
  }, []);

  const handleInterested = async (property) => {
    setSelectedProperty(property);
    try {
      const response = await axios.get(
        `http://localhost:4000/buyer/sellers/${property.seller}`
      );
      setSellerDetails(response.data);
    } catch (error) {
      console.error("Error fetching seller details:", error);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-3xl font-bold mb-8">Buyers Page</h1>
      <div className="grid grid-cols-3 gap-4">
        {properties.map((property) => (
          <div key={property._id} className="p-4 border">
            <h2 className="text-xl font-bold mb-2">{property.area}</h2>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            <p>Nearby Hospitals: {property.nearbyHospitals}</p>
            <p>Nearby Colleges: {property.nearbyColleges}</p>
            <button
              onClick={() => handleInterested(property)}
              className="bg-blue-500 text-white py-2 px-4 mt-4 rounded hover:bg-blue-600"
            >
              I'm Interested
            </button>
          </div>
        ))}
      </div>
      {selectedProperty && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Seller Details</h2>
          {sellerDetails ? (
            <div>
              <p>Name: {sellerDetails.name}</p>
              <p>Email: {sellerDetails.email}</p>
              <p>Phone: {sellerDetails.phone}</p>
            </div>
          ) : (
            <p>Loading seller details...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default App;
