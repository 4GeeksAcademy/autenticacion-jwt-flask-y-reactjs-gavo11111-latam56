import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

const Private = () => {
  const { store, dispatch } = useGlobalReducer();
  const navigate = useNavigate(); 

  
useEffect(()=>{
async function fetchProtectedData() {

  try {
      const response = await fetch(
         `${import.meta.env.VITE_BACKEND_URL}api/users`,   
        {
          method: "GET", 
          headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + store.token 
  },
        }
      );

      if (response.ok) {
        const data = await response.json();
        
      } else {
        const errorData = await response.json();
        console.error("Vuelve a iniciar sesión:", errorData);
        dispatch({type:"set_token", payload: ""});
        dispatch({type:"set_email", payload: ""});
        
        alert("Continúa corriendo morro");
        navigate("/");
        // return errorData;
      }
      return;
    } catch (error) {
      console.error("Error en la conexión:", error);
      dispatch({type:"set_token", payload: ""});
        dispatch({type:"set_email", payload: ""});
        
        alert("Continúa corriendo morro");
        navigate("/");

    }
  }
  fetchProtectedData();
},[]);
  return (
    <div
      className="flex flex-col justify-center items-center h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/7ec9269c-81f5-41d5-8062-27430c22508a.png')",
      }}
    >
      <div className="bg-black bg-opacity-60 p-10 rounded-2xl shadow-2xl text-center text-white w-96">
        <h1 className="text-3xl font-bold mb-4">⚡ Run, Barry, Run</h1>
        <img src="https://flxt.tmsimg.com/assets/p20657919_b_v13_af.jpg" alt="The Flash website fan" width="250"/>
        <p className="text-lg mb-6">
          <strong>Email:</strong> {store.email || "usuario@correo.com"}
        </p>

        
      </div>
    </div>
  );
};

export default Private;
