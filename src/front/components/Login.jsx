import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Login = () => {
  const { store, dispatch } = useGlobalReducer()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 
  const handleSubmit = async (e) => {
    e.preventDefault();

   

    console.log("Login data:", { email, password });

    try {
      const response = await fetch(
        "https://infamous-ghost-g4prgj5v6gwr2v45j-3001.app.github.dev/api/tokens",
        {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,

            password: password,
          }),
        }
      );
console.log(response);
      if (response.ok) {
        const data = await response.json();
        console.log("Usuario creado:", data);
        tokenValidation(data.token);
        
        
      } else {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData);
        alert("Error al iniciar sesión");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      
      alert("No se pudo conectar con el servidor");
    }
  };

  const tokenValidation = async (token) => {

    console.log("Login data:", { email, password });

    try {
      const response = await fetch(
        "https://infamous-ghost-g4prgj5v6gwr2v45j-3001.app.github.dev/api/users",
        {
          method: "GET", 
          headers: {
    "Content-Type": "application/json",
    "Authorization": 'Bearer ' + token 
  },
        }
      );

      if (response.ok) {
        const data = await response.json();
        dispatch({type:"set_token", payload: token});
        dispatch({type:"set_email", payload: email});
        console.log("Has iniciado sesión correctamente:", data);
        alert("Has iniciado sesión correctamente");
        navigate("/private");
        return data;
      } else {
        const errorData = await response.json();
        console.error("Error al iniciar sesión:", errorData);
        return errorData;
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Iniciar sesión
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          placeholder="ejemplo@correo.com"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
          placeholder="********"
          required
        />

        <button
          type="submit"
          className="btn btn-warning w-25 text-white fw-semiboldw-full bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Entrar
        </button>

        <p className="text-center mt-4 text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Regístrate
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

   
  
