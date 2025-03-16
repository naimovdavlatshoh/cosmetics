import React, { useEffect, useState } from "react";
import {
    GetDataSimple,
    PostDataTokenJson,
    DeleteData,
    PutDataJson,
} from "../../service";

const Problem = () => {
    const [problems, setProblems] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editValue, setEditValue] = useState({});
    const [status, setStatus] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // ID для модального окна
    const [showModal, setShowModal] = useState(false); // Показывать или скрывать модальное окно

    const changeStatus = () => {
        setStatus(!status);
    };

    useEffect(() => {
        GetDataSimple("project/problems/").then((res) => {
            setProblems(res.results);
        });
    }, [status]);

    const handleAddProblem = () => {
        if (inputValue.trim()) {
            const data = { name: inputValue };
            PostDataTokenJson("project/problems/", data).then(() => {
                setInputValue("");
                changeStatus();
            });
        }
    };

    const handleEditClick = (id, name) => {
        setEditValue({ id, name });
    };

    const handleUpdateProblem = (id) => {
        if (editValue.name.trim()) {
            const data = { name: editValue.name };
            PutDataJson(`project/problems/${id}/`, data).then(() => {
                setEditValue({});
                changeStatus();
            });
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDeleteProblem = () => {
        if (deleteId) {
            DeleteData(`project/problems/${deleteId}/`).then(() => {
                changeStatus();
                setShowModal(false);
                setDeleteId(null);
            });
        }
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 p-6">
            <div className="w-full bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl p-6">
                <h2 className="text-3xl font-bold text-pink-600 text-center mb-4">
                    🛑 Проблемы 🛑
                </h2>

                {/* Ввод и кнопка */}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Введите проблему..."
                        className="w-full p-3 border border-pink-300 bg-white bg-opacity-40 text-pink-800 placeholder-pink-600 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleAddProblem}
                        className="bg-pink-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
                    >
                        Добавить
                    </button>
                </div>

                <ul className="mt-6 space-y-3">
                    {problems.map((problem) => (
                        <li
                            key={problem.id}
                            className="py-3 px-5 bg-white bg-opacity-50 text-pink-900 font-semibold rounded-full shadow-md flex justify-between items-center"
                        >
                            {editValue.id === problem.id ? (
                                <input
                                    type="text"
                                    value={editValue.name}
                                    onChange={(e) =>
                                        setEditValue({
                                            ...editValue,
                                            name: e.target.value,
                                        })
                                    }
                                    className="p-2 border border-pink-300 rounded-lg"
                                />
                            ) : (
                                <span>{problem.name}</span>
                            )}

                            <div className="flex space-x-2">
                                {editValue.id === problem.id ? (
                                    <button
                                        onClick={() =>
                                            handleUpdateProblem(problem.id)
                                        }
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        ✅
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleEditClick(
                                                problem.id,
                                                problem.name
                                            )
                                        }
                                        className="bg-pink-200 text-white px-4 py-2 rounded-lg hover:bg-pink-300"
                                    >
                                        ✏️
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleDeleteClick(problem.id)
                                    }
                                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                                >
                                    🗑️
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Модальное окно подтверждения */}
            {showModal && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
                    <div className="bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">
                            Вы уверены, что хотите удалить эту проблему?
                        </h3>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={confirmDeleteProblem}
                                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
                            >
                                Да, удалить
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Problem;
