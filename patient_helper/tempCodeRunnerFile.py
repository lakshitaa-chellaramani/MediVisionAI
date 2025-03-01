from flask import Flask, request, jsonify
import google.generativeai as genai
import re
from flask_cors import CORS
import os
import fitz 

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
GOOGLE_API_KEY = "AIzaSyBvzErxX6MuUct2pN6rOtXsn54HwTmalCQ"
genai.configure(api_key=GOOGLE_API_KEY)

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

# Persistent chat session (Stores context)
chat_session = model.start_chat(history=[
    {"role": "user", "parts": [
        "You are a helpful AI designed to answer medical questions concisely and accurately. "
        "When given symptoms by the patient, give the most likely diseases with their confidence percentage. "
        "If the confidence percent of the first diagnosed disease is greater than 70%, do not generate any more diagnoses. "
        "Also, give the timeline of when the patient should visit a doctor based on diagnosis severity."
        "ALWAYS Clearly specify which doctor to visit - example urologist, dentist, cardiologist, neurologist etc"
    ]}
])

@app.route("/generate-diagnosis", methods=["POST"])
def generate_text():
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


