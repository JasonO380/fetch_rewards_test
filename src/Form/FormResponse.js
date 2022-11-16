import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./FormResponse.css";

const FormResponse = (props) => {
    console.log(props.items);
    return (
        <AnimatePresence>
            <motion.div
            initial={{
                    height: 0,
                    opacity: 0,
                }}
                animate={{
                    rotateY: 360,
                    opacity: 1,
                    margin: "auto",
                    height: "auto",
                    transition: {
                        duration: 0.55,
                    },
                }}
                exit={{
                    height: 0,
                    opacity: 0,
                }} 
            className="container">
                <h3>Thanks for submitting your info!!</h3>
                <div>
                    <p>{props.items.name}</p>
                    <p>{props.items.email}</p>
                    <p>{props.items.occupation}</p>
                    <p>{props.items.state}</p>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

export default FormResponse;
