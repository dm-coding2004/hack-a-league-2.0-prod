"use client"
import Header from '@/components/header'
import React, { useEffect, useState } from "react";
import Faq from "react-faq-component";



const data = {
    title: "FAQ's",
    rows: [
        {
            title: "What is SuperLlama?",
            content: `It is an enhanced version of which is LLM model developed by Meta.
            SuperLama enables small and large buisnesses to integrate AI in the venture`,
        },
        {
            title: "Can I use Superlama if I don't have an existing website?",
            content:
                "Yes,Superlama provides a chat bot templete which can be run without an existing website",
        },
        {
            title: "Is any prior experience required in programing to use Superlama?",
            content: `No, Superlama is made in such a way that the users can use it with 
            ease without any programing experience `,
        },
        {
            title: "What is the package version",
            content: <p>current version is 1.0.1</p>,
        },
    ],
};

const styles = {

     bgColor: 'linear-gradient(to right, rgb(192, 132, 252), rgb(250, 204, 21))',
    titleTextColor: "white",
    rowTitleColor: "white",
     rowContentColor: 'black',
     arrowColor: "black",
     
     
};

const config = {
     animate: true,
     arrowIcon: "+",
     tabFocus: true
};

export default function Faqs() {
    return (
      
        <div className='bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 z-[-10]'>
          <Header/>
          <div className=' m-auto py-[100px] pl-[8%]'>
          <iframe width="1100" height="515" src="https://www.youtube.com/embed/FFfdyV8gnWk?si=o15utQcr8sMzr3A2" title="YouTube video player" 
          frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen ></iframe>
          </div>
   <div className='p-[60px] mt-[50px]'>
            <Faq
                data={data}
                styles={styles}
                config={config}
            />
            </div>
        </div>
    );
}
