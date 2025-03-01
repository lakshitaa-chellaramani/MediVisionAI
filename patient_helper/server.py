import fitz
from flask import Flask, request, jsonify
import google.generativeai as genai
import io
import base64
import os
from PIL import Image
from flask_cors import CORS
# from dotenv import load_dotenv
import re
import pytesseract
from fuzzywuzzy import fuzz
import cv2
import fitz
import ollama


# load_dotenv()
GOOGLE_API_KEY = "AIzaSyBvzErxX6MuUct2pN6rOtXsn54HwTmalCQ"
print(GOOGLE_API_KEY) 


# Expanded list of doctor types with synonyms
doctor_types = [
    # General Practitioners & Primary Care
    "General Practitioner", "Primary Care Physician", "Family Physician", "Internist", "General Doctor", 
    "Primary Care Doctor", "Internal Medicine Doctor", "General Medicine Doctor",
    
    # Medical Specialists
    "Cardiologist", "Heart Specialist", "Interventional Cardiologist", "Electrophysiologist",
    "Pulmonologist", "Lung Specialist", "Respiratory Doctor", 
    "Nephrologist", "Kidney Specialist", 
    "Hepatologist", "Liver Specialist",
    "Gastroenterologist", "GI Doctor", "Stomach Doctor", "Digestive Specialist",
    "Endocrinologist", "Hormone Specialist", "Diabetes Doctor",
    "Rheumatologist", "Arthritis Specialist", "Joint Doctor", 
    "Hematologist", "Blood Specialist",
    "Oncologist", "Cancer Specialist", 
    "Neurologist", "Brain Specialist", "Nervous System Doctor",
    "Psychiatrist", "Mental Health Doctor", "Psychosomatic Medicine Specialist",
    "Psychologist", "Mental Health Therapist", "Clinical Psychologist", "Counseling Psychologist",
    "Urologist", "Urology Specialist", "Urinary Tract Doctor", "Men’s Health Specialist",
    "Gynecologist", "OB-GYN", "Women’s Health Specialist", "Obstetrician",
    "Reproductive Endocrinologist", "Fertility Specialist",
    "Geriatrician", "Elderly Care Specialist",
    "Sleep Medicine Specialist", "Sleep Doctor",
    "Pain Management Specialist", "Pain Doctor",

    # Surgeons
    "Surgeon", "General Surgeon", "Surgical Specialist",
    "Neurosurgeon", "Brain Surgeon", "Spinal Surgeon",
    "Orthopedic Surgeon", "Bone Specialist", "Joint Surgeon", "Sports Medicine Surgeon",
    "Hand Surgeon", "Hand & Microsurgery Specialist",
    "Shoulder & Elbow Surgeon",
    "Spine Specialist", "Spinal Surgeon",
    "Plastic Surgeon", "Cosmetic Surgeon", 
    "Facial Plastic & Reconstructive Surgeon",
    "Colorectal Surgeon", "Bowel Surgeon",
    "Vascular Surgeon", "Blood Vessel Surgeon",
    "Cardiothoracic Surgeon", "Heart & Lung Surgeon",
    "Pediatric Surgeon", "Children’s Surgeon",
    "Head & Neck Surgeon", "ENT Surgeon",
    "Oral Surgeon", "Maxillofacial Surgeon", "Jaw Surgeon",
    "Bariatric Surgeon", "Weight Loss Surgeon",
    "Oculoplastic Surgeon", "Eye Plastic Surgeon",
    "Laryngologist", "Throat Specialist",
    "Endodontist", "Root Canal Specialist",
    "Periodontist", "Gum Specialist",
    "Prosthodontist", "Dental Prosthetics Specialist",

    # Eye, Ear, Nose & Throat (ENT)
    "Ophthalmologist", "Eye Doctor", "Retina Specialist", "Cornea Specialist", "Glaucoma Specialist",
    "Neuro-Ophthalmologist", "Vision Specialist",
    "Optometrist", "Eye Care Specialist",
    "ENT Doctor", "Ear, Nose & Throat Doctor", "Otolaryngologist",
    "Sinus Surgeon", "Rhinologist",
    "Audiologist", "Hearing Specialist",
    "Pediatric Otolaryngologist", "Children’s ENT Doctor",

    # Pediatric Specialists
    "Pediatrician", "Child Doctor", "Kids’ Doctor",
    "Pediatric Cardiologist", "Children’s Heart Doctor",
    "Pediatric Endocrinologist", "Children’s Hormone Specialist",
    "Pediatric Gastroenterologist", "Children’s Digestive Doctor",
    "Pediatric Neurologist", "Children’s Brain Specialist",
    "Pediatric Oncologist", "Children’s Cancer Specialist",
    "Pediatric Surgeon", "Children’s Surgeon",
    "Pediatric Orthopedic Surgeon", "Children’s Bone Specialist",
    "Pediatric Emergency Medicine Specialist",
    "Pediatric Urologist", "Children’s Urinary Tract Doctor",

    # Dental Specialists
    "Dentist", "General Dentist", "Family Dentist",
    "Orthodontist", "Braces Specialist",
    "Pediatric Dentist", "Children’s Dentist",
    "Oral Surgeon", "Mouth Surgeon",
    
    # Alternative & Complementary Medicine
    "Chiropractor", "Spinal Adjustment Specialist",
    "Acupuncturist", "Chinese Medicine Specialist",
    "Homeopath", "Natural Medicine Doctor",
    "Naturopath", "Holistic Medicine Practitioner",
    "Herbalist", "Herbal Medicine Doctor",

    # Rehabilitation & Therapy
    "Physiatrist", "Rehabilitation Specialist",
    "Physical Therapist", "Physiotherapist",
    "Occupational Therapist", "Work Injury Specialist",
    "Speech Therapist", "Speech-Language Pathologist",
    "Addiction Specialist", "Substance Abuse Doctor",

    # Emergency & Critical Care
    "Emergency Medicine Physician", "ER Doctor",
    "Critical Care Specialist", "Intensive Care Doctor",
    "Pulmonary Diseases and Critical Care Medicine Specialist",
    "Emergency Services", "Emergency Room",

    # Radiology & Imaging
    "Radiologist", "Imaging Specialist",
    "Diagnostic Radiologist", "Medical Imaging Doctor",
    "Interventional Radiologist", "Image-Guided Procedure Specialist",
    
    # Other Medical Professionals
    "Physician Assistant", "PA", "Advanced Practice Clinician",
    "Nurse Practitioner", "NP", "Advanced Practice Registered Nurse",
    "Midwife", "Certified Nurse Midwife", 
    "Women’s Health Nurse Practitioner",
    "Family Nurse Practitioner", "FNP",
    "Adult Nurse Practitioner",
    "Pediatric Nurse Practitioner",
    "Family Psychiatric & Mental Health Nurse Practitioner",
    "Travel Medicine Specialist", "Travel Doctor"
]

