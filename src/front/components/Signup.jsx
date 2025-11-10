import React, { useState } from "react";
import useGlobalReducer from "../hooks/useGlobalReducer";

const Signup = () => {
  const { store, dispatch } = useGlobalReducer();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Signup data:", { email, name });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}api/users`,
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

      if (response.ok) {
        const data = await response.json();

        
        dispatch({ type: "set_email", payload: email });
        dispatch({ type: "set_password", payload: password });

        alert("Usuario creado correctamente");
      } else {
        const errorData = await response.json();
        console.error("Error en el registro:", errorData);
        alert("Error al crear usuario");
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
      alert("No se pudo conectar con el servidor");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-2xl shadow-lg w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-indigo-600">
          Crear cuenta
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">Nombre</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          placeholder="Tu nombre completo"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-300 rounded-lg"
          placeholder="ejemplo@correo.com"
          required
        />

        <label className="block mb-2 font-semibold text-gray-700">Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 mb-6 border border-gray-300 rounded-lg"
          placeholder="Mínimo 6 caracteres"
          required
        />

        <button
          type="submit"
          className="btn btn-warning w-100 text-white fw-semibold"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Signup;
