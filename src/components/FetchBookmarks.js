import React, { useEffect, useState } from 'react';

const FetchBookmarks = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
        fetch('https://urilinks.com/bookmarks_6_9_25.html')
            //.then(response => response.json())
            .then(response => response.text())
            .then(data => {
                
                //console.log("data="+data)
                setData(data)

//const text = `<p>Some text</p><br /><a href="https://daily-dev-tips.com/">My website</a><hr /><a href="https://google.com">Another link</a>`;

let parser = new DOMParser();
const doc = parser.parseFromString(data, 'text/html');
let links = doc.getElementsByTagName('a'); // This returns an HTMLCollection of all <a> tags
links.forEach((link)=>{
    console.log(link.innerText)
    console.log(link.href)
})




    })
            .catch(error => setError(error));
    }, []);

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            {/* Render your data here */}
            {JSON.stringify(data)}
        </div>
    );
};

export default FetchBookmarks;