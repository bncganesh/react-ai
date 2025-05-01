import os
from flask import Flask, request, jsonify
from langchain_cohere.llms import Cohere
import cohere
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
cohere_api_key = os.environ.get('COHERE_API_KEY')
co = cohere.Client(cohere_api_key)
@app.after_request
def add_cors_headers(response):
  response.headers.add('Access-Control-Allow-Origin', '*')
  response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
  return response
      
@app.route("/generate_recipe", methods=["POST"])
def generate_recipe():
    data = request.json
    print("data:", data)
    vegan = data["vegan"]
    glutenFree = data["glutenFree"]
    dishName = data["dishName"]
    specialInstructions = data["specialInstructions"]
    
    userInput = f"Create a recipe for {dishName}. Vegan: {vegan}. Gluten-Free: {glutenFree}. Special Instructions: {specialInstructions} to consider while creating the recipe. Please provide a detailed recipe including ingredients and steps.If the special instruction is irrelavent , pls notify the same to the user in a gentle tone."
    # llm2 = Cohere(cohere_api_key=cohere_api_key, model="command-nightly")
    # completion = llm2.invoke(input=userInput, model="command-nightly")
    # completion = cohere.generate(
    #    prompt = userInput,
    #    model = "generate-english-v3.0",
    #    temperature = 0.7,
    #    max_tokens = 150
    # )
    reponse = co.chat(
       message=userInput
    )
    return jsonify({"suggestion": reponse.text})




chat_history = []
# @app.after_request
# def add_cors_headers(response):
#   response.headers.add('Access-Control-Allow-Origin', '*')
#   response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
#   response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
#   return response
@app.route('/chat', methods=['POST'])
def chat():
  
  data = request.get_json()
  print("data:", data)
  user_message = data['message']
   
  chat_history_received = data['chatHistory']  # Assuming 'chatHistory' is sent from JS


  response = co.chat(
    chat_history= chat_history_received,
    message=user_message
   
  )
  answer = response.text



  return jsonify({'message': answer})
if __name__ == "__main__":
    app.run(debug=True)