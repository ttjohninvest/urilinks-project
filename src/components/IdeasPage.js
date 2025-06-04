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
        "dogs, food",
        "cats",
        "cats, food",
        "pets",
        "pets, food",
        "airports",
        "airports, car, rental", 
        "car, rental", 
        "hotels",
        "motels",
        "laundry",
        "grocery",
        "sports",
        "sports, running",
        "sports, baseball",
        "sports, soccer",
        "sports, football",
        "sports, swimming",
        "sports, ice skating",
        "sports, race walking"
    ]
    
     return(<ul className="">
      {ideasArray.sort().map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>)   
};

export default IdeasPage;