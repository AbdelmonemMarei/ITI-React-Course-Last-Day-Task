
import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // can use with out local storage but it will be lost when we refresh
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // use local storage to make user sign in permanently
  // const [users, setUsers] = useState(JSON.parse(localStorage.getItem("users"))|| []);
  // const [currentUser, setCurrentUser] = useState(JSON.parse(localStorage.getItem("currentUser")) || null);
  const navigate = useNavigate();

    let toastSucces = (message) => toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    let toastError = (error) => toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  const loginAction = (user) => {
    const currentUser = users.filter((u) => u.username === user.username && u.password === user.password)[0];
    if (!currentUser){
      toastError("Please provide valid username and password.");
    } else {
      setCurrentUser(currentUser);
      toastSucces("You are logged in successfully");
      // localStorage.setItem("currentUser", JSON.stringify(currentUser));
      navigate("/");
    }
  };

  const registerAction = (user) => {
    const userCartItems = [];
    user = {...user, cart: userCartItems};
    setUsers([...users, user]);
    toastSucces("You are registered successfully");
    // localStorage.setItem("users", JSON.stringify([...users, user]));
    navigate("/login");
  }
  const logOut = () => {
    setCurrentUser(null);
    toastSucces("You are logged out successfully");
    // localStorage.removeItem("currentUser");
    navigate("/login");
  };

  const addToCart = (product) =>{
    const productQuantity = currentUser.cart.filter(item => item.id === product.id).length + 1 || 1;
    product = {...product, quantity: productQuantity + 1};
    const filteredCart = currentUser.cart.filter(item => item.id !== product.id);
    setCurrentUser({...currentUser, cart: [...filteredCart, product]});

    // localStorage.setItem("currentUser", JSON.stringify({...currentUser, cart: updatedCart}));
  };

  const updateCart = (newCart) => {
    setCurrentUser(prev => ({...prev, cart: newCart}))
    // localStorage.setItem("currentUser", JSON.stringify({...currentUser, cart: newCart}));
  };
  const removeFromCart = (productId) => {
    const updatedCart = currentUser.cart.filter(item => item.id !== productId);
    setCurrentUser({...currentUser, cart: updatedCart});
    // localStorage.setItem("currentUser", JSON.stringify({...currentUser, cart: updatedCart}));
  };

  const checkout = () => {
    setCurrentUser({...currentUser, cart: []});
    // localStorage.setItem("currentUser", JSON.stringify({...currentUser, cart: []}));
  }
  return (
    <AuthContext.Provider value={{ users, currentUser, loginAction, registerAction, logOut, addToCart,updateCart, removeFromCart,checkout }}>
      {children}
      <ToastContainer />
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};
