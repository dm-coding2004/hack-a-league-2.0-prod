'use client'
import Header from "@/components/header.js"
import Footer from "@/components/Footer.js"
import Hero from "@/components/Hero.js"
import Woke from "@/components/Woke.js"
import Yoke from "@/components/Yoke.js"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react"

const Popup = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="fixed bg-slate-700 z-[9999] p-10 top-1/2 right-1/2
        translate-x-1/2 -translate-y-1/2 rounded-md">
          <button onClick={onClose}>Close</button>
          <div className="relative  p-10">
            {children}

          </div>

        </div>
      )}
    </>
  );
};


export default function Home() {
  const data = useSession();
  const searchParams = useSearchParams();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [respJson, setRespJson] = useState(null);
  let obj;

  useEffect(() => {
    async function reqForLLMBot() {
      console.log(obj);
      const resp = await fetch("http://localhost:9000/createbot", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(obj),
      });
      const respText = await resp.json();
      setRespJson(respText);
      setPopupOpen(true);
      console.log(respText.script);
    }

    if (searchParams.has("obj")) {
      obj = JSON.parse(searchParams.get("obj"));
      obj["username"] = data?.data?.user?.name || "User123";
      reqForLLMBot();
    }
  }, []);


  // console.log(JSON.parse(searchParams.obj));
  return (
    <div>
      <Popup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)}>
        <p className="text-white p-4">
          Script Tag, For your online Prod: <br />  <b>

            {respJson?.script}
          </b>
        </p>
        <p className="text-white p-4">
          Custom Page, For your offline Prod: <br />
          <b>

            {respJson?.page}
          </b>
        </p>
      </Popup>

      <Header data={data} />
      <Hero />
      <Yoke />
      <Woke />
      <Footer />
    </div>
  )
}
