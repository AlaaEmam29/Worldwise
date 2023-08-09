/* eslint-disable no-loss-of-precision */
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { useFirebaseContext } from './FirebaseContext.jsx';
import { useAuthContext } from "./AuthContext.jsx";
import { v4 as uuidv4 } from 'uuid';

const AppContext = createContext()
const currentTime = Date.now();
const formattedDate = (date) => moment(date).format('YYYY-MM-DD HH:mm:ss');

const initState = {
    cityName: "",
      date: formattedDate(currentTime),
    notes: "",
    country :"",
    emoji: "",
    loading: false,
    error: "",
    currentCity : {},

    cities: [],

  mapPosition : [46.431221 , 6.910680]
  
}
const initType = {
    loading: "loading",
  cityName: "cityName",
  country: "country",
        emoji: "emoji",
      date: "date",
    notes: "notes",
    error: "error",
    currentCity: "currentCity",
    updatePosition: "updatePosition",
    moveToYourLocation: "moveToYourLocation",
    clearForm: "clearForm",
      addCitiesToUser: "addCitiesToUser",
        addNewCityToUser: "addNewCityToUser",
        deleteCityFromUser: "deleteCityFromUser",

    logout : "logout"
}
const reducer = (state, action) => {
   
    switch (action.type) {
        case initType.loading:
            return {
                ...state,
                loading : action.payload
            }
         case initType.error:
            return {
                ...state,
                error : action.payload
            }
      case initType.cityName:
        case initType.country:
         case initType.emoji:
        case initType.date:
      case initType.notes:
            return {
                ...state, 
                [action.type] : action.payload                
            }
        case initType.currentCity:
            return {
                ...state,
                currentCity : action.payload
            }
               
      
        case initType.updatePosition:
        case initType.moveToYourLocation:

            return {
                ...state,
                mapPosition : action.payload
            }
        case initType.clearForm:
            return {
                ...state,
    cityName: "",
    notes: "",
    country: "",
            }
        case initType.addCitiesToUser:
            return {
                ...state,
                cities :action.payload
        }
      case initType.addNewCityToUser:
        return {
          ...state,
                currentCity : action.payload
        }
        
          case initType.deleteCityFromUser:
        return {
          ...state,
            currentCity : {}
        }
         case initType.logout:
            return {
                ...state,
                cities :[]
            }
       
        default:
            return {
                ...state
            }
           } 

    }
    

export const AppContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)

    const { firebase } = useFirebaseContext()
    const {state :authState } = useAuthContext()
    const navigate = useNavigate()
   function generateUniqueId() {
  return uuidv4();
}


  

const fetchCitiesBasedOnUser = useCallback(async () => {
  try {
    dispatch({ type: initType.loading, payload: true });
     await firebase.doGetUserDataFromFirestore('cities', (data) => {
      const { cities } = data;
      dispatch({ type: initType.addCitiesToUser, payload: cities });
    });
  } catch (error) {
    console.error(error.message);
    dispatch({ type: initType.error, payload: error.message });
  } finally {
    dispatch({ type: initType.loading, payload: false });
  }

} , [state ])

useEffect(() => {
  if (authState.user?.uid) {
    const unsubscribe = fetchCitiesBasedOnUser();

    return () => {
      if (typeof unsubscribe === 'function') {
        unsubscribe();
      }
    };
  } else {
    dispatch({ type: initType.loading, payload: true });
  }
}, [authState.user?.uid]);



    
   
    const handleBack =useCallback( (e , path) => {
        e.preventDefault()
        navigate(path ,  {replace :true})
        
    } ,[])
    
    const handleChangeInputMapForm = useCallback((e) => {
      dispatch({ type: e.target.name, payload: e.target.value });
    }, []); 
  
    const handleChangeInputMapFormWhenClick = useCallback((state, value) => {
      dispatch({ type: state, payload: value });
    }, []); 
  

  const getCurrentCity = useCallback((id) => {
    if (id === state.currentCity.id) return
    
        const city = state.cities.find((city) => city.id === id)
        dispatch({type : initType.currentCity , payload:city})

    } , [state.cities, state.currentCity.id])
     const handleUpdatePosition = (currPosition) => {
        dispatch({type : initType.updatePosition , payload:currPosition})

    }
     const handleMoveToYourPosition = (currPosition) => {
        dispatch({type : initType.moveToYourLocation , payload:currPosition})

    }
    



  const handleAddNewCities = useCallback(async (e) => {
      e.preventDefault();
      
    const { cityName, country, emoji, date, notes, mapPosition , cities } = state;
    if(!cityName || !date ) return
      const id  = generateUniqueId();
      dispatch({type : initType.loading , payload:true})

      try {
          const newCity = {
          id,
      cityName,
      country ,
      emoji,
      date,
      notes,
      position: {
        lat: mapPosition[0],
        lng: mapPosition[1],
      },
        };
        
        const uniqueCitiesPos = new Set(cities?.map((city) => `${city.position.lat}-${city.position.lng}`));
        const newPosition = `${newCity.position.lat}-${newCity.position.lng}`;

        if (uniqueCitiesPos.has(newPosition)) {
  alert(`The place with latitude ${newCity.position.lat} and longitude ${newCity.position.lng} already exists in your list.`);
        }
        else {
          await firebase.doAddToFirestore("cities", newCity);
          dispatch({ type: initType.addNewCityToUser , payload : newCity })
          dispatch({ type: initType.clearForm })
          navigate("/app" , {replace : true})
        }

      }
      catch (error) {
        console.log(error)
          
          dispatch({type : initType.error , payload:"Some required fields are missing or invalid."})
      }
      finally {
          dispatch({type : initType.loading , payload:false})
          
      }

  
    } , [state])
    
        const handleLogOut = useCallback(async () => {
        try {
            await firebase.doSignOut()
            dispatch({ type: initType.logout })
            navigate("/")

        }
        catch (error) {
dispatch({ type: initType.error, payload: "Something went wrong when you tried to log out." })

        }
  } ,[])
  const handleDeleteCity =useCallback( async (e, id) => {
    e.preventDefault()

    try {
      await firebase.doDeleteDataFromFirestore("cities", id)
      dispatch({type : initType.deleteCityFromUser , payload : id})
    }
    catch (error) {
      console.log(error)
dispatch({ type: initType.error, payload: "Something went wrong when deleting this item." })

    }
    
  } ,[state])
const formattedFullDate = (date) => moment(date).format("dddd, MMMM DD YYYY")
    const flag = (emoji) => String(emoji).toLowerCase()
const appObject = useMemo(() => {return {
  state, handleBack, handleChangeInputMapForm,
  getCurrentCity, handleUpdatePosition,
  handleMoveToYourPosition, handleAddNewCities,
  handleLogOut , formattedFullDate , handleChangeInputMapFormWhenClick,flag , handleDeleteCity
}}, [state, handleBack, handleChangeInputMapForm, getCurrentCity, handleAddNewCities, handleLogOut, handleChangeInputMapFormWhenClick, handleDeleteCity])


    return <AppContext.Provider value={appObject}>
        {children}
    </AppContext.Provider>
}
export const useAppContext = () => {
    return useContext(AppContext)
}

