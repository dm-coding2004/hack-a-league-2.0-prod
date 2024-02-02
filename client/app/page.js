'use client'
import Header from "@/components/header.js"
import Footer from "@/components/Footer.js"
import Hero from "@/components/Hero.js"
import Woke from "@/components/Woke.js"
import Yoke from "@/components/Yoke.js"
import DiagramComponent from "@/components/example"

export default function Home() {
  return (
    <div>
    <Header/>
    <Hero/>
    <Yoke/>
    <Woke/>
    <DiagramComponent/>
    <Footer/>
    </div>
  )
}
