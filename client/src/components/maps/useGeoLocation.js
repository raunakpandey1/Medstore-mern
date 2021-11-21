import React, { useState, useEffect } from "react";

const useGeoLocation = () => {
    const [location, setLocation] = useState({
        loaded: false,
        coordinates: { lat: "21.7679", lng: "78.8718" },
        error: null
    });

    const onSuccess = (location) => {
        setLocation({
            loaded: true,
            coordinates: {
                lat: location.coords.latitude,
                lng: location.coords.longitude,
            },
            error: null
        });
    };

    const onError = (error) => {
        setLocation({
            loaded: true,
            coordinates: { lat: "21.7679", lng: "78.8718" },
            error: {
                code: error.code,
                message: error.message,
            },
        });
    };

    useEffect(() => {
        if (!("geolocation" in navigator)) {
            onError({
                code: 0,
                message: "Geolocation not supported",
            });
        }

        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }, []);

    return location;
};

export default useGeoLocation;