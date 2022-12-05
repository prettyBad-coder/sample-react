import { createContext } from "react";

type Auth = {
	isAuth: boolean
	login: (email: string) => void
	logout: () => void
};

export const AuthContext = createContext<Auth>({
	isAuth: false,
	login: () => null,
	logout: () => null,
})