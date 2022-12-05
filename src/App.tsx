import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./components/DefaultLayout";
import MainPage from "./routes/MainPage";
import LoginPage from "./routes/LoginPage";
import PrivateRoutes from "./components/PrivateRoutes";
import AboutShop from "./routes/AboutShop.";
import StationaryShops from "./routes/StationaryShops";
import Contact from "./routes/Contact";

function App() {

    return (
        <Routes>
            <Route element={ <PrivateRoutes/> }>
                <Route path="/" element={ <DefaultLayout><MainPage/></DefaultLayout> }/>
                <Route path="/about-shop" element={ <DefaultLayout><AboutShop/></DefaultLayout> }/>
                <Route path="/stationary-shops" element={ <DefaultLayout><StationaryShops/></DefaultLayout> }/>
                <Route path="/contact" element={ <DefaultLayout><Contact/></DefaultLayout> }/>
            </Route>
            <Route path="/login" element={ <DefaultLayout><LoginPage/></DefaultLayout> }/>
        </Routes>
    );
}

export default App;
