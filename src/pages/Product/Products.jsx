import React, { useEffect, useState } from "react";
import { DeleteData, GetDataSimple } from "../../service";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
    Button,
    Card,
    CardBody,
    CardFooter,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
} from "@material-tailwind/react";
import { AddProduct } from "./AddProduct";
import { SendProduct } from "./SendProduct";

const Products = () => {
    const [products, setProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [status, setStatus] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [open, setOpen] = useState(false);

    const changeStatus = () => setStatus(!status);

    useEffect(() => {
        GetDataSimple(`project/product/?page=${currentPage}&page_size=10`).then(
            (res) => {
                setProducts(res.results || []);
                // Backendda total_pages yo‘q, lekin `count` bor
                const total = Math.ceil(res.count / 10);
                setTotalPages(total);
            }
        );
    }, [currentPage, status]);

    const handleDelete = () => {
        if (deleteId) {
            DeleteData(`project/product/${deleteId}/`).then(() => {
                toast.success("Продукт успешно удален!", {
                    position: "top-right",
                    autoClose: 3000,
                });
                changeStatus();
                setOpen(false);
            });
        }
    };

    return (
        <main className="p-6 flex-1">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-pink-500">Продукты</h1>
                <AddProduct changeStatus={changeStatus} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                    <Card
                        key={product.id}
                        className="shadow-lg overflow-hidden"
                    >
                        <div className="h-64 w-full bg-gray-200 flex justify-center items-center">
                            <img
                                className="h-full w-full object-cover"
                                src={product?.image}
                                alt={product.name}
                            />
                        </div>
                        <CardBody className="p-4">
                            <h2 className="text-lg font-semibold mb-2 text-pink-800">
                                {product?.name}
                            </h2>
                            <p className="text-gray-600 text-sm line-clamp-2 h-[40px]">
                                {product.description}
                            </p>
                            <p className="text-gray-700 text-sm mt-2">
                                <span className="font-semibold text-pink-500">
                                    Цена:
                                </span>{" "}
                                {product.price}
                            </p>
                            <p className="text-gray-700 text-sm">
                                <span className="font-semibold text-pink-500">
                                    Telegram:
                                </span>{" "}
                                {product.telegram}
                            </p>
                        </CardBody>
                        <CardFooter className="flex justify-between p-4">
                            <Button
                                onClick={() => {
                                    setDeleteId(product.id);
                                    setOpen(true);
                                }}
                                className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600"
                            >
                                Удалить
                            </Button>
                            <SendProduct id={product.id} />
                        </CardFooter>
                    </Card>
                ))}
            </div>

            {/* --- Pagination --- */}
            <div className="mt-6 flex justify-center items-center gap-2">
                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.max(prev - 1, 1))
                    }
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Назад
                </button>

                <span className="px-4 py-2 text-gray-800 font-medium">
                    Страница {currentPage} из {totalPages}
                </span>

                <button
                    onClick={() =>
                        setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                    }
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
                >
                    Вперед
                </button>
            </div>

            {/* Confirmation Modal */}
            <Dialog open={open} handler={() => setOpen(!open)}>
                <DialogHeader>Подтверждение удаления</DialogHeader>
                <DialogBody>
                    Вы уверены, что хотите удалить этот продукт?
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="gray"
                        onClick={() => setOpen(false)}
                    >
                        Нет
                    </Button>
                    <Button className="bg-pink-500" onClick={handleDelete}>
                        Да
                    </Button>
                </DialogFooter>
            </Dialog>
        </main>
    );
};

export default Products;
