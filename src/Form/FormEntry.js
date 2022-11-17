import React, { useState, useReducer, useEffect } from "react";
import FormResponse from "./FormResponse";
import { motion } from "framer-motion";

import "./FormEntry.css";

const inputReducer = (state, action) => {
    switch (action.type) {
        case "INPUT_CHANGE":
            return {
                ...state,
                [action.name]: action.value,
            };
        case "CLEAR_FORM":
            return {
                name: "",
                email: "",
                password: "",
            };
        default:
            return state;
    }
};

let occupation;
let states;
let chosenJob;
let chosenState;
let answers;

const Form = () => {
    const [job, setJob] = useState([]);
    const [state, setState] = useState([]);
    const [isValid, setIsValid] = useState(true);
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);
    const items = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                delay: 0.3,
            },
        },
    };
    const [inputState, dispatch] = useReducer(inputReducer, {
        name: "",
        email: "",
        password: "",
        occupation: chosenJob,
        state: chosenState,
    });

    const changeHandler = (event) => {
        const inputName = event.target.name;
        const inputValue = event.target.value;
        console.log(inputName);
        console.log(inputValue);
        dispatch({
            type: "INPUT_CHANGE",
            name: inputName,
            value: inputValue,
        });
    };

    const handleSelect = (event) => {
        console.log("here");
        if (event.target.name === "occupation") {
            chosenJob = event.target.value;
            console.log(chosenJob);
        }
        if (event.target.name === "state") {
            chosenState = event.target.value;
            console.log(chosenState);
        }
    };

    const postData = async (event) => {
        event.preventDefault();
        if (
            !inputState.name ||
            !inputState.email ||
            !inputState.password ||
            !chosenJob ||
            !chosenState
        ) {
            setIsValid(false);
            return null;
        }
        try {
            const response = await fetch(
                "https://frontend-take-home.fetchrewards.com/form",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: inputState.name,
                        email: inputState.email,
                        password: inputState.password,
                        occupation: chosenJob,
                        state: chosenState,
                    }),
                }
            );
            const responseData = await response.json();
            answers = responseData;
            console.log(responseData);
            console.log(answers);
        } catch (err) {}
        dispatch({
            type: "CLEAR_FORM",
        });
        setIsFormSubmitted(true);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    "https://frontend-take-home.fetchrewards.com/form"
                );
                const responseData = await response.json();
                console.log(responseData);
                occupation = responseData.occupations;
                setJob(occupation);
                console.log(occupation);
                states = responseData.states;
                setState(states);
                console.log(states);
            } catch (err) {}
        };
        fetchData();
    }, []);

    return (
        <React.Fragment>
            <div>
                <h1> Enter your info </h1>
                <motion.form
                    key={inputState}
                    initial={{ width: 0, height: 0 }}
                    animate={{
                        width: "fit-content",
                        height: "fit-content",
                        transition: {
                            duration: 0.2,
                        },
                    }}
                    exit={{
                        x: window.innerWidth,
                        transition: { duration: 0.2 },
                    }}
                    onSubmit={postData}
                >
                    <motion.h4 variants={items} initial="hidden" animate="show">
                        Name
                    </motion.h4>
                    <motion.input
                        variants={items}
                        initial="hidden"
                        animate="show"
                        label="Name"
                        value={inputState.name}
                        name="name"
                        placeholder="Enter your name"
                        onChange={changeHandler}
                    />
                    <motion.h4 variants={items} initial="hidden" animate="show">
                        Email
                    </motion.h4>
                    <motion.input
                        variants={items}
                        initial="hidden"
                        animate="show"
                        label="Email"
                        value={inputState.email}
                        name="email"
                        placeholder="Enter your email"
                        onChange={changeHandler}
                    />
                    <motion.h4 variants={items} initial="hidden" animate="show">
                        Password
                    </motion.h4>
                    <motion.input
                        variants={items}
                        initial="hidden"
                        animate="show"
                        label="Password"
                        value={inputState.password}
                        name="password"
                        placeholder="Enter your password"
                        onChange={changeHandler}
                    />
                    <motion.h4 variants={items} initial="hidden" animate="show">
                        Select Occupation
                    </motion.h4>
                    <motion.select
                        variants={items}
                        initial="hidden"
                        animate="show"
                        onChange={handleSelect}
                        name="occupation"
                    >
                        <option>-- choose one --</option>
                        {job.map((options) => {
                            return <option> {options} </option>;
                        })}
                    </motion.select>
                    <motion.h4 variants={items} initial="hidden" animate="show">
                        Select State
                    </motion.h4>
                    <motion.select
                        variants={items}
                        initial="hidden"
                        animate="show"
                        onChange={handleSelect}
                        name="state"
                    >
                        <option>-- choose one --</option>
                        {state.map((s) => {
                            return (
                                <option>
                                    {s.name}, {s.abbreviation}
                                </option>
                            );
                        })}
                    </motion.select>
                    <div>
                        <motion.button
                            variants={items}
                            initial="hidden"
                            animate="show"
                            whileTap={{
                                scale: 0.8,
                            }}
                            type="submit"
                        >
                            Click Me
                        </motion.button>
                    </div>
                    {!isValid && (
                        <p className="error">Please fill out all fields</p>
                    )}
                </motion.form>
            </div>
            {isFormSubmitted && <FormResponse items={answers} />}
        </React.Fragment>
    );
};

export default Form;
