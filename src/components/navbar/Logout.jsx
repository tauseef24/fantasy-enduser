import React from "react";
import { useNavigate } from "react-router-dom";

function Logout() {
    const navigate = useNavigate();

    const handleClick = () => {
        localStorage.removeItem("persist:root");
        localStorage.removeItem("AccessToken");
        navigate("/login");
    }

  return <button className="w-full text-white" onClick={handleClick}>Log Out</button>;
}

export default Logout;
