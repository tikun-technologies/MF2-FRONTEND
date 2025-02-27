import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const checkedLoggedIn = (endpoint) => {
  const { token } = useContext(AuthContext);
  return token ? "/dashboard" : "/signup";
};

export default checkedLoggedIn;
