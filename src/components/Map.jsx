import React, { useEffect, useState  , memo} from 'react'
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from "react-leaflet";
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import { useGeolocation } from '../hooks/useGeolocation';
import Button from './Button';
import styles from './Map.module.css'
import { useUrlPosition } from '../hooks/useUrlPosition';
import Flag from './Flag';

const UpdateCenter = memo(  ({position}) =>{
  const map = useMap()
  map.flyTo(position, map.getZoom(16))
  return null

}
)
const NavigateToForm = memo(()=> {
  const navigate = useNavigate()
 
 useMapEvents({
   click(e) {
     
     navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
    },
  
 })
  
  

}
)
export default function Map() {
  const { state , handleUpdatePosition , handleMoveToYourPosition     } = useAppContext()
  const [lat, lng] = useUrlPosition()
    const navigate = useNavigate()
  const {position,loading,error, getPosition} = useGeolocation()
  useEffect(() => {
    if (!lat && !lng) return
      
      handleUpdatePosition([lat , lng])
  }, [lat, lng])
    useEffect(() => {
    if (position) {
      
      handleMoveToYourPosition([position.lat, position.lng])
      navigate(`form?lat=${position.lat}&lng=${position.lng}`)

    }
  }, [position ])
  return <div className={styles.parentMap}>
    {error && !loading && <p style={{ color: "red" }}>{error}</p>}
    {!position && <Button onClick={getPosition} className={`btn btn-green`}>{loading ? "loading..." : "Get Your Location"}</Button>}
    <MapContainer center={state.mapPosition} zoom={13} scrollWheelZoom={true}    >
      <TileLayer
        
        attribution='Imagery &copy; <a href="https://www.mapbox.com/">Mapbox</a>'
        url={`https://api.mapbox.com/styles/v1/devalaashaban29/clkvfal5n003k01pm0i9sf1uz/tiles/256/{z}/{x}/{y}@2x?access_token=${import.meta.env.VITE_REACT_APP_KEY_MAP}`}
              minZoom={2} 

      />
        {
        state.cities && state.cities.map((city, index) => {

            return   <Marker position={[city.position["lat"] , city.position["lng"]]} key={index}>
            <Popup >
      <Flag flagInfo={city.emoji} />
<h3 >{city.cityName}</h3>
      </Popup>
    </Marker>
            
          })
      }
      <UpdateCenter position={state.mapPosition} />
      <NavigateToForm  />
  </MapContainer>
  </div>

  
}
