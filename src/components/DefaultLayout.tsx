import { PropsWithChildren, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";

function DefaultLayout(props: PropsWithChildren) {

	const {
		children
	} = props;

	const { isAuth, logout } = useContext(AuthContext);

	return (
		<div>
			<header className="header">
				<div>
					<div className="header__logo-wrapper">
						<Link to="/">LOGO</Link>
					</div>
					<div className="header__language-icon">
						language icon
					</div>
				</div>
				<nav className="header__navigation">
					<ul className="header__navigation-links-wrapper">
						<li className="header__navigation-item">
							<Link to="/">Strona główna</Link>
						</li>
						<li className="header__navigation-item">
							{
								isAuth
									?
									<button onClick={ () => logout() }>Wyloguj</button>
									:
									<button>Zaloguj</button>
							}
						</li>
						<li className="header__navigation-item">
							<Link to="/about-shop">O sklepie</Link>
						</li>
						<li className="header__navigation-item">
							<Link to="/stationary-shops">Sklepy stacjonarna</Link>
						</li>
						<li className="header__navigation-item">
							<Link to="/contact">Kontakt</Link>
						</li>
					</ul>
				</nav>
			</header>
			<main className="main">
				{ children }
			</main>
		</div>
	);
}

export default DefaultLayout;