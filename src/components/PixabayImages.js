import React, { useState, useEffect } from "react";



const CatFetcher = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
       
        "https://pixabay.com/api?key=7598310-81660a23d27af589293242cb8&q=flowers",
        {
          method: "GET",
          headers: {
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
      <button onClick={getNewImage}>click</button>
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
  );
};

export default CatFetcher;
