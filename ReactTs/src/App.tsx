import React, { ReactElement, useEffect, useRef, useState } from "react";

import Chatbot from "src/components/Chatbot/Chatbot";

const App = (): ReactElement => {
  const ref: React.MutableRefObject<null | HTMLAnchorElement> = useRef(null);
  const [jsonData, setJsonData] = useState(null);
  useEffect(() => {
    if (ref.current !== null) {
      ref.current.addEventListener("pointerover", () => {
        ref.current.style.backgroundColor = "#333333";
      });
      ref.current.addEventListener("pointerout", () => {
        ref.current.style.backgroundColor = "#1c1c1c";
      });
      // ref.current.style.backgroundColor = "red";
    }
  }, []);
  return (
    <>
      <Chatbot setJsonData={setJsonData} />
      <div
        id="createbotbutton"
        onClick={async () => {
          // console.log(jsonData);
          const jsonDataJson = JSON.parse(jsonData);
          const cells = jsonDataJson.cells;
          const obj = {};
          obj["questions"] = [];

          for (let index = 0; index < cells.length; index++) {
            const element = cells[index];
            if (element.attrs) {
              if (
                element?.attrs?.label?.text &&
                element?.attrs?.description?.text
              ) {
                let title = element?.attrs?.label?.text;
                const desc = element?.attrs?.description?.text;
                if (title === "Name of Bot") {
                  title = "name";
                } else if (title === "Category") {
                  title = "category";
                } else if (title === "Dp of the Bot") {
                  title = "dp";
                } else if (title === "Category") {
                  title = "category";
                } else if (title === "Company Name") {
                  title = "companyname";
                } else {
                  title = title.replace("Question: ", "");
                  obj["questions"].push({ question: title, answer: desc });
                  continue;
                }
                obj[title] = desc;
              }
            }
          }

          console.log(obj);
          obj["username"] = "User";
          // await fetch("http://localhost:9000/createbot", {
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   method: "POST",
          //   body: JSON.stringify(obj),
          // }).then((res) => console.log(res.text()));
          ref.current.href = `http://localhost:3003?obj=${encodeURIComponent(JSON.stringify(obj))}`;
          ref.current.click();
        }}
        style={{
          zIndex: "999",
          bottom: "10px",
          right: "10px",
          textAlign: "center",
          padding: "20px",
          pointerEvents: "all",
          cursor: "pointer",
          fontSize: "25px",
          boxShadow: "5px 5px 5px black",
          position: "absolute",
          backgroundColor: "#1c1c1c",
          borderRadius: "10px",
          transition: "all 1s ease-out",
          color: "white",
          width: "auto",
          height: "auto",
        }}
      >
        Create Bot
      </div>
      <a ref={ref} target="_blank" style={{ display: "none" }}></a>
    </>
  );
};

export default App;
