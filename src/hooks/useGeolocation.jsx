import { useState } from "react";

export const useGeolocation = (defaultPos = null) => {
    const [position, setPosition] = useState(defaultPos)
    const [loading, setLoading] = useState(false)

    const [error, setError] = useState(null)
 
    function getPosition() {
        if (!navigator.geolocation) {
                 setError("Geolocation is not supported by this browser.");
        } 
setLoading(true)    
const successCallback = (position) => {
  setPosition({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        });
        setLoading(false);
};

const errorCallback = (error) => {
          setError(error.message);
        setLoading(false);

      };
      const options = {
  enableHighAccuracy: true,
  timeout: 10000,
};

navigator.geolocation.getCurrentPosition(
  successCallback,
  errorCallback,
  options
);

    
    }
    return {position,loading,error, getPosition}
}