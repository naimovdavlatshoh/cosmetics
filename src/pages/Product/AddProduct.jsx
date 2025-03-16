import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Typography,
    Input,
} from "@material-tailwind/react";
import { PostData } from "../../service";

export function AddProduct({ changeStatus }) {
    const [open, setOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [telegram, setTelegram] = useState("");

    const handleOpen = () => setOpen(!open);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const handlePost = async () => {
        const formdata = new FormData();
        formdata.append("name", name);
        formdata.append("description", description);
        formdata.append("price", price);
        formdata.append("telegram", telegram);
        formdata.append("detail", "nbdsbsdh");
        formdata.append("image", selectedFile);

        try {
            await PostData("project/product/", formdata);
            changeStatus(); // Update status to trigger re-fetch
            handleOpen(); // Close modal
        } catch (error) {
            console.error("Ошибка при добавлении продукта:", error);
        }
    };

    return (
        <>
            <Button onClick={handleOpen} className="bg-pink-500">
                Добавить
            </Button>
            <Dialog open={open} size="xs" handler={handleOpen}>
                <div className="flex items-center justify-between">
                    <DialogHeader className="flex flex-col items-start">
                        <Typography className="mb-1" variant="h4">
                            Добавить новый продукт
                        </Typography>
                    </DialogHeader>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="mr-3 h-5 w-5 cursor-pointer"
                        onClick={handleOpen}
                    >
                        <path
                            fillRule="evenodd"
                            d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
                <DialogBody>
                    <label className="flex flex-col items-center justify-center w-full h-[150px] border-2 border-dashed  rounded-lg cursor-pointer border-pink-500 transition-colors mb-3">
                        <input
                            type="file"
                            className="hidden"
                            onChange={handleFileChange}
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-12 h-12 text-gray-400"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 4v12m0 0l-3-3m3 3l3-3M4 12h16"
                            />
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">
                            {selectedFile
                                ? selectedFile.name
                                : "Нажмите для загрузки файла"}
                        </p>
                    </label>
                    <input
                        placeholder="Название продукта"
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        className="border border-pink-500 text-pink-500 outline-none rounded-md w-full h-[34px] px-2 mb-2"
                    />
                    <input
                        placeholder="Описание продукта"
                        onChange={(e) => setDescription(e.target.value)}
                        type="text"
                        className="border border-pink-500 text-pink-500 outline-none rounded-md w-full px-2 mb-2 "
                    />
                    <input
                        placeholder="Цена продукта"
                        onChange={(e) => setPrice(e.target.value)}
                        type="text"
                        className="border border-pink-500 text-pink-500 outline-none rounded-md w-full h-[34px] px-2 mb-2"
                    />
                    <input
                        placeholder="Telegram продукта"
                        onChange={(e) => setTelegram(e.target.value)}
                        type="text"
                        className="border border-pink-500 text-pink-500 outline-none rounded-md w-full h-[34px] px-2 mb-2"
                    />
                </DialogBody>
                <DialogFooter className="space-x-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        Отмена
                    </Button>
                    <Button className="bg-pink-500" onClick={handlePost}>
                        Добавлять
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
