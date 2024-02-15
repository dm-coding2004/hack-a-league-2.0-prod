"use client"
import { useState, useEffect } from "react";
import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './styles/Home.module.css'
// import axios from 'axios';
import TypingAnimation from "./components/TypingAnimation";
import { useRouter, useSearchParams } from "next/navigation";

const inter = Inter({ subsets: ['latin'] })

export default function Home({ params }) {
  // const router = useRouter();
  // const searchParams = useSearchParams();
  const dataMeta = params.bot;
  console.log(params.bot)
  const [inputValue, setInputValue] = useState('');
  const [chatLog, setChatLog] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();

    setChatLog((prevChatLog) => [...prevChatLog, { type: 'user', message: inputValue }])

    sendMessage(inputValue);

    setInputValue('');
  }

  const sendMessage = async (message) => {
    let url = `http://localhost:9000/chatbot/${dataMeta[0]}/${dataMeta[1]}/chat`;
    url = url + `?input="${encodeURIComponent(inputValue)}"`;

    setIsLoading(true);


    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    const respJson = await resp.json();
    setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: respJson.data }]);
    setIsLoading(false);
    // axios.post(url, data).then((response) => {
    //   console.log(response);
    //   setChatLog((prevChatLog) => [...prevChatLog, { type: 'bot', message: response.data.choices[0].message.content }])
    //   setIsLoading(false);
    // }).catch((error) => {
    //   setIsLoading(false);
    //   console.log(error);
    // })
  }

  return (
    <div className="container mx-auto max-w-[700px]">
      <div className="flex flex-col h-screen bg-gray-900 relative">
        <h1 className="bg-gradient-to-r from-blue-500 to-purple-500 text-transparent bg-clip-text text-center py-3 font-bold text-6xl">{dataMeta[1] ? dataMeta[1] : "SuperLlama"}</h1>
        {/* <img src="https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg" alt="" className="h-20 inline absolute top-4 right-4 z-50 rounded-full " /> */}
        <div className="flex-grow p-6 overflow-y-auto scrollbar-track-black
        scrollbar-thin scrollbar-thumb-white ">
          <div className="flex flex-col space-y-4">
            {
              chatLog.map((message, index) => (
                <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'
                  }`}>
                  <div className={`${message.type === 'user' ? 'bg-purple-500' : 'bg-gray-800'
                    } rounded-lg p-4 text-white max-w-sm`}>
                    {message.message}
                  </div>
                </div>
              ))
            }
            {
              isLoading &&
              <div key={chatLog.length} className="flex justify-start">
                <div className="bg-gray-800 rounded-lg p-4 text-white max-w-sm">
                  <TypingAnimation />
                </div>
              </div>
            }
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-none p-6">
          <div className="flex rounded-lg border border-gray-700 bg-gray-800">
            <input type="text" className="flex-grow px-4 py-2 bg-transparent text-white focus:outline-none" placeholder="Type your message..." value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <button type="submit" className="bg-purple-500 rounded-lg px-4 py-2 text-white font-semibold focus:outline-none hover:bg-purple-600 transition-colors duration-300">Send</button>
          </div>
        </form>
      </div>
    </div>
  )
}
