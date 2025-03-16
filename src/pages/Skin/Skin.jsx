import React, { useEffect, useState } from "react";
import {
    GetDataSimple,
    PostDataTokenJson,
    DeleteData,
    PutDataJson,
} from "../../service";

const SkinType = () => {
    const [skinTypes, setSkinTypes] = useState([]);
    const [inputValue, setInputValue] = useState("");
    const [editValue, setEditValue] = useState({});
    const [status, setStatus] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const changeStatus = () => {
        setStatus(!status);
    };

    useEffect(() => {
        GetDataSimple("project/type/skin/").then((res) => {
            setSkinTypes(res.results);
        });
    }, [status]);

    const handleAddSkinType = () => {
        if (inputValue.trim()) {
            const data = { name: inputValue };
            PostDataTokenJson("project/type/skin/", data).then(() => {
                setInputValue("");
                changeStatus();
            });
        }
    };

    const handleEditClick = (id, name) => {
        setEditValue({ id, name });
    };

    const handleUpdateSkinType = (id) => {
        if (editValue.name.trim()) {
            const data = { name: editValue.name };
            PutDataJson(`project/type/skin/${id}/`, data).then(() => {
                setEditValue({});
                changeStatus();
            });
        }
    };

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setShowModal(true);
    };

    const confirmDeleteSkinType = () => {
        if (deleteId) {
            DeleteData(`project/type/skin/${deleteId}/`).then(() => {
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
                    🌿 Типы кожи 🌿
                </h2>

                {/* Ввод и кнопка */}
                <div className="flex items-center space-x-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Введите тип кожи..."
                        className="w-full p-3 border border-pink-300 bg-white bg-opacity-40 text-pink-800 placeholder-pink-600 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                    <button
                        onClick={handleAddSkinType}
                        className="bg-pink-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-pink-600 transition transform hover:scale-105"
                    >
                        Добавить
                    </button>
                </div>

                <ul className="mt-6 space-y-3">
                    {skinTypes.map((skinType) => (
                        <li
                            key={skinType.id}
                            className="py-3 px-5 bg-white bg-opacity-50 text-pink-900 font-semibold rounded-full shadow-md flex justify-between items-center"
                        >
                            {editValue.id === skinType.id ? (
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
                                <span>{skinType.name}</span>
                            )}

                            <div className="flex space-x-2">
                                {editValue.id === skinType.id ? (
                                    <button
                                        onClick={() =>
                                            handleUpdateSkinType(skinType.id)
                                        }
                                        className="bg-pink-500 text-white px-4 py-2 rounded-lg hover:bg-pink-600"
                                    >
                                        ✅
                                    </button>
                                ) : (
                                    <button
                                        onClick={() =>
                                            handleEditClick(
                                                skinType.id,
                                                skinType.name
                                            )
                                        }
                                        className="bg-pink-200 text-white px-4 py-2 rounded-lg hover:bg-pink-300"
                                    >
                                        ✏️
                                    </button>
                                )}
                                <button
                                    onClick={() =>
                                        handleDeleteClick(skinType.id)
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
                            Вы уверены, что хотите удалить этот тип кожи?
                        </h3>
                        <div className="flex justify-end space-x-3">
                            <button
                                onClick={() => setShowModal(false)}
                                className="px-4 py-2 bg-gray-300 rounded-lg hover:bg-gray-400"
                            >
                                Отмена
                            </button>
                            <button
                                onClick={confirmDeleteSkinType}
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

export default SkinType;
