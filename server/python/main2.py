from langchain_community.llms import Ollama
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from langchain_community.document_loaders import WebBaseLoader
from langchain_community.embeddings import OllamaEmbeddings
from langchain_community.vectorstores import FAISS
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain.chains import create_retrieval_chain
from langchain.chains import create_history_aware_retriever
from langchain_core.messages import HumanMessage, AIMessage
from langchain_core.documents import Document

llm = Ollama(model="tinyllama")
output_parser = StrOutputParser()


embeddings = OllamaEmbeddings(model="tinyllama")

text_splitter = RecursiveCharacterTextSplitter()

prompt = ChatPromptTemplate.from_template("""Answer the following question based only on the provided context:

<context>
{context}
</context>

Question: {input}""")

document_chain = create_stuff_documents_chain(llm, prompt)

# response = document_chain.invoke({
#     "input": "What are the best fruits I can Buy?",
#     "context": [Document(page_content="Best product to buy are: Apple, Mango, JackFruit")]
# })
for chunk in document_chain.stream({
    "input": "What are the best fruits I can Buy?",
    "context": [Document(page_content="Best product to buy are: Apple, Mango, JackFruit")]}):
    print(chunk)

# print(response)
