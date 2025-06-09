import React, { useEffect, useState } from 'react';

const FetchBookmarks = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        //fetch('C:\\Users\\Admin\\AppData\\Local\\Google\\Chrome\\User%20Data\\Default\\Bookmarks')
        fetch('./bookmarks_6_9_25.html')
            //.then(response => response.json())
            .then(response => response.text())
            .then(data => setData(data))
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