import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { NewPassword } from "../../service";
import { useNavigate, useParams } from "react-router-dom";

const ChangePassword = () => {
    const { uidb64, token } = useParams();
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    const handlePasswordChange = () => {
        const data = {
            password: password,
            confirm_password: confirmPassword,
            token: token,
            uidb64: uidb64,
        };
        NewPassword(`auth/new/passwordd/`, data).then((res) => {
            navigate("/");
            console.log("ok");
        });
    };

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="mb-10 text-2xl text-pink-500">Change Password</h1>
            <div className="card w-1/3 flex flex-col gap-4">
                <Input
                    onChange={(e) => setPassword(e.target.value)}
                    label="Password"
                />
                <Input
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    label="Confirm Password"
                />
                <Button onClick={handlePasswordChange} color="pink">
                    send
                </Button>
            </div>
        </div>
    );
};

export default ChangePassword;
