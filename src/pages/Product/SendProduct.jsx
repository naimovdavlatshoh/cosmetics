import React, { useEffect, useState } from "react";
import {
    Button,
    Dialog,
    DialogHeader,
    DialogBody,
    DialogFooter,
    Option,
    Select,
    Input,
} from "@material-tailwind/react";
import { IoSend } from "react-icons/io5";
import { GetDataSimple, PostSimple } from "../../service";

export function SendProduct({ id }) {
    const [open, setOpen] = React.useState(false);
    const [skin, setSkin] = useState([]);
    const [problem, setProblem] = useState([]);
    const [hair, setHair] = useState([]);
    const [query, setQuery] = useState(null);
    const [salary, setSalary] = useState(null);

    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        GetDataSimple("project/type/hair").then((res) => {
            setHair(res.results);
        });
    }, []);

    useEffect(() => {
        GetDataSimple("project/type/skin").then((res) => {
            setSkin(res.results);
        });
    }, []);

    useEffect(() => {
        GetDataSimple("project/problems/").then((res) => {
            setProblem(res.results);
        });
    }, []);

    const send = () => {
        if (salary) {
            PostSimple(
                `project/send/telegramm/?product_id=${id}&${query}&price=${salary}`
            ).then(() => {
                handleOpen();
                setSalary(null);
            });
        } else {
            PostSimple(
                `project/send/telegramm/?product_id=${id}&${query}`
            ).then(() => {
                handleOpen();
                setQuery(null);
            });
        }
    };

    return (
        <>
            <Button onClick={handleOpen} color="pink">
                <IoSend />
            </Button>
            <Dialog open={open} handler={handleOpen}>
                <DialogHeader>Выберите клиентов</DialogHeader>
                <DialogBody>
                    <div className="flex flex-col gap-4">
                        <Select label="тип волос">
                            {hair.map((item) => (
                                <Option
                                    onClick={() =>
                                        setQuery(`hair_id=${item.id}`)
                                    }
                                >
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                        <Select label="тип кожи">
                            {skin.map((item) => (
                                <Option
                                    onClick={() =>
                                        setQuery(`skin_id=${item.id}`)
                                    }
                                >
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                        <Select label="проблема">
                            {problem.map((item) => (
                                <Option
                                    onClick={() =>
                                        setQuery(`problem_id=${item.id}`)
                                    }
                                >
                                    {item.name}
                                </Option>
                            ))}
                        </Select>
                        <Input
                            label="Зарплата"
                            onChange={(e) => setSalary(e.target.value)}
                        />
                    </div>
                </DialogBody>
                <DialogFooter>
                    <Button
                        variant="text"
                        color="red"
                        onClick={handleOpen}
                        className="mr-1"
                    >
                        <span>отмена</span>
                    </Button>
                    <Button className="bg-pink-500" onClick={send}>
                        <span>отправлять</span>
                    </Button>
                </DialogFooter>
            </Dialog>
        </>
    );
}
