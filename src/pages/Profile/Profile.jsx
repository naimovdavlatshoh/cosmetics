import { Button, Input } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { IoSend, IoPencil, IoSave } from "react-icons/io5";

import {
    GetDataSimple,
    PostData,
    PostDataTokenJson,
    PutDataJson,
} from "../../service";

const Profile = () => {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [status, setStatus] = useState(false);
    const [status2, setStatus2] = useState(false);
    const [data, setData] = useState(null);

    const [editUsername, setEditUsername] = useState(false); // input holatini boshqarish
    const [newUsername, setNewUsername] = useState(""); // yangi username qiymati

    const handleChangepassword = () => {
        const data = {
            new_password: password,
            confirm_password: confirmPassword,
        };
        PostDataTokenJson("auth/change/password/", data).then((res) => {
            setStatus2(!status2);
            setStatus(!status);
        });
    };

    const handleUsernameSave = () => {
        // Backendga so'rov yuboramiz (yo'lini o'zing to'g'irlaysan)
        PutDataJson("auth/profile/", {
            username: newUsername,
        }).then((res) => {
            // Muvaffaqiyatli yangilangandan keyin ekrandagi username yangilanadi
            setData((prevData) => ({
                ...prevData,
                username: newUsername,
            }));
            setEditUsername(false); // inputni yopamiz
        });
    };

    useEffect(() => {
        GetDataSimple("auth/profile/").then((res) => {
            setData(res);
            setNewUsername(res.username); // default qiymat input uchun
        });
    }, []);

    return (
        <div className="flex justify-start items-start min-h-screen bg-pink-100 w-full p-5">
            <div className="card w-1/2 space-y-5">
                {/* Username va Edit qismi */}
                <div className="flex items-center space-x-3">
                    {editUsername ? (
                        <>
                            <Input
                                label="Username"
                                color="pink"
                                value={newUsername}
                                onChange={(e) => setNewUsername(e.target.value)}
                            />
                            <Button
                                onClick={handleUsernameSave}
                                className="bg-green-500 flex items-center "
                            >
                                Save
                            </Button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-3xl text-pink-600">
                                {data?.username}
                            </h1>
                            <Button
                                onClick={() => setEditUsername(true)}
                                className="bg-pink-600 flex items-center gap-2"
                            >
                                <IoPencil size={16} /> Edit
                            </Button>
                        </>
                    )}
                </div>

                {/* Password reset tugmasi */}
                <button
                    onClick={() => setStatus(!status)}
                    className="w-[200px] h-[40px] bg-pink-600 text-white rounded-lg"
                >
                    изменить пароль
                </button>

                {/* Xabar ko'rsatish */}
                {status2 && (
                    <p className="text-green-600">Ваш пароль был изменен</p>
                )}

                {/* Email va send tugmasi */}
                {status && (
                    <div className="flex flex-col items-center gap-3  w-[500px] bg-pink-50 p-5">
                        <Input
                            onChange={(e) => setPassword(e.target.value)}
                            label="Пароль"
                            color="pink"
                        />
                        <Input
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            label="Подтвердите пароль"
                            color="pink"
                        />
                        <Button
                            onClick={handleChangepassword}
                            className="bg-pink-500 flex justify-end items-center w-full"
                        >
                            <IoSend size={15} />
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
