import React, {useState} from "react";
import {useForm} from "react-hook-form";


export function Transformer() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [text, setText] = useState('')

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
    }


    const copy_to_clipboard = (string) => {
        navigator.clipboard.writeText(string);
    }

    return (
        <div>
            <form id='user-input' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <input type="file" {...register("image")}></input>
                </div>
                <div>
                    Scale: <input type="text" {...register("scale")}/>
                </div>
                <div>
                    Distr_type: <input type="text" {...register("distrType")}/>
                </div>
                <div>
                    Invert: <input type="checkbox" {...register("invert")}/>
                </div>
                <div>
                    <button type="submit">Ok</button>
                    <button onClick={copy_to_clipboard(text)}>Copy</button>
                </div>
                <textarea value={text} spellCheck="false" style={{width: "1000px", height: "1000px", fontSize: "7px", backgroundColor: "#112", color: "#bbb"}}/>
            </form>
        </div>
    )
}