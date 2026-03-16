export const relationshipContexts = ["romantic", "friend", "family", "situationship", "ex"] as const

export type RelationshipContext = (typeof relationshipContexts)[number]

export type AnalysisResult = {
  what_was_said: string
  what_was_likely_meant: string
  what_was_felt: string
  healthiest_next_move: string
  rewrite: string
  emotional_tone: string
}

export type AnalyzeRequest = {
  text?: string
  image?: string
  imageType?: string
  context?: RelationshipContext
}

export type AnalyzeResponse =
  | {
      success: true
      analysis: AnalysisResult
    }
  | {
      success: false
      error: string
    }
