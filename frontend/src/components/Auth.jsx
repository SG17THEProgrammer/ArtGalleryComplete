import axios from "axios";
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState("");
  const [team, setTeam] = useState([]);
  const [products, setProduct] = useState([])
  const [cartItem, setcartItem] = useState([])
  const [particularUserItem, setParticularUserItem] = useState([])
  const [isLoading, setIsLoading] = useState(false);

  axios.defaults.headers.common["Authorization"] = user ? token : "";


  const backendApi = "https://glorious-hat-toad.cyclic.app/api/v1"


  const storeTokensInLS = (serverToken) => {
    setToken(serverToken)
    return localStorage.setItem("token", serverToken);
  };



  let isLoggedIn = !!token; //token hai true hojayega isLoggedIn agar nhi hai toh isLoggedIn false ho jayega
  console.log(token);
  console.log("isLoggedin ", isLoggedIn);

  const LogoutUser = () => {
    setToken("");
    localStorage.removeItem("token");
  };

  const userAuthentication = async () => {

    if (isLoggedIn) {
      try {
        const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/user/myprofile`, {
          method: "GET",
          headers: {
            // Authorization: `Bearer ${token}`,
            Authorization: `${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          // console.log(data)
          // console.log(data.userData);

          setUser(data.user);
        } else {
          console.error("Error fetching user data");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };


  const getTeam = async () => {

    try {
      const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/team/get-team/`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        // console.log(data.teams);

        setTeam(data.teams);
      } else {

        console.error("Error fetching user data");
      }
    } catch (error) {
      console.log(error);
    }
  }


  const getProduct = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/product/get-product`, {
        method: "GET",
      });

      if (response.ok) {

        const data = await response.json();
        console.log(data);

        setProduct(data.products);
        setIsLoading(false)
      } else {
        console.error("Error fetching user data");
        setIsLoading(false)
      }
    } catch (error) {

      console.log(error);
      setIsLoading(false)
    }
  }

  const showCart = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/cart/show-cartproducts`, {
        headers: {
          method: "GET",
          Authorization: token
        }
      });

      if (response.ok) {

        const data = await response.json();
        // console.log(data  );

        setcartItem(data.products);
        setIsLoading(false)
      } else {
        console.error("Error fetching user data");
        setIsLoading(false)
      }
    } catch (error) {

      console.log(error);
      setIsLoading(false)
    }
  }

  const particularUserProduct = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`https://glorious-hat-toad.cyclic.app/api/v1/product/get-myproduct`, {
        headers: {
          method: "GET",
          Authorization: token
        }
      });

      if (response.ok) {

        const data = await response.json();
        // console.log(data  );

        setParticularUserItem(data.products);
        setIsLoading(false)
      } else {
        console.error("Error fetching user data");
        setIsLoading(false)
      }
    } catch (error) {

      console.log(error);
      setIsLoading(false)
    }
  }




  useEffect(() => {
    userAuthentication();
    getTeam();
    getProduct();
    particularUserProduct();
    showCart()
  }, []);

  useEffect(() => {
    showCart()
  }
    , [])

  return (
    <>
      <AuthContext.Provider value={{ isLoggedIn, storeTokensInLS, LogoutUser, user, products, team, isLoading, cartItem, backendApi, particularUserItem }}>
        {children}
      </AuthContext.Provider>
    </>
  );
};


export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth used outside of the Provider");
  }
  return authContextValue;
};