# Initialize Flask app
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})  # Allow requests from Next.js


# Set up Google Generative AI API Key
genai.configure(api_key = GOOGLE_API_KEY)

# Initialize model with system instructions
model = genai.GenerativeModel(
    "gemini-1.5-flash-latest",
    generation_config=genai.GenerationConfig(
        temperature=0.4,
        max_output_tokens=500,
        top_p=0.8
    ),
    safety_settings=[
        {"category": "HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
        {"category": "HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
    ]
)

modelsupport = genai.GenerativeModel(
    "gemini-1.5-flash-latest",
    generation_config=genai.GenerationConfig(
        temperature=0.8,
        max_output_tokens=400,
        top_p=0.6
    ),
    safety_settings=[
        {"category": "HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
        {"category": "HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
    ]
)

@app.route("/generate-doctor", methods=["POST"])
def generate_support_response():
    chat_session = modelsupport.start_chat(history=[
        {"role": "user", "parts": [
            "You are a support AI designed to help medical professionals in diagnosing diseases"
            "When given details by the patient, give the most likely disease"
            "you must detect the disease and give reasons to support your findings"
        ]}
    ])
    try:
        data = request.json
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        print(prompt)
        
        # Send user message (context is remembered)
        response = chat_session.send_message(prompt)

        return jsonify({"response": response.text})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/generate-diagnosis", methods=["POST"])
def generate_text():
    chat_session = model.start_chat(history=[
        {"role": "user", "parts": [
            "You are a helpful AI designed to answer medical questions concisely and accurately. "
            "When given symptoms by the patient, give the most likely diseases with their confidence percentage. "
            "If the confidence percent of the first diagnosed disease is greater than 70%, do not generate any more diagnoses. "
            "Also, give the timeline of when the patient should visit a doctor based on diagnosis severity."
            "ALWAYS Clearly specify which doctor to visit - example urologist, dentist, cardiologist, neurologist etc"
        ]}
    ])
    try:
        data = request.json
        prompt = data.get("prompt", "")

        if not prompt:
            return jsonify({"error": "Prompt is required"}), 400

        print(prompt)
        
        # Send user message (context is remembered)
        response = chat_session.send_message(prompt)
        
        matched_doctors = [doctor for doctor in doctor_types if re.search(rf"\b{re.escape(doctor)}\b", response.text , re.IGNORECASE)]

        # Store the result in a variable
        found_doctors = ", ".join(matched_doctors) if matched_doctors else "No doctor type found"

        # Print the matched doctor types
        print("Matched Doctor Types:", found_doctors)

        return jsonify({"response": response.text}, {"doctor_type": found_doctors})
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

system_instruction1 = (
    "Only process medical or health-related reports. "
    "If the document is not related to health or medicine, respond with: 'This document is not a medical report.' "
    "Focus on summarizing medical test results, diagnoses, prescriptions, or relevant health data."
)



UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)  # Ensure upload directory exists

app.config["UPLOAD_FOLDER"] = UPLOAD_FOLDER


def extract_text_from_pdf(pdf_path):
    """Extracts text from a PDF file."""
    doc = fitz.open(pdf_path)
    text = "\n".join([page.get_text("text") for page in doc])
    return text.strip()

def summarize_medical_report(pdf_path):
    """Generates a summary of the medical report using Gemini API."""
    text = extract_text_from_pdf(pdf_path)
    
    if not text:
        return "No readable text found in the PDF."

    model = genai.GenerativeModel("gemini-1.5-flash-latest")
    response = model.generate_content([
        system_instruction1,
        f"Summarize this medical report in simple terms:\n\n{text}"
    ])

    return response.text if response else "Failed to generate a response."

@app.route("/generate-report", methods=["POST"])
def upload_pdf():
    """Handles PDF upload and returns a summary."""
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file:
        file_path = os.path.join(app.config["UPLOAD_FOLDER"], file.filename)
        file.save(file_path)

        # Process the file
        summary = summarize_medical_report(file_path)

        return jsonify({"summary": summary})
    
    #model with different system instructions for scan analysis
    

@app.route("/generate-scan-report", methods=["POST"])
def generate_scan_report():
    try:
        # Check if an image file is uploaded
        if "image" in request.files:
            image_file = request.files["image"]

            # Open image using PIL
            image = Image.open(image_file)

            # Send image directly to Gemini
            response = model.generate_content([image, "diagnose."])

        # Otherwise, check for JSON text input
        elif request.is_json:
            data = request.json
            prompt = data.get("prompt", "")

            if not prompt:
                return jsonify({"error": "Prompt is required"}), 400

            # Send text prompt to Gemini model
            response = chat_session.send_message(prompt)

        else:
            return jsonify({"error": "Unsupported Media Type. Send JSON or an image file."}), 415

        return jsonify({"response": response.text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


value_keywords = ["Value", "Result", "Reading", "Test Value"]
reference_keywords = ["Reference Range", "Normal Range", "Range", "Ref Range"]


# Function to find closest match
def find_closest_match(word, choices):
    best_match = max(choices, key=lambda x: fuzz.partial_ratio(word.lower(), x.lower()))
    return best_match if fuzz.partial_ratio(word.lower(), best_match.lower()) > 70 else None


# Function to extract text from image
def extract_text_from_image(image_path):
    img = cv2.imread(image_path)
    if img is None:
        return None, "Error: Unable to load image."

    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    ocr_data = pytesseract.image_to_data(gray, output_type=pytesseract.Output.DICT)
    extracted_text = "\n".join(ocr_data["text"]).strip()
    
    return extracted_text if extracted_text else None, "No readable text found in the image."

def extract_abnormal_tests(text):
    pattern = r"([\w\s]+)\s+([\d\.]+)\s*([a-zA-Z/%µ]*)\s+([\d\.]+)-([\d\.]+)"
    matches = re.findall(pattern, text)

    abnormal_results = []
    for test, value, unit, ref_low, ref_high in matches:
        try:
            value = float(value)
            ref_low = float(ref_low)
            ref_high = float(ref_high)

            if value < ref_low:
                abnormal_results.append(f"{test.strip()} ({value} {unit}) is **LOW** (Normal: {ref_low}-{ref_high} {unit})")
            elif value > ref_high:
                abnormal_results.append(f"{test.strip()} ({value} {unit}) is **HIGH** (Normal: {ref_low}-{ref_high} {unit})")
        except ValueError:
            continue

    return abnormal_results


# Flask API route
@app.route("/generate-image-report", methods=["POST"])
def upload_file():
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    # Save uploaded file
    file_path = os.path.join("uploads", file.filename)
    os.makedirs("uploads", exist_ok=True)
    file.save(file_path)

    # Extract text from image
    extracted_text, error = extract_text_from_image(file_path)
    if extracted_text is None:
        return jsonify({"error": error}), 400

    # Extract abnormal tests
    abnormal_tests = extract_abnormal_tests(extracted_text)

    # Generate Gemini AI medical summary
    summary_prompt = f"Summarize this medical report in simple terms and suggest possible dieases in points:\n\n{extracted_text}"
    medical_summary = model.generate_content(summary_prompt).text

    response_data = {
        "summary": medical_summary,
        "abnormal_tests": abnormal_tests,
    }

    # If there are abnormal results, get possible conditions
    if abnormal_tests:
        conditions_prompt = "Based on these abnormal blood test results, suggest possible medical conditions:\n" + "\n".join(abnormal_tests)
        conditions_response = model.generate_content(conditions_prompt).text
        response_data["possible_conditions"] = conditions_response

    return jsonify(response_data)





# Run the Flask app
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5500, debug=True)