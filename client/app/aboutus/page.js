"use client"
import Header from "@/components/header"

import React from "react";
import {Card, CardHeader, CardBody, CardFooter, Divider, Link, Image} from "@nextui-org/react";
import Footer from "@/components/Footer";

export default function App() {
  return (
    <div>
      <Header/>
      <div className="w-[100%] h-[250px] flex flex-row mt-[250px] p-[20px] gap-[10px] mb-[100px]">
    <Card className="max-w-[400px] bg-blue-400 p-2">
      <CardHeader className="flex gap-3">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-xl font-semibold">Manoja</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="mt-4">I am a programmer and I like Marvel Studios.I also like to sleep</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/ManojaD2004"
          className="mt-4"
        >
          Visit source code on GitHub.
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px] bg-gradient-to-r from-fuchsia-500 to-pink-500 p-2">
      <CardHeader className="flex gap-3 ">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-xl font-semibold">Aditya</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="text-bold mt-4">I am mentally ill and tech enthusiast.I love to do front end dev</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/srinivasan-ad"
          className="mt-4"
        >
          Visit my GitHub Profile.
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px] bg-gradient-to-r from-fuchsia-500 to-pink-500 p-2">
      <CardHeader className="flex gap-3 ">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-xl font-semibold">Vilas</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="text-bold mt-4">I am just a guy who innovates  ideas in the domain on tech</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/Vilas-cp"
          className="mt-4"
        >
          Visit my Github Profile.
        </Link>
      </CardFooter>
    </Card>
    <Card className="max-w-[400px] bg-gradient-to-r from-emerald-400 to-cyan-400 p-2">
      <CardHeader className="flex gap-3 ">
        <Image
          alt="nextui logo"
          height={40}
          radius="sm"
          src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
          width={40}
        />
        <div className="flex flex-col">
          <p className="text-md font-bold text-xl font-semibold">Ankitha</p>
          <p className="text-small text-default-500">nextui.org</p>
        </div>
      </CardHeader>
      <Divider/>
      <CardBody>
        <p className="text-bold mt-4">I am interested to learn new things.I am a wanderer of life.</p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href="https://github.com/nextui-org/nextui"
          className="mt-4"
        >
          Visit my GitHub Profile.
        </Link>
      </CardFooter>
    </Card>
    </div>
    <Footer/>
    </div>
  );
}