import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Auth/Login";
import Users from "./pages/Users/Users";
import Products from "./pages/Product/Products";
import Hair from "./pages/Hair/Hair";
import Problem from "./pages/Problem/Problem";
import Skin from "./pages/Skin/Skin";
import Profile from "./pages/Profile/Profile";
import ChangePassword from "./pages/Auth/ChangePassword";

const App = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Layout />}>
                <Route index element={<Users />} />
                <Route path="products" element={<Products />} />
                <Route path="hair" element={<Hair />} />
                <Route path="problem" element={<Problem />} />
                <Route path="skin" element={<Skin />} />
                <Route path="profile" element={<Profile />} />
                <Route
                    path="/reset-password/:uidb64/:token"
                    element={<ChangePassword />}
                />
            </Route>
        </Routes>
    );
};

export default App;
