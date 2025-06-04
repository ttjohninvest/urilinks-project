import React from 'react';

const IdeasPage = () => {
    
    const ideasArray = [
        "english",
        "english, grammar",
        "english, composition",
        "reading, patience",
        "reading, comprehension",
        "food",
        "politic",
        "politics",
        "government, United States",
        "government, local",
        "math",
        "math, basic",
        "math, algebra",
        "math, calculus",
        "computer, programming languages",
        "computer, hardware",
        "computer, peripherals",
        "science, computer",
        "shopping",
        "entertainment, vacation",
        "entertainment, ice skating",
        "entertainment, music",
        "entertainment, christian music",
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
        "airports, car rental", 
        "car rental", 
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
        "sports, race walking",
        "sports, elite",
        "sports, recreational",
        "sports, hiking",
        "sports, rugby",
        "sports, cricket",
        "sports, olympics",
        "ai, robots",
        "ai, artificial inteligence",
        "ai, convolutional neural networks",
        "ai, natural language"
    ]
    
     return(<ul className="">
      {ideasArray.sort().map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>)   
};

export default IdeasPage;