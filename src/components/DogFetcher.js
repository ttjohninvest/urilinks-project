import React, { useState, useEffect } from "react";

const DogFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random", {
        method: "GET",
        headers: {
          //Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const result = await response.json();
      console.log("result=" + JSON.stringify(result));
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Empty dependency array ensures this runs only once on mount

  const getNewImage = () => {
    fetchData();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <div className="button-container">
        <button onClick={getNewImage} className="ib button-2 outine-none">
          To Get New Image
        </button>
      </div>
      <div className="flexrow3z1">
        <div key="1">
          <img
            src={data.message}
            style={{
              width: "600px",
              height: "600px",
              objectFit: "contain",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default DogFetcher;
