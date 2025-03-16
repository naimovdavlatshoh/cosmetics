import React, { useState } from "react";
import { PostDataLogin } from "../../service";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if (!login || !password) {
            toast.error("Логин и пароль обязательны!");
            return;
        }

        const data = {
            username: login,
            password: password,
        };

        PostDataLogin("auth/login/", data)
            .then((res) => {
                localStorage.setItem("token", res.data.access);
                toast.success("Успешный вход!");
                setTimeout(() => navigate("/"), 1000);
            })
            .catch(() => {
                toast.error("Ошибка входа! Проверьте данные.");
            });
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-100">
            <ToastContainer position="top-right" autoClose={3000} />
            <div className="bg-white p-8 rounded-lg shadow-md w-96">
                <h2 className="text-2xl font-bold text-pink-600 text-center">
                    Вход
                </h2>
                <div className="mt-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Логин</label>
                        <input
                            onChange={(e) => setLogin(e.target.value)}
                            type="text"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Введите ваш логин"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Пароль</label>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
                            placeholder="Введите ваш пароль"
                        />
                    </div>
                    <button
                        onClick={handleLogin}
                        className="w-full bg-pink-500 text-white p-2 rounded hover:bg-pink-600 transition"
                    >
                        Войти
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
