import React, { useEffect, useState } from "react";
import {
    GetDataSimple,
    PostDataTokenJson,
    DeleteData,
    PutDataJson,
} from "../../service";

const Hair = () => {
    const [hairTypes, setHairTypes] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editValue, setEditValue] = useState({});
    const [status, setStatus] = useState(false);
    const [deleteId, setDeleteId] = useState(null); // Modal uchun

    const changeStatus = () => {
        setStatus(!status);
    };

    useEffect(() => {
        GetDataSimple("project/type/hair/").then((res) => {
            setHairTypes(res.results);
        });
    }, [status]);

    const handleAddHairType = () => {
        if (inputValue.trim()) {
            const data = { name: inputValue };
            PostDataTokenJson("project/type/hair/", data).then(() => {
                setInputValue("");
                changeStatus();
            });
        }
    };

    const handleEditClick = (id, name) => {
        setEditValue({ id, name });
    };

    const handleUpdateHairType = (id) => {
        if (editValue.name.trim()) {
            const data = { name: editValue.name };
            PutDataJson(`project/type/hair/${id}/`, data).then(() => {
                setEditValue({});
                changeStatus();
            });
        }
    };

    const handleDeleteHairType = (id) => {
        setDeleteId(id); // Modalni chiqarish
    };

    const confirmDelete = () => {
        if (deleteId) {
            DeleteData(`project/type/hair/${deleteId}/`).then(() => {
                setDeleteId(null);
                changeStatus();
            });
        }
    };

    return (
        <div className="w-full flex flex-col items-center min-h-screen bg-gradient-to-r from-pink-50 to-pink-100 p-6">
            <div className="w-full bg-white bg-opacity-20 backdrop-blur-lg shadow-xl rounded-2xl p-6">
                <h2 className="text-3xl font-bold text-pink-600 text-center mb-4">
                    💖 Типы волос 💖
                </h2>

                {/* Input & Button */}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Введите тип волос..."
                        className="w-full p-3 border border-pink-300 bg-white bg-opacity-40 text-pink-800 placeholder-pink-600 rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500"
                    />
                    <button
                        onClick={handleAddHairType}
                        className="bg-pink-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
                    >
                        Добавить
                    </button>
                </div>

                <ul className="mt-6 space-y-3">
                    {hairTypes.map((type) => (
                        <li
                            key={type.id}
                            className="py-3 px-5 bg-white bg-opacity-50 text-pink-900 font-semibold rounded-full shadow-md flex justify-between items-center"
                        >
                            {editValue.id === type.id ? (
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
                                <span>{type.name}</span>
                            )}

                            <div className="flex space-x-2">
                                {editValue.id === type.id ? (
                                    <button
                                        onClick={() =>
                                            handleUpdateHairType(type.id)
                                        }
                                        className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
                                    >
                                        ✅
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleEditClick(type.id, type.name)
                                        }
                                        className="bg-pink-200 text-white px-4 py-2 rounded-lg hover:bg-pink-300"
                                    >
                                        ✏️
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleDeleteHairType(type.id)
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

            {/* Delete Confirmation Modal */}
            {deleteId && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-6 rounded-xl shadow-lg text-center">
                        <h3 className="text-xl font-bold text-pink-600 mb-4">
                            Вы уверены?
                        </h3>
                        <p className="text-gray-700">
                            Хотите удалить этот тип волос?
                        </p>
                        <div className="mt-4 flex justify-center space-x-4">
                            <button
                                onClick={confirmDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                            >
                                Да, удалить
                            </button>
                            <button
                                onClick={() => setDeleteId(null)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-400"
                            >
                                Отмена
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Hair;
