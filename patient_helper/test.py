from flask import Flask, request, jsonify
import google.generativeai as genai

GOOGLE_API_KEY = "AIzaSyBvzErxX6MuUct2pN6rOtXsn54HwTmalCQ"
genai.configure(api_key=GOOGLE_API_KEY)

models = genai.list_models()

# Print model names and supported methods
for model in models:
    print(f"Model: {model.name} | Supports: {model.supported_generation_methods}")