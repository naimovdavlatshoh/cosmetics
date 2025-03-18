import React from "react";

export const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg w-[600px]">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                    Подтверждение удаления
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    {message}
                </p>
                <div className="flex justify-end gap-2">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                    >
                        Отмена
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </div>
    );
};
