import React, { useEffect, useState } from "react";
import { DeleteData, GetDataSimple } from "../../service";
import { UpdateUserModal } from "./Updateuser";
import { ConfirmationModal } from "./ConfirmationModal";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [openModal, setOpenModal] = useState(false);
    const [status, setStatus] = useState(false);
    const [search, setSearch] = useState("");
    const [token, setToken] = useState();
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

    const pageSize = 10; // sahifada nechta user ko‘rsatish

    useEffect(() => {
        const token = localStorage.getItem("token");
        setToken(token);
    }, []);

    const changeStatus = () => setStatus(!status);

    useEffect(() => {
        GetDataSimple(
            `project/custumer/?page=${currentPage}&page_size=${pageSize}&search=${search}`
        ).then((res) => {
            setUsers(res.results || []);
            // Backend count beradi, total_pages ni o‘zim hisoblaymiz
            const total = Math.ceil(res.count / pageSize);
            setTotalPages(total);
        });
    }, [currentPage, search, status, token]);

    const handleDeleteClick = (id) => {
        setSelectedUserId(id);
        setIsConfirmModalOpen(true);
    };

    const handleConfirmDelete = () => {
        if (selectedUserId) {
            DeleteData(`project/custumer/${selectedUserId}/`).then(() => {
                toast.success("Пользователь успешно удален!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                changeStatus();
                setIsConfirmModalOpen(false);
                setSelectedUserId(null);
            });
        }
    };

    const handleCancelDelete = () => {
        setIsConfirmModalOpen(false);
        setSelectedUserId(null);
    };

    return (
        <main className="flex-1 p-6">
            <div className="flex w-full justify-between items-center mb-5">
                <h1 className="text-2xl font-bold text-pink-500 ">
                    Пользователи
                </h1>
                <input
                    placeholder="Поиск"
                    onChange={(e) => setSearch(e.target.value)}
                    type="text"
                    className="h-[34px] w-[200px] bg-transparent border-2 rounded-md px-2 outline-none border-pink-500 text-pink-500"
                />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {users.map((user) => (
                    <div
                        key={user.id}
                        className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md flex flex-col items-start text-center"
                    >
                        <div className="w-16 h-16 bg-pink-500 text-white flex items-center justify-center rounded-full text-xl font-semibold">
                            {user?.first_name?.[0] || "?"}
                        </div>
                        <h2 className="mt-3 text-lg font-semibold">
                            {user?.first_name}
                        </h2>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Дата рождения:{" "}
                            <span className="text-pink-500">
                                {user.birth_date}
                            </span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Адрес:{" "}
                            <span className="text-pink-500">
                                {user.address}
                            </span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Телефон:{" "}
                            <span className="text-pink-500">{user.phone}</span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Тип кожи:{" "}
                            <span className="text-pink-500">
                                {user.type_skin?.name}
                            </span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Тип волос:{" "}
                            <span className="text-pink-500">
                                {user.type_hair?.name}
                            </span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Проблемы:{" "}
                            <span className="text-pink-500">
                                {user.problems?.name}
                            </span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Зарплата:{" "}
                            <span className="text-pink-500">{user.salary}</span>
                        </p>
                        <p className="text-gray-500 dark:text-gray-400 text-sm">
                            Профессия:{" "}
                            <span className="text-pink-500">
                                {user.profession}
                            </span>
                        </p>
                        <span className="mt-2 px-3 py-1 text-sm font-medium rounded-full bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-300">
                            Баланс: {user.balance}
                        </span>

                        <div className="mt-4 flex gap-2">
                            <UpdateUserModal
                                changeStatus={changeStatus}
                                id={user?.id}
                            />
                            <button
                                onClick={() => handleDeleteClick(user.id)}
                                className="px-3 py-1 border border-pink-500 text-pink-500 rounded-md hover:bg-pink-600 hover:text-white"
                            >
                                Удалить
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination */}
            <div className="mt-6 flex justify-center gap-2">
                <button
                    onClick={() =>
                        currentPage > 1 && setCurrentPage(currentPage - 1)
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Назад
                </button>

                <span className="px-4 py-2">
                    Страница {currentPage} из {totalPages || 1}
                </span>

                <button
                    onClick={() =>
                        currentPage < totalPages &&
                        setCurrentPage(currentPage + 1)
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Вперед
                </button>
            </div>

            {/* Confirmation Modal */}
            <ConfirmationModal
                isOpen={isConfirmModalOpen}
                onClose={handleCancelDelete}
                onConfirm={handleConfirmDelete}
                message="Вы уверены, что хотите удалить этого пользователя?"
            />
        </main>
    );
};

export default Users;
