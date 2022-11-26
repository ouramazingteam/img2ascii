import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {Button, ButtonGroup, Checkbox, Input, Paper, TextField} from "@mui/material";


export function Transformer() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [text, setText] = useState('')
    const [visible, setVisible] = useState(false)

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("image", data.image[0]);
        if (data.invert) {
            formData.append("invert", "true")
        }
        if (data.scale !== '') {
            formData.append("scale", data.scale)
        }
        if (data.distrType !== '') {
            formData.append("distr_type", data.distrType)
        }
        const res = await fetch("http://localhost:5000/", {
            method: "POST",
            body: formData,
        }).then((res) => res.json());
        setText(res['art']);
        setVisible(true);
    }


    const copy_to_clipboard = (string) => {
        try {
            navigator.clipboard.writeText(string);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div>
            <form id='user-input' onSubmit={handleSubmit(onSubmit)}>
                <div style={{display: "block ruby"}}>
                    <Paper elevation={5} style={{width: '30vw', padding: '1vh', margin: '3vh'}}>
                        <div>
                            <h2>Image -> ASCII</h2>
                        </div>
                        <div style={{justifyContent: "left"}}>
                            <div style={{margin: "2vh"}}>
                                <Input type="file" {...register("image", {required: true})}></Input>
                            </div>
                            <div style={{margin: "2vh"}}>
                                <TextField label="Масштаб" placeholder="0.25" size="small" {...register("scale")}/>
                            </div>
                            <div style={{margin: "2vh"}}>
                                <TextField label="Распределение" placeholder="fill"
                                           size="small" {...register("distrType")}/>
                            </div>
                            <div style={{margin: "2vh"}}>
                                Инвертировать <Checkbox {...register("invert")}/>
                            </div>
                            <div style={{margin: '5px'}}>
                                <ButtonGroup size="large" aria-label="large button group">
                                    <Button variant="contained" type="submit">Генерация</Button>
                                    <Button variant="contained"
                                            onClick={() => copy_to_clipboard(text)}>Скопировать</Button>
                                </ButtonGroup>
                            </div>
                        </div>
                    </Paper>
                </div>
                {visible ? <textarea value={text} spellCheck="false" style={{
                        width: "1000px",
                        height: "1000px",
                        fontSize: "7px",
                        backgroundColor: "#112",
                        color: "#bbb",
                        margin: "5vh",
                    }}/>
                    : null}
            </form>
        </div>
    )
}