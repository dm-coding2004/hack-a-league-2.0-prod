<img src="Blank diagram.png">

----

# Table contnets 
* [Deployment](#deployment)
* [Set up](#set-up)
* [User demo](#user-demo)
* [Features](#features)
* [CODE SNIPPETS](#code-snippets)
* [Tech status](#tech-status)
* [API Reference](#api-reference)
* [Contribution](#contribution)
* [License](#license)


## Deployment

To deploy this project run

bash
  npm run dev


## Set up
- These are the steps required to install the project.
1. Clone the repo
   sh
   git clone [https://github.com/YOUR_USERNAME/Project-Name.git](https://github.com/dm-coding2004/hack-a-league-2.0)
   
2. Install NPM packages
   sh
   npm install npm@latest -g
   

## User demo
    
## Features
* Get a script tag of custom AI bot created by the clients for their online products.
* And get a custom page for offline products.
* Creating custom chatbot as per user requirements.
* CAAS - chatbot as a service.
* Flexible and user friendly interface.
  

## CODE SNIPPETS
<img src="snip.png">

## Tech status
|Language|        Use Case                         |
|:-------|:-------------------------------:|
|![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54)|  Data feeding to LLM model|
|lang chain | LLM framework|
|ollama |    Running LLM locally|
|tinyllama|  Fork of llama 2|
|![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)|   authentication and database|
|![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)| backend server|
|express js| backend server|
|![Next JS](https://img.shields.io/badge/Next-black?style=for-the-badge&logo=next.js&logoColor=white)|  framework for dynamic pages|
|![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)|   ui library |
|![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)|  type validation for js|
|Zod |  typescript schema runtime validation|
|![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)|  shorthand css|
|swiper js|  block animation|
|react scroll-animation|  scroll animation|
|locomotive-scroll|   smooth scroll|
----

## API Reference

#### Get all items

bash
  GET /chatbot/:ownername/:botname/chat?input="Your Input"


Outpt: The Generated Text bye the LLM Model with custom dataset provider by that owner.

#### Post item

bash
  POST /createbot {body: {
username,
name,
dp,
companyname,
category,
questions: [{question,answer}]
}}


Create a custom bot and gives a script tag and a custom page link.


## Contribution

Contributions are always welcome!

See contributing.md for ways to get started.

Please adhere to this project's code of conduct.


## License

[MIT](https://choosealicense.com/licenses/mit/)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
