import { GoogleGenAI, Type } from "@google/genai"
import type { AnalysisResult, RelationshipContext } from "@/types/analysis"

const apiKey = process.env.GEMINI_API_KEY

function getClient() {
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured.")
  }

  return new GoogleGenAI({ apiKey })
}

const model = "gemini-2.5-flash"

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    isConversation: {
      type: Type.BOOLEAN,
    },
    errorMessage: {
      type: Type.STRING,
      nullable: true,
    },
    what_was_said: {
      type: Type.STRING,
    },
    what_was_likely_meant: {
      type: Type.STRING,
    },
    what_was_felt: {
      type: Type.STRING,
    },
    healthiest_next_move: {
      type: Type.STRING,
    },
    rewrite: {
      type: Type.STRING,
    },
    emotional_tone: {
      type: Type.STRING,
    },
  },
  required: [
    "isConversation",
    "what_was_said",
    "what_was_likely_meant",
    "what_was_felt",
    "healthiest_next_move",
    "rewrite",
    "emotional_tone",
  ],
  propertyOrdering: [
    "isConversation",
    "errorMessage",
    "what_was_said",
    "what_was_likely_meant",
    "what_was_felt",
    "healthiest_next_move",
    "rewrite",
    "emotional_tone",
  ],
} as const

type GeminiAnalysis = AnalysisResult & {
  isConversation: boolean
  errorMessage?: string | null
}

function buildInstruction(context: RelationshipContext | undefined, sourceLabel: string) {
  const contextLabel = context ?? "romantic"

  return [
    "You are Unsaid, an emotionally intelligent conversation analyst.",
    `The user shared a ${sourceLabel} involving their ${contextLabel}.`,
    "Help them understand what happened emotionally with empathy, nuance, and zero judgment.",
    "Never take sides.",
    "Never use therapy jargon, sarcasm, or manipulation advice.",
    'Use language like "likely", "probably", or "it seems like" instead of certainty.',
    "If the content is not actually a readable conversation, set isConversation to false and provide a short warm errorMessage.",
    "If the conversation suggests abuse, coercion, or danger, gently flag that in healthiest_next_move and suggest trusted support.",
    "Keep the tone warm, grounded, slightly informal, and useful.",
  ].join(" ")
}

function buildUserPrompt(context: RelationshipContext | undefined, text?: string) {
  return [
    `Relationship context: ${context ?? "romantic"}`,
    "Return concise but specific insight for this exact conversation.",
    text ? `Conversation:\n${text}` : "Analyze the uploaded conversation screenshot.",
  ].join("\n\n")
}

function normalizeAnalysis(payload: GeminiAnalysis): AnalysisResult {
  return {
    what_was_said: payload.what_was_said.trim(),
    what_was_likely_meant: payload.what_was_likely_meant.trim(),
    what_was_felt: payload.what_was_felt.trim(),
    healthiest_next_move: payload.healthiest_next_move.trim(),
    rewrite: payload.rewrite.trim(),
    emotional_tone: payload.emotional_tone.trim(),
  }
}

async function runAnalysis(contents: Array<{ text: string } | { inlineData: { mimeType: string; data: string } }>) {
  const ai = getClient()
  const response = await ai.models.generateContent({
    model,
    contents,
    config: {
      responseMimeType: "application/json",
      responseJsonSchema: responseSchema,
      temperature: 0.7,
    },
  })

  const rawText = response.text?.trim()

  if (!rawText) {
    throw new Error("Gemini returned an empty response.")
  }

  const parsed = JSON.parse(rawText) as GeminiAnalysis

  if (!parsed.isConversation) {
    throw new Error(parsed.errorMessage?.trim() || "I couldn't find a readable conversation in that.")
  }

  return normalizeAnalysis(parsed)
}

export async function analyzeConversationText(options: {
  text: string
  context?: RelationshipContext
}) {
  return runAnalysis([
    {
      text: `${buildInstruction(options.context, "text conversation")}\n\n${buildUserPrompt(options.context, options.text)}`,
    },
  ])
}

export async function analyzeConversationImage(options: {
  image: string
  imageType: string
  context?: RelationshipContext
}) {
  return runAnalysis([
    {
      text: `${buildInstruction(options.context, "conversation screenshot")}\n\n${buildUserPrompt(options.context)}`,
    },
    {
      inlineData: {
        mimeType: options.imageType,
        data: options.image,
      },
    },
  ])
}
