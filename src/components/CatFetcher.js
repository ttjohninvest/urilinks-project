import React, { useState, useEffect } from "react";

const API_KEY =
  "live_473mu8T7DeX3X9XRmvowwOkAPJMmfSq9ToTm8p3fV3erRUbux4KVXa5qwEdWx9ta";

const CatFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.thecatapi.com/v1/images/search?limit=1&breed_ids=abys&include_breeds=1",
        {
          method: "GET",
          headers: {
            //Authorization: `Bearer ${API_KEY}`,
            "Content-Type": "application/json",
          },
        },
      );
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
        <ul>
          {data.map((kitty, index) => {
            //return <li key={kitty.id}><img src={kitty.url} width={kitty.width} height={kitty.height} /></li>
            return (
              <li key={kitty.id}>
                <img
                  src={kitty.url}
                  style={{
                    width: "600px",
                    height: "600px",
                    objectFit: "contain",
                  }}
                />
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default CatFetcher;
