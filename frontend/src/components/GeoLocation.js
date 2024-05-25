import React, { useState } from 'react';

const GeoLocation = () => {
    const [latitude, setLatitude] = useState(null);
    const [longitude, setLongitude] = useState(null);
    const [mapLink, setMapLink] = useState('');

    const geoFindMe = () => {
        console.log('호출 완료');
        navigator.geolocation.getCurrentPosition(async (position) => {
            console.log('성공');
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            setMapLink(`https://www.openstreetmap.org/#map=18/${lat}/${lon}`);
            setLatitude(lat);
            setLongitude(lon);
            const data = { lat, lon };
            const options = {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            };
            const response = await fetch('http://localhost:5000', options);
            const re = await response.json();
            console.log(re);
        });
    };

    return (
        <div>
            <button onClick={geoFindMe}>Show my location</button><br />
            <span>{latitude ? `Latitude: ${latitude} °` : ''}</span><br />
            <span>{longitude ? `Longitude: ${longitude} °` : ''}</span><br />
            {mapLink && (
                <a href={mapLink} target="_blank" rel="noopener noreferrer">
                    OpenStreetMap Link
                </a>
            )}
        </div>
    );
};

export default GeoLocation;
