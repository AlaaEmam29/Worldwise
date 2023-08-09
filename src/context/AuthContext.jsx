import { faker } from '@faker-js/faker';
import { createContext, useCallback, useContext, useEffect, useMemo, useReducer } from "react";
import { useNavigate } from "react-router";
import * as Yup from 'yup';
import { useFirebaseContext } from "./FirebaseContext";

const AuthContext = createContext()
const initState = {
    name: "",
    email: "",
    password: "",
    error: "",
    user: null,
    errorFirebase : ""
}
const restRegisterSuccessful = {
        name: "",
    email: "",
    password: "",
}
const initType = {
    name : "name",
    email : "email",
    password: "password",
    error: "error",
    user: "user",
    restRegisterSuccessful: "restRegisterSuccessful",
    clearForm: "clearForm",
    errorFirebase : "errorFirebase"
}

const reducer = (state, action) => {
    switch (action.type) {
        case initType.email:
        case initType.name:
            case initType.password:
            return {
                ...state, 
                
                [action.type] : action.payload                
            }
         case initType.error:
      return {
        ...state,
        error: action.payload,
            };
         case initType.user:
      return {
        ...state,
        user : action.payload,
            };
        case initType.restRegisterSuccessful:
            return {
                ...state,
               ...restRegisterSuccessful
            }
        case initType.clearForm:
            return {
                ...initState
            }
        case initType.errorFirebase:
            return {
                ...state,
                errorFirebase: action.payload
                
            }
        default:
           return state;

  }
            

    }
    

export const AuthContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initState)
    const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
    // min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit.
    
    const { firebase } = useFirebaseContext()
    const navigate = useNavigate()
    const memoizedUserDispatch = useMemo(() => dispatch, []);

    const validationSchema = Yup.object().shape({
   name: Yup.string()
     .min(2, 'Too Short! Must be at least 2 characters')
     .max(50, 'Too Long! Must be at most 50 characters')
        .required('Required'),
     password: Yup
    .string()
    .matches(passwordRules, { message: "Please create a stronger password , min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit."  })
    .required("Required"),

   email: Yup.string().email('Invalid email').required('Required'),
    });
    const validationSchemaLogin = Yup.object().shape({
     password: Yup
    .string()
    .matches(passwordRules, { message: "Please create a stronger password , min 5 characters, 1 upper case letter, 1 lower case letter, 1 numeric digit."  })
    .required("Required"),

   email: Yup.string().email('Invalid email').required('Required'),
    });
    
    useEffect(() => {
        const unsubscribe = firebase.doOnAuthStateChanged((user) => {
            if (user) {
                memoizedUserDispatch({ type: initType.user, payload: user })

                            }
            else {
                memoizedUserDispatch({type : initType.user , payload : null})

            }
        })
    return () => unsubscribe();
    }, [firebase, memoizedUserDispatch])

    useEffect(() => {
      if (state.user?.uid) {
        navigate("/app/cities" , {replace :true})
    
        }
      
    }, [state.user?.uid])
  

    const handleChangeInput = async (e) => {
        const { name, value } = e.target;       
            dispatch({type : name , payload : value})
    }
    const handleSubmitRegister =useCallback( async (e) => {
        e.preventDefault()
  try {
    await validationSchema.validate(state, { abortEarly: false });
      const { name, email, password } = state;

      const {user} = await firebase.doCreateUserWithEmailAndPassword(email, password)
    await firebase.doUpdateProfile(user , {
      displayName: name,
      photoURL: faker.image.avatar(),
    });
                navigate("/login")
              dispatch({type : initType.restRegisterSuccessful })

  }
  catch (error) {
    if (error.name === 'ValidationError') {
      const newErrors = {};
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      dispatch({ type: initType.error, payload: newErrors });
    }
  }
    }  , [])
        const handleSubmitLogin =useCallback( async (e) => {
            e.preventDefault()
  try {
      const { email, password } = state;
    await validationSchemaLogin.validate( { email, password }, { abortEarly: false });
       await firebase.doSignInWithEmailAndPassword(email, password)
      navigate("/app")
     

  }
  catch (error) {
      console.log(error)
      if (error.name === 'ValidationError') {
          const newErrors = {};
          error.inner.forEach((err) => {
              newErrors[err.path] = err.message;
            });
      dispatch({ type: initType.error, payload: newErrors });
      } else {
      dispatch({ type: initType.errorFirebase, payload: error.message });
    }
            }
  finally {
                    dispatch({type : initType.restRegisterSuccessful })

            }
    } , [])

    const handleGoogleLoginIn =useCallback( async () => {
        try {
          await firebase.doSignInWithPopupGoogle()
        navigate("/app")       
        }
        catch (error) {
        dispatch({ type: initType.errorFirebase, payload: error.message });

        }
    } , [])
const authObj = useMemo(() => {return {handleChangeInput,
    handleSubmitRegister,
    handleSubmitLogin,
    state,
    handleGoogleLoginIn,
}}, [handleGoogleLoginIn, handleSubmitLogin, handleSubmitRegister, state])
    return <AuthContext.Provider value={authObj}>
        {children}
    </AuthContext.Provider>
}
export const useAuthContext = () => {
    return useContext(AuthContext)
}