import React, { Fragment, useState } from 'react';

const InputTodo = () => {

    const [description, setDescription] = useState(""); // state of description and the only way to chage the description

    const onSubmitForm = async event => {
        event.preventDefault();
        try {
            const body = { description };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json"},
                body: JSON.stringify(body)
            });

            window.location = "/";
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Fragment>
            <h1 className="text-center mt-5">Input Todo</h1>
            <form className="d-flex mt-5" onSubmit={onSubmitForm}>
                <input
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button className="btn btn-success">Add</button>
            </form>
        </Fragment>
    )
}

export default InputTodo;