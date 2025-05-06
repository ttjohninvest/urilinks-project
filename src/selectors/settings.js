import { useSelector } from 'react-redux'
//links is an incomming array that was filled from the database
export default () => {
    const settings = useSelector((state) => state.settings);
    console.log("settings="+JSON.stringify(settings))
    return settings
};

