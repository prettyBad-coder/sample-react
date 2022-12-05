import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../contexts/authContext";
import { useNavigate } from "react-router-dom";

type LoginForm = {
	email: string
	password: string
}

function LoginPage() {

	const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>();

	const { login } = useContext(AuthContext);

	const navigate = useNavigate();

	const onSubmit = handleSubmit(formData => {
		login(formData.email);
		navigate("/");
	})

	return (
		<div>
			<form onSubmit={ onSubmit }>
				<div>
					<label htmlFor="email">Adres email</label>
					<input
						{
							...register("email", {
								required: "Adres email jest wymagany",
								minLength: {
									value: 3,
									message: "Adres email musi miec minimalną długośc 3",
								},
								pattern: {
									value: /@/,
									message: "Adres email musi posiadać znak: @"
								},
							})
						}
						id="email"
						name="email"
						type="text"
					/>
					{
						errors.email
							&&
							errors.email.message
					}
				</div>
				<div>
					<label htmlFor="password">Hasło</label>
					<input
						{
							...register("password", {
								required: "Hasło jest wymagane",
								minLength: {
									value: 3,
									message: "Hasło musi miec minimalną długośc 3",
								},
							})
						}
						id="password"
						name="password"
						type="password"
					/>
					{
						errors.password
							&&
							errors.password.message
					}
				</div>
				<button type="submit">Zaloguj</button>
			</form>
		</div>
	);
}

export default LoginPage;