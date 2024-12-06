import { createContext, useEffect, useState } from "react";
import { initialLoginFormData, initialSignupFormData } from "../../config";
import { useNavigate } from 'react-router-dom';
import { checkAuthService, loginService, registerService } from "../../services";
import Skelaton from "../../components/loader/Skelaton";

export const AuthContext = createContext(null);

export default function AuthProvider({ children }) {
    const navigate = useNavigate(); 
    const [SignupFormData, setSignupFormData] = useState(initialSignupFormData);
    const [LoginFormData, setLoginFormData] = useState(initialLoginFormData);
    const [authToken, setAuthToken] = useState({authenticate: false, user: null}); // to store JWT token if needed
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const handleRegisterUser = async (e) => {
        e.preventDefault(); // Prevent form submission default action
        try {
            const response = await registerService(SignupFormData);
            console.log(response.data); // Handle response as needed
            navigate('/login');
        } catch (error) {
            console.error("Error during registration:", error);
        }
    };

    const handleLoginUser = async (e) => {
        e.preventDefault();
        try {
            const data = await loginService(LoginFormData);
            if(data.success){
                sessionStorage.setItem("token", JSON.stringify(data.token));
                const storedToken = sessionStorage.getItem('token');
                if (storedToken) {
                setAuthToken({authenticate: true, user:data.user});
                }
                 // store JWT
                navigate('/');
                if(data.user.role === 'instructor'){
                    navigate("/instructor")
                }
            }else{
                setAuthToken({authenticate: false, user:null});
                setErrorMessage("Email Or Password is incorrect")
            }
            

           
        } catch (error) {
            console.error('Error during login:', error);
            setErrorMessage("Email Or Password is incorrect")
        }
    };
   

    //check auth user 

    const checkAuthUser = async () => {
        try {
            const data = await checkAuthService();
            if (data.success) {
              setAuthToken({
                authenticate: true,
                user: data.data.user,
              });
              setLoading(false);
            } else {
              setAuthToken({
                authenticate: false,
                user: null,
              });
              setLoading(false);
            }
          } catch (error) {
            console.log(error);
            if (!error?.response?.data?.success) {
              setAuthToken({
                authenticate: false,
                user: null,
              });
              setLoading(false);
            }
          }
    };
    
    useEffect(() => {
        checkAuthUser(); // Ensure authToken is repopulated after each refresh
    }, []);

    

 
    return (
        <AuthContext.Provider value={{
            SignupFormData,
            setSignupFormData,
            LoginFormData,
            setLoginFormData,
            handleRegisterUser,
            handleLoginUser,
            authToken,
            checkAuthUser,
            errorMessage,
            setErrorMessage
            
        }}>
            {loading ? <Skelaton /> : children}
        </AuthContext.Provider>
    );
}
