import { groq } from "@ai-sdk/groq"
import { streamText } from "ai"

// Allow streaming responses up to 30 seconds
export const maxDuration = 30

// Medical knowledge base - In production, this would come from a vector database
const medicalKnowledge = {
  symptoms: {
    headache: {
      conditions: ["Tension headache", "Migraine", "Cluster headache", "Sinus headache"],
      advice:
        "Stay hydrated, rest in a dark room, consider over-the-counter pain relievers. Seek medical attention if severe or persistent.",
    },
    fever: {
      conditions: ["Viral infection", "Bacterial infection", "Heat exhaustion", "Inflammatory conditions"],
      advice:
        "Rest, stay hydrated, monitor temperature. Seek medical care if fever exceeds 103°F (39.4°C) or persists.",
    },
    "chest pain": {
      conditions: ["Heart attack", "Angina", "Muscle strain", "Acid reflux", "Anxiety"],
      advice:
        "SEEK IMMEDIATE MEDICAL ATTENTION if severe, crushing, or accompanied by shortness of breath, nausea, or sweating.",
    },
    "shortness of breath": {
      conditions: ["Asthma", "Heart failure", "Pneumonia", "Anxiety", "Pulmonary embolism"],
      advice: "SEEK IMMEDIATE MEDICAL ATTENTION if severe or sudden onset. Rest and avoid exertion.",
    },
  },
  drugs: {
    ibuprofen: {
      dosage: "Adults: 200-400mg every 4-6 hours, max 1200mg/day",
      interactions: "Avoid with blood thinners, ACE inhibitors, lithium",
      sideEffects: "Stomach upset, increased bleeding risk, kidney problems with long-term use",
    },
    acetaminophen: {
      dosage: "Adults: 325-650mg every 4-6 hours, max 3000mg/day",
      interactions: "Caution with alcohol, warfarin",
      sideEffects: "Liver damage with overdose, rare skin reactions",
    },
    aspirin: {
      dosage: "Adults: 325-650mg every 4 hours for pain, 81mg daily for heart protection",
      interactions: "Avoid with blood thinners, increases bleeding risk",
      sideEffects: "Stomach bleeding, tinnitus, Reye's syndrome in children",
    },
  },
  healthTips: [
    "Maintain a balanced diet rich in fruits, vegetables, and whole grains",
    "Exercise regularly - aim for 150 minutes of moderate activity per week",
    "Get 7-9 hours of quality sleep each night",
    "Stay hydrated by drinking 8 glasses of water daily",
    "Practice stress management through meditation or relaxation techniques",
    "Schedule regular check-ups with your healthcare provider",
    "Avoid smoking and limit alcohol consumption",
    "Wash hands frequently to prevent infections",
  ],
}

function searchMedicalKnowledge(query: string) {
  const lowerQuery = query.toLowerCase()
  let context = ""

  // Search symptoms
  for (const [symptom, info] of Object.entries(medicalKnowledge.symptoms)) {
    if (lowerQuery.includes(symptom)) {
      context += `\nSymptom: ${symptom}\nPossible conditions: ${info.conditions.join(", ")}\nAdvice: ${info.advice}\n`
    }
  }

  // Search drugs
  for (const [drug, info] of Object.entries(medicalKnowledge.drugs)) {
    if (lowerQuery.includes(drug)) {
      context += `\nMedication: ${drug}\nDosage: ${info.dosage}\nInteractions: ${info.interactions}\nSide Effects: ${info.sideEffects}\n`
    }
  }

  // Add general health tips for wellness queries
  if (lowerQuery.includes("health") || lowerQuery.includes("wellness") || lowerQuery.includes("tips")) {
    const randomTips = medicalKnowledge.healthTips.slice(0, 3)
    context += `\nHealth Tips:\n${randomTips.map((tip) => `• ${tip}`).join("\n")}\n`
  }

  return context
}

const MEDICAL_SYSTEM_PROMPT = `You are MedBot, a helpful medical information assistant. You provide general health information based on medical literature and guidelines.

IMPORTANT SAFETY DISCLAIMERS:
- You are NOT a substitute for professional medical advice, diagnosis, or treatment
- Always recommend consulting healthcare professionals for medical concerns
- For emergencies, advise calling emergency services immediately
- Do not provide specific diagnoses or treatment recommendations
- Focus on general information and when to seek professional help

Your capabilities include:
1. Symptom information and when to seek care
2. General medication information (not prescribing)
3. Health and wellness tips
4. Disease education and prevention

Always include appropriate disclaimers and encourage professional medical consultation when needed.

Use the following medical context when available: {context}

Maintain a caring, professional tone while being informative and helpful.`

export async function POST(req: Request) {
  const { messages } = await req.json()

  // Get the latest user message to search for relevant context
  const latestMessage = messages[messages.length - 1]?.content || ""
  const medicalContext = searchMedicalKnowledge(latestMessage)

  const systemPrompt = MEDICAL_SYSTEM_PROMPT.replace("{context}", medicalContext)

  const result = streamText({
    model: groq("llama-3.1-70b-versatile"),
    system: systemPrompt,
    messages,
    temperature: 0.3, // Lower temperature for more consistent medical information
    maxTokens: 1000,
  })

  return result.toDataStreamResponse()
}
