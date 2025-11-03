import { Link } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
	const { store, dispatch } = useGlobalReducer();
	const goBackHomepage = () => {
    dispatch({
      type: "set_token",
      payload: ""
    });
  };
	return (
	

			
				<nav className="navbar navbar-light bg-light">
					<div className="container d-flex justify-content-between align-items-center">
						
						<Link to="/">
							<button className="btn btn-success navbar-brand mb-0 h1 text-light">
								Back to Homepage
							</button>
						</Link>
		
						{ !store.token ? (
						<div className="d-flex gap-2">
							<Link to="/signup">
								<button className="btn btn-primary">Registrarse</button>
							</Link>
							<Link to="/login">
								<button className="btn btn-outline-primary">Inicia sesión</button>
							</Link>
						</div>
						) : (<div className="d-flex gap-2">
							
								<button className="btn btn-primary">SetlistSongs</button>
							
							
								<button className="btn btn-outline-primary">Pictures</button>
							<Link to="/login">
								<button className="btn btn-danger" onClick={goBackHomepage}>Cerrar Sesión</button>
							</Link>
						</div>)}
					</div>
				</nav>

		
		
	);
};
