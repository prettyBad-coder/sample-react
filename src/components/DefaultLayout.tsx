import { useContext, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../contexts/authContext";
import { ReactComponent as LogOutIcon } from "../assets/icons/log-out-icon.svg";
import { ReactComponent as LanguageIcon } from "../assets/icons/language-icon.svg";
import classnames from "classnames";

function DefaultLayout() {

	const { isAuth, logout } = useContext(AuthContext);

	const [ isSidebarOpen, toggleSidebarOpen ] = useState(false);

	const _toggleSidebarOpen = () => toggleSidebarOpen(isOpen => !isOpen);

	return (
		<div>
			<header className="header">
				<div className="header__options">
					<Link to="/" className="header__logo">LOGO</Link>
				</div>
				<div className={ classnames("header__hamburger", { "header__hamburger--active": isSidebarOpen }) } onClick={ _toggleSidebarOpen }></div>
				<nav className={ classnames("header__navigation", { "header__navigation--active": isSidebarOpen }) }>
					<LanguageIcon className="header__language-icon"/>
					<ul className="header__navigation-links-wrapper">
						<li>
							<Link
								className="header__navigation-item header__hover-animation"
								onClick={ _toggleSidebarOpen }
								to="/"
							>
								Strona główna
							</Link>
						</li>
						<li>
							<Link
								className="header__navigation-item header__hover-animation"
								to="/products"
								onClick={ _toggleSidebarOpen }
							>
								Produkty
							</Link>
						</li>
						<li>
							<Link
								className="header__navigation-item header__hover-animation"
								to="/about-shop"
								onClick={ _toggleSidebarOpen }
							>
								O sklepie
							</Link>
						</li>
						<li>
							<Link
								className="header__navigation-item header__hover-animation"
								to="/stationary-shops"
								onClick={ _toggleSidebarOpen }
							>
								Sklepy stacjonarna
							</Link>
						</li>
						<li>
							<Link
								className="header__navigation-item header__hover-animation"
								to="/contact"
								onClick={ _toggleSidebarOpen }
							>
								Kontakt
							</Link>
						</li>
						<li>
							{
								isAuth
									?
									<button
										className="header__logout-button header__hover-animation"
										onClick={ () => {
											logout();
											_toggleSidebarOpen();
										} }
									>
										Wyloguj
										<LogOutIcon className="header__logout-icon"/>
									</button>
									:
									<Link
										to="/login"
										className="header__navigation-item header__hover-animation"
										onClick={ _toggleSidebarOpen }
									>
										Zaloguj
									</Link>
							}
						</li>
					</ul>
				</nav>
			</header>
			<main className="main">
				<Outlet/>
			</main>
		</div>
	);
}

export default DefaultLayout;