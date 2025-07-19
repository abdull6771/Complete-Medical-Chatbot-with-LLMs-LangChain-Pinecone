# MedBot - Medical Chatbot Application

A comprehensive medical information chatbot built with Next.js, AI SDK, and Groq for ultra-fast inference.

## Features

### 🩺 Symptom Checker
- Users can describe symptoms in natural language
- Provides possible conditions and general advice
- Includes appropriate medical disclaimers

### 💊 Drug Information
- Accurate information about medications
- Dosage guidelines and interactions
- Side effects and safety information

### 🧠 Disease Q&A
- Answers medical questions using curated medical knowledge
- Educational content about various conditions
- Prevention and management guidance

### 🛡️ Health Tips & Lifestyle Advice
- General wellness guidance
- Lifestyle recommendations
- Preventive care information

### 💬 Conversational Memory
- Maintains context across chat turns
- Personalized responses based on conversation history

### ⚠️ Safety Guardrails
- Clear disclaimers about not replacing professional medical advice
- Emergency situation guidance
- Appropriate medical consultation recommendations

## Technology Stack

- **Frontend**: Next.js 15 with App Router
- **UI Components**: shadcn/ui with Tailwind CSS
- **AI Integration**: AI SDK with Groq provider
- **LLM Model**: Llama 3.1 70B (via Groq)
- **Styling**: Tailwind CSS with a custom medical theme

## Architecture Overview

### API Route (`/app/api/chat/route.ts`)
- Handles chat requests using AI SDK's `streamText`
- Implements medical knowledge search and retrieval
- Applies safety-focused system prompts
- Uses Groq for ultra-fast inference

### Frontend (`/app/page.tsx`)
- React-based chat interface with real-time streaming
- Feature-based navigation for different medical topics
- Responsive design with medical-themed UI
- Built-in safety disclaimers and warnings

### Medical Knowledge Base
- Curated medical information for common symptoms and medications
- Structured data for quick retrieval and context injection
- Extensible architecture for adding more medical content

## Setup Instructions

### Prerequisites
- Node.js 18+
- Groq API key

### Installation

1. Clone the repository:
```bash
git https://github.com/abdull6771/Complete-Medical-Chatbot-with-LLMs-LangChain-Pinecone.git
cd Complete-Medical-Chatbot-with-LLMs-LangChain-Pinecone
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:


4. Add your Groq API key to `.env`:
```
GROQ_API_KEY=your_groq_api_key_here
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### Getting Started
1. Visit the application homepage
2. Read the safety disclaimer carefully
3. Choose from the available features or start typing directly

### Feature Usage

- **Symptom Checker**: Describe symptoms like "I have a headache and feel tired."
- **Drug Information**: Ask about medications like "Tell me about ibuprofen side effects."
- **Disease Q&A**: Learn about conditions like "What is diabetes?"
- **Health Tips**: Get wellness advice like "How can I improve my heart health?"

### Safety Guidelines
- Always consult healthcare professionals for medical concerns
- Use for educational and informational purposes only
- Seek immediate medical attention for emergencies
- Do not use as a substitute for professional medical advice

## Extending the Application

### Adding New Medical Knowledge
1. Update the `medicalKnowledge` object in `/app/api/chat/route.ts`
2. Add new categories (symptoms, drugs, conditions)
3. Implement search logic for new categories

### Integrating Vector Database
For production use, consider integrating with:
- Pinecone for semantic search
- Supabase Vector for PostgreSQL-based vector storage
- Custom embedding pipeline for medical literature

### Adding Authentication
- Implement user accounts for personalized medical history
- Add conversation persistence
- Enable healthcare provider integration

## Production Considerations

### Security
- Implement rate limiting
- Add input validation and sanitization
- Use HTTPS in production
- Implement proper error handling

### Scalability
- Add caching for common queries
- Implement a database for conversation history
- Use CDN for static assets
- Monitor API usage and costs

### Compliance
- Ensure HIPAA compliance if handling PHI
- Add proper data retention policies
- Implement audit logging
- Regular security assessments

## API Reference

### POST /api/chat
Handles chat messages and returns streaming responses.

**Request Body:**
```json
{
  "messages": [
    {
      "role": "user",
      "content": "I have a headache"
    }
  ]
}
```

**Response:**
Streaming text response with medical information and appropriate disclaimers.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Disclaimer

This application is for educational and informational purposes only. It is not intended to be a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.
