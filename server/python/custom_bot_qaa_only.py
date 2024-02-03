from langchain_community.llms import Ollama
from langchain_community.chat_models import ChatOllama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.embeddings import OllamaEmbeddings
from langchain_core.documents import Document
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
from langchain.memory import ChatMessageHistory
import time
import sys
import json

llm = ChatOllama(model="tinyllama")
output_parser = StrOutputParser()
history_chat = ChatMessageHistory()
n = len(sys.argv)

if (n<3):
    sys.exit(1)

name_of_the_bot = sys.argv[1]
dp_of_the_bot = sys.argv[2]
category_of_the_bot = sys.argv[3]
company_of_the_bot = sys.argv[4]

questions_chat_history = json.loads(sys.argv[5])
# print(sys.argv[5])
# print(questions_chat_history)

user_input = sys.argv[6]



for i in range(len(questions_chat_history)):
    # print(questions_chat_history[i])
    question_chat_history = questions_chat_history[i]
    history_chat.add_user_message(question_chat_history['question'])
    history_chat.add_ai_message(question_chat_history['answer'])
    


prompt = ChatPromptTemplate.from_messages([
    ("system", """
     You are a expert in sales working for {company} which is a {category} company. 
     Your name is {name}. 
     Answer the user's questions based on the below context:\n\n{context}"""),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
])

# chat_history = [HumanMessage(content="Are there any animals to buy?"), AIMessage(content="No we are a Tech Company, we don't sell pets!")]
chat_history = history_chat.messages

retrieval_chain = prompt | llm | output_parser

# print("Start")
start_time = time.time()

# for chunk in retrieval_chain.stream({
#     "name": name_of_the_bot,
#     "company": company_of_the_bot,
#     "chat_history": chat_history,
#     "category": category_of_the_bot,
#     "input": user_input,
#     "context": [Document(page_content="Sweet and Soft answer, answer should be accurate as possible.")]
# }):
#     print(chunk, end="")

answer = retrieval_chain.invoke({
    "name": name_of_the_bot,
    "company": company_of_the_bot,
    "chat_history": chat_history,
    "category": category_of_the_bot,
    "input": user_input,
    "context": [Document(page_content="Sweet and Soft answer, answer should be accurate as possible.")]})
print(answer)


end_time = time.time()
elapsed_time = end_time - start_time

# print(elapsed_time)




