from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.documents import Document
from langchain.chains import create_retrieval_chain
from langchain.chains import create_history_aware_retriever
from langchain_core.prompts import MessagesPlaceholder
from langchain_core.messages import HumanMessage, AIMessage
import time


llm = Ollama(model="tinyllama")
output_parser = StrOutputParser()


embeddings = OllamaEmbeddings(model="tinyllama")
loader = WebBaseLoader("https://www.sony.co.in/all-products")
docs = loader.load()

print(docs)

text_splitter = RecursiveCharacterTextSplitter()
documents = text_splitter.split_documents(docs)
vector = FAISS.load_local("faiss_index", embeddings)
print("In")
# index_filename = "faiss_index"
# vector.save_local(index_filename)
print(vector)

retriever = vector.as_retriever()
prompt = ChatPromptTemplate.from_messages([
    ("system", """
     You are a expert in sales working for Sony Tech Company. 
     Your name is Bob. 
     Answer the user's questions based on the below context:\n\n{context}"""),
    MessagesPlaceholder(variable_name="chat_history"),
    ("user", "{input}"),
])

chat_history = [HumanMessage(content="Are there any animals to buy?"), AIMessage(content="No we are a Tech Company, we don't sell pets!")]

retriever_chain = create_history_aware_retriever(llm, retriever, prompt)

document_chain = create_stuff_documents_chain(llm, prompt)

retrieval_chain = create_retrieval_chain(retriever_chain, document_chain)

print("Inn")
start_time = time.time()

# response = retrieval_chain.invoke({
#     "chat_history": chat_history,
#     "input": "How can I add my liked tech products to Favourites section of Sony web app?",
#     "context": [Document(page_content="Here is the summarized answer for you")]
# })


for chunk in retrieval_chain.stream({
    "chat_history": chat_history,
    "input": "How can I add my liked tech products to Favourites section of Sony web app?",
    "context": [Document(page_content="Here is the summarized answer for you")]
}):
    print(chunk)

end_time = time.time()
elapsed_time = end_time - start_time

print(elapsed_time)

# print(response["answer"])

# response = retrieval_chain.invoke({
#     "chat_history": chat_history,
#     "input": "How can I add my liked tech products to Favourites section of Sony web app?",
#     "context": [Document(page_content="Here is the summarized answer for you")]
# })

# for chunk in stream:
#     print(chunk)


