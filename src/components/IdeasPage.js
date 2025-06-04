import React from 'react';

const IdeasPage = () => {
    
    const ideasArray = [
        "english",
        "math",
        "science, computer",
        "shopping",
        "entertainment",
        "cars",
        "vacation",
        "work",
        "love",
        "church",
        "church, catholic",
        "church, denominational",
        "church, non denominational",
        "holy bible",
        "holy bible, study",
        "housing",
        "movies",
        "christian",
        "walking",
        "dogs",
        "cats ",
        "pets",
        "airports",
        "hotels",
        "motels"
    ]
    
     return(<ul className="">
      {ideasArray.sort().map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>)   
};

export default IdeasPage;