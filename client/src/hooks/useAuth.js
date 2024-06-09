import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const useAuth = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const login = async (email, password) => {
    const res = await axios.post("http://localhost:4000/users/login", {
      email,
      password,
    });
    const { token, role } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
    navigate(`/${role}`);
  };

  const register = async (userData) => {
    const res = await axios.post(
      "http://localhost:4000/users/register",
      userData
    );
    const { token, role } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    setAuth({ token, role });
    navigate(`/${role}`);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setAuth({ token: null, role: null });
    navigate("/login");
  };

  return { login, register, logout, auth };
};

export default useAuth;
