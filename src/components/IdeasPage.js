import React from 'react';

const IdeasPage = () => {
    
    const ideasArray = [
        "english",
        "math",
        "computer science",
        "shopping",
        "entertainment",
        "vacation",
        "work",
        "love",
        "church",
        "catholic church",
        "denominational church",
        "non denominational church",
        "holy bible",
        "holy bible study",
        "housing",
        "movies",
        "christian",
        "walking",
        "dogs",
        "cats ",
        "pets"
    ]
    
     return(<ul className="color-white-1">
      {ideasArray.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>)   
};

export default IdeasPage;