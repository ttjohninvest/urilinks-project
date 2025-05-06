import { useSelector } from 'react-redux';

export default (settings) => {
    const settings2 = useSelector((state) => state.settings);
    // console.log("settings="+JSON.stringify(settings))
    console.log("In selectors/settings, settings="+JSON.stringify(settings2))
    return settings2
};

