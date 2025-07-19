"use client"

import type React from "react"

import { useChat } from "ai/react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Heart, Pill, Brain, Shield, MessageCircle, AlertTriangle } from "lucide-react"

export default function MedicalChatbot() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat()
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null)

  const features = [
    {
      id: "symptoms",
      title: "Symptom Checker",
      icon: <Heart className="w-5 h-5" />,
      description: "Describe your symptoms for general information",
      prompt: "I have been experiencing headaches and fatigue. What could this mean?",
    },
    {
      id: "medications",
      title: "Drug Information",
      icon: <Pill className="w-5 h-5" />,
      description: "Get information about medications",
      prompt: "Can you tell me about ibuprofen dosage and side effects?",
    },
    {
      id: "conditions",
      title: "Disease Q&A",
      icon: <Brain className="w-5 h-5" />,
      description: "Learn about medical conditions",
      prompt: "What is diabetes and how can it be managed?",
    },
    {
      id: "wellness",
      title: "Health Tips",
      icon: <Shield className="w-5 h-5" />,
      description: "Get wellness and lifestyle advice",
      prompt: "What are some tips for maintaining good heart health?",
    },
  ]

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature.id)
    // Auto-fill the input with the example prompt
    handleInputChange({ target: { value: feature.prompt } } as any)
  }

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    handleSubmit(e)
    setSelectedFeature(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Heart className="w-8 h-8 text-red-500" />
            <h1 className="text-3xl font-bold text-gray-800">MedBot</h1>
          </div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Your AI-powered medical information assistant. Get general health information, symptom guidance, and
            wellness tips.
          </p>
        </div>

        {/* Safety Disclaimer */}
        <Alert className="mb-6 border-amber-200 bg-amber-50">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          <AlertDescription className="text-amber-800">
            <strong>Important:</strong> This chatbot provides general health information only and is not a substitute
            for professional medical advice, diagnosis, or treatment. Always consult healthcare professionals for
            medical concerns.
          </AlertDescription>
        </Alert>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Features Panel */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Features
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {features.map((feature) => (
                  <div
                    key={feature.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md ${
                      selectedFeature === feature.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleFeatureClick(feature)}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {feature.icon}
                      <span className="font-medium text-sm">{feature.title}</span>
                    </div>
                    <p className="text-xs text-gray-600">{feature.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-2">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle>Medical Chat Assistant</CardTitle>
              </CardHeader>

              <CardContent className="flex-1 overflow-y-auto space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-8">
                    <Heart className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>Welcome! Select a feature on the left or start typing your health question.</p>
                    <p className="text-sm mt-2">
                      I can help with symptoms, medications, conditions, and wellness tips.
                    </p>
                  </div>
                )}

                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        {message.role === "assistant" && <Heart className="w-4 h-4 text-red-500" />}
                        <Badge variant={message.role === "user" ? "secondary" : "outline"} className="text-xs">
                          {message.role === "user" ? "You" : "MedBot"}
                        </Badge>
                      </div>
                      <div className="whitespace-pre-wrap">{message.content}</div>
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                        <span>MedBot is thinking...</span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              <Separator />

              <CardFooter className="p-4">
                <form onSubmit={handleFormSubmit} className="flex w-full gap-2">
                  <Input
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Ask about symptoms, medications, conditions, or health tips..."
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" disabled={isLoading || !input.trim()}>
                    {isLoading ? "Sending..." : "Send"}
                  </Button>
                </form>
                <p className="text-xs text-gray-500 mt-2 text-center w-full">
                  Remember: Always consult healthcare professionals for medical advice
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
