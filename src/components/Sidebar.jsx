import React from "react";
import { GrRestroomWomen } from "react-icons/gr";
import { Link } from "react-router-dom";
import { AiFillProduct } from "react-icons/ai";
import { GiHairStrands } from "react-icons/gi";
import { AiFillSkin } from "react-icons/ai";
import { MdReportProblem } from "react-icons/md";
import { CgProfile } from "react-icons/cg"; 
import { CiLogout } from "react-icons/ci";

const Sidebar = () => {
    return (
        <aside className="w-64 bg-white shadow-md p-4 flex flex-col h-screen">
            <h2 className="text-3xl font-semibold text-pink-400">
                Me_Cosmetics
            </h2>
            <nav className="mt-4 flex-grow">
                <ul>
                    <Link
                        to={"/"}
                        className="p-2 rounded hover:bg-pink-400 hover:text-white mb-4 flex gap-2 items-center text-pink-500"
                    >
                        <GrRestroomWomen size={20} />
                        Пользователи
                    </Link>
                    <Link
                        to={"/products"}
                        className="p-2 rounded hover:bg-pink-400 hover:text-white mb-4 flex gap-2 items-center text-pink-500"
                    >
                        <AiFillProduct size={20} />
                        Продукты
                    </Link>
                    <Link
                        to={"/hair"}
                        className="p-2 rounded hover:bg-pink-400 hover:text-white mb-4 flex gap-2 items-center text-pink-500"
                    >
                        <GiHairStrands size={20} />
                        Типы волосы
                    </Link>
                    <Link
                        to={"/skin"}
                        className="p-2 rounded hover:bg-pink-400 hover:text-white mb-4 flex gap-2 items-center text-pink-500"
                    >
                        <AiFillSkin size={20} />
                        Тип кожи
                    </Link>
                    <Link
                        to={"/problem"}
                        className="p-2 rounded hover:bg-pink-400 hover:text-white mb-4 flex gap-2 items-center text-pink-500"
                    >
                        <MdReportProblem size={20} />
                        Проблемы
                    </Link>
                </ul>
            </nav>

            {/* Profile tugmasi sidebarning eng pastida turadi */}
            <Link
                to={"/profile"}
                className="mt-auto p-2 rounded hover:bg-pink-400 hover:text-white flex gap-2 items-center text-pink-500"
            >
                <CgProfile size={20} />
                Профиль
            </Link>
            <Link
                to={"/login"}
                className="mt-auto p-2 rounded hover:bg-pink-400 hover:text-white flex gap-2 items-center text-pink-500"
            >
                <CiLogout />
                Выход
            </Link>
        </aside>
    );
};

export default Sidebar;
