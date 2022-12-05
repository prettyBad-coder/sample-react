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
		<div className="login">
			<form className="login__form" onSubmit={ onSubmit }>
				<div className="login__title">
					Login
				</div>
				<div className="login__form-item">
					<label
						htmlFor="email"
						className="login__label"
					>
						Adres email
					</label>
					<input
						className="login__input"
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
					<div className="login__error">
						{
							errors.email
							&&
							errors.email.message
						}
					</div>
				</div>
				<div className="login__form-item">
					<label
						htmlFor="password"
						className="login__label"
					>
						Hasło
					</label>
					<input
						className="login__input"
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
					<div className="login__error">
						{
							errors.password
								&&
								errors.password.message
						}
					</div>
				</div>
				<button type="submit" className="login__submit-button">Zaloguj</button>
			</form>
		</div>
	);
}

export default LoginPage;