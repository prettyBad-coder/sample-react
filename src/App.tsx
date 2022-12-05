import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import MainPage from "./routes/MainPage";
import LoginPage from "./routes/LoginPage";
import AboutShop from "./routes/AboutShop.";
import StationaryShops from "./routes/StationaryShops";
import Contact from "./routes/Contact";
import Products from "./routes/Products";
import PrivateRoute from "./components/PrivateRoute";

function App() {

    return (
        <Routes>
            <Route element={ <DefaultLayout/> }>
                <Route path="/" element={ <MainPage/> }/>
                <Route path="/about-shop" element={ <AboutShop/> }/>
                <Route path="/stationary-shops" element={ <StationaryShops/> }/>
                <Route path="/contact" element={ <Contact/> }/>
                <Route path="/login" element={ <LoginPage/> }/>
                <Route element={ <PrivateRoute/> }>
                    <Route path="/products" element={ <Products/> }/>
                </Route>
                <Route path="*" element={ <div>404</div> }/>
            </Route>
        </Routes>
    );
}

export default App;
