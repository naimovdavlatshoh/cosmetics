import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Input,
    Select,
    Option,
} from "@material-tailwind/react";
import {
    GetDataSimple,
    PostDataTokenJson,
    PutDataJson,
    PutDataToken,
} from "../../service";

export function UpdateUserModal({ changeStatus, id }) {
    const [open, setOpen] = useState(false);
    const [data, setData] = useState(null);
    const [firstname, setFirstname] = useState("");
    const [birthdate, setBirthdate] = useState("");
    const [address, setAddress] = useState("");
    const [balance, setBalance] = useState("");
    const [profession, setProfession] = useState("");
    const [salary, setSalary] = useState("");
    const [phone, setPhone] = useState("");
    const [problem, setproblem] = useState(null);
    const [problemid, setproblemid] = useState(null);
    const [typeskin, setTypeskin] = useState(null);
    const [typeskinid, setTypeskinid] = useState(null);
    const [typehair, setTypehair] = useState(null);
    const [typehairid, setTypehairid] = useState(null);

    // const []

    useEffect(() => {
        GetDataSimple(`project/custumer/${id}/`)
            .then((res) => {
                setData(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    useEffect(() => {
        GetDataSimple(`project/type/hair/`).then((res) => {
            setTypehair(res?.results);
            console.log(res?.results);
        });
    }, []);

    useEffect(() => {
        GetDataSimple(`project/type/skin/`).then((res) => {
            setTypeskin(res?.results);
            // console.log(res?.results);
        });
    }, []);

    useEffect(() => {
        GetDataSimple(`project/problems/`).then((res) => {
            setproblem(res?.results);
            // console.log(res?.results);
        });
    }, []);

    const handleOpen = () => setOpen(!open);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = () => {
        const data2 = {
            address: data?.address ? data?.address : address,
            birth_date: data?.birth_date ? data?.birth_date : birthdate,
            price: data?.price ? data?.price : balance,
            phone: data?.phone ? data?.phone : phone,
            problems: data?.problems ? data?.problems.id : problemid,
            type_skin: data?.type_skin ? data?.type_skin.id : typeskinid,
            type_hair: data?.type_hair ? data?.type_hair.id : typehairid,
            profession: data?.profession ? data?.profession : profession,
            salary: salary ? salary : data?.salary,
        };
        PutDataJson(`project/custumer/${id}/`, data2).then((res) => {
            changeStatus();
            setOpen(false);
        });
    };

    return (
        <>
            <button
                onClick={handleOpen}
                className="px-3 py-1 bg-pink-500 text-white rounded-md hover:bg-pink-600"
            >
                Обновить
            </button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader className="text-lg font-bold text-pink-500">
                    Обновлять пользователя
                </DialogHeader>
                <DialogBody>
                    <div className="grid grid-cols-2 gap-4">
                        <Input
                            label="Имя"
                            readOnly
                            name="first_name"
                            defaultValue={data?.first_name}
                            onChange={(e) => setFirstname(e.target.value)}
                        />

                        <Input
                            label="Адрес"
                            name="address"
                            defaultValue={data?.address}
                            onChange={(e) => setAddress(e.target.value)}
                        />

                        <Input
                            label="Профессия"
                            name="Профессия"
                            defaultValue={data?.profession}
                            onChange={(e) => setProfession(e.target.value)}
                        />
                        <Input
                            label="Баланс"
                            name="balance"
                            type="number"
                            defaultValue={data?.price}
                            onChange={(e) => setBalance(e.target.value)}
                        />

                        <Select label="Тип кожи" name="type_skin">
                            {typeskin?.map((item) => (
                                <Option
                                    onClick={() => setTypeskinid(item?.id)}
                                    value={item?.id}
                                >
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            label="Телефон"
                            name="phone"
                            defaultValue={data?.phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        <Select label="Тип волос" name="type_hair">
                            {typehair?.map((item) => (
                                <Option
                                    onClick={() => setTypehairid(item?.id)}
                                    value={item?.id}
                                >
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            label="Дата рождения"
                            name="birth_date"
                            type="date"
                            defaultValue={data?.birth_date}
                            onChange={(e) => setBirthdate(e.target.value)}
                        />
                        <Select label="Проблемы" name="problems">
                            {problem?.map((item) => (
                                <Option
                                    onClick={() => setproblemid(item?.id)}
                                    value={item?.id}
                                >
                                    {item?.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            label="Зарплата"
                            name="Зарплата"
                            type="number"
                            defaultValue={data?.salary}
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter className="flex justify-end gap-2">
                    <Button variant="text" color="gray" onClick={handleOpen}>
                        Отмена
                    </Button>
                    <Button className="bg-pink-500" onClick={handleSubmit}>
                        Добавить
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
