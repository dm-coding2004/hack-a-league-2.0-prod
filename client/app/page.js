'use client'
import Header from "@/components/header.js"
import Footer from "@/components/Footer.js"
import Hero from "@/components/Hero.js"
import Woke from "@/components/Woke.js"
import Yoke from "@/components/Yoke.js"
import { useSearchParams } from "next/navigation"
import { useSession } from "next-auth/react";



export default function Home() {
  const data = useSession();
  const searchParams = useSearchParams();
  let obj;
  if (searchParams.has("obj")) {
    obj = JSON.parse(searchParams.get("obj"));
    obj["username"] = data.data === null ? "User123" : data?.data?.user?.name;
  }
  
  async function reqForLLMBot() {
    const resp = await fetch("http://localhost:9000/createbot", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(obj),
    });
    const respText = await resp.json();
  }
  // console.log(JSON.parse(searchParams.obj));
  return (
    <div>
      <Header data={data} />
      <Hero />
      <Yoke />
      <Woke />
      <Footer />
    </div>
  )
}
