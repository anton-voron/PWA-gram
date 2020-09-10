interface callbeck extends React.Dispatch<React.SetStateAction<number>> { }

export function getCurrentPosition(setLatitude: callbeck, setLongitude: callbeck) {
    const success = (position: Position) => {
        setLatitude(position.coords.latitude);
        setLongitude(position.coords.longitude);
    }

    const error = () => {
        console.log(`Unable to retrieve your location in browser version ${navigator.userAgent}`);
    }
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        console.log('Geolocation is not supported by your browser');
    }
}