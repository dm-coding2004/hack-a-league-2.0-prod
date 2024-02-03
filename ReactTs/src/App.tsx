import React, { ReactElement, useEffect, useRef } from 'react';

import Chatbot from 'src/components/Chatbot/Chatbot';

const App = (): ReactElement => {
    const ref: React.MutableRefObject<null | HTMLDivElement>  = useRef(null);
    useEffect(() => {
        if (ref.current !==null) {

            ref.current.addEventListener("pointerover", () => {
                ref.current.style.backgroundColor = "grey";
            })
            ref.current.addEventListener("pointerout", () => {
                ref.current.style.backgroundColor = "black";
            })
            // ref.current.style.backgroundColor = "red";
        }
    }, []);
    return (
        <>
        <Chatbot/>
        <div ref={ref} id="createbotbutton" onClick={() => alert("Hi")} style={{zIndex: "999", bottom: "10px", right: "10px", textAlign: "center",
        padding: "20px", pointerEvents:"all", cursor: "pointer", fontSize: "25px", boxShadow: "5px 5px 5px black",
            position: "absolute", backgroundColor: "black", borderRadius: "10px",
            color: "white", width: "auto", height: "auto"}}>Create Bot</div>
        </>
    );
};

export default App;
