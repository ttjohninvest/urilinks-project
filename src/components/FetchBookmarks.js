import React, { useEffect, useState } from 'react';
import {startAddLink} from '../actions/links'

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
// setData(links)

//write to firebase the following links
for (let i = 0; i < links.length; i++) {
    console.log("links["+i+"].innerText="+links[i].innerText)
    console.log("links["+i+"].href"+links[i].href)
    console.log("calling startAddLinkn")
    startAddLink({
        description: links[i].innerText,
        Url: links[i].href,
        note:"",
        amount:0,
        createdAt:0,
        faviconURL:""
})


}


//startAddLink
/*
{
        description: links[i].innerText,
        Url: links[i].href,
        amount: 0,
        createdAt: 0,
        note: this.state.note,
        faviconURL: faviconURL,
}



*/




    })
            .catch(error => setError(error));
    }, []);

    if (error) return <div>Error: {error.message}</div>;
    if (!data) return <div>Loading...</div>;

    return (
        <div>
            Bookmarks have been imported
            {/* {JSON.stringify(data)} */}
           
        </div>
    );
};

export default FetchBookmarks;