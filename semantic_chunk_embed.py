#!/usr/bin/env python
from _util import _print

'''
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("--port", type=int, default=8000,
                    help="port number, default 8000")
parser.add_argument("--host", type=str, default="localhost",
		    help="host name, default localhost")
parser.add_argument("--dir", type=str, default='cancer_papers',
                    help="directory containing .txt files to parse"
                    )
args = parser.parse_args()
host = args.host
port = args.port
directory = args.dir
print(f'using host: {args.host}')
print(f'using port: {args.port}')
print(f'using dir: {args.dir}')
'''


from langchain_openai.embeddings import OpenAIEmbeddings
from openai import OpenAI
from langchain_experimental.text_splitter import SemanticChunker
import hashlib
import glob, os


def generate_unique_id(string):
    return hashlib.md5(string.encode()).hexdigest()


openai_api_key = "EMPTY"
openai_api_base = "http://rbdgx1.cels.anl.gov:8000/v1"
client = OpenAI(
        api_key=openai_api_key,
        base_url=openai_api_base,
)
models = client.models.list()
model = models.data[0].id
print(f'using model {model}')

directory = "/vol/idph/rag/documents/depmap-brettin/model_txts"


embeddings = OpenAIEmbeddings(model=model,
                                  api_key=openai_api_key,
                                  base_url=openai_api_base,
                                  # encoding_format="float"
                                  )
text_splitter = SemanticChunker(embeddings)

_t = _print("done setting up")

for filepath in glob.glob(os.path.join(directory, "*.txt")):
    #print(filepath)

    with open(filepath) as f:
        paper = f.read()
    #print (f'paper len {len(paper)}')


    embeddings = OpenAIEmbeddings(model=model,
                                  api_key=openai_api_key,
                                  base_url=openai_api_base,
                                  # encoding_format="float"
                                  )


    text_splitter = SemanticChunker(embeddings)
    docs = text_splitter.create_documents([paper])
    #print (f'chunks in doc {len(docs)}')

    for n in range(0, len(docs) - 1):
        query_result = embeddings.embed_query(docs[n].page_content)
        unique_id = generate_unique_id(docs[n].page_content)
        #print (f'{unique_id}\tchunk len {len(docs[n].page_content)}\tembedding len {len(query_result)}')

    _t = _print(f'done processing file {filepath} with length {len(paper)}', _t)

# end for filepath in directory
