import { AuthContext } from "./authContext";
import { PropsWithChildren, useState } from "react";
import Cookies from "js-cookie";

export const AuthProvider = ({ children }: PropsWithChildren) => {

	const [ isAuth, toggleAuth ] = useState(!!Cookies.get("auth"));

	const login = (email: string) => {
		toggleAuth(true);
		Cookies.set("auth", email);
	};

	const logout = () => {
		Cookies.remove("auth")
		toggleAuth(false);
	};

	return (
		<AuthContext.Provider value={ { isAuth, login, logout } }>
			{ children }
		</AuthContext.Provider>
	);
}