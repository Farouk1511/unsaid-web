import { ConvexHttpClient } from "convex/browser"
import { NextResponse } from "next/server"

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL

const validContexts = new Set(["dating", "partner", "friend", "family"])
const validFeelings = new Set(["confused", "anxious", "angry", "numb"])
const validGoals = new Set(["clarity", "reply", "pause", "boundary"])

type PreviewAnswers = {
  context: string
  feeling: string
  goal: string
}

function parsePreviewAnswers(input: unknown): PreviewAnswers | null {
  if (!input || typeof input !== "object") {
    return null
  }

  const maybeAnswers = input as Record<string, unknown>
  const context = typeof maybeAnswers.context === "string" ? maybeAnswers.context : ""
  const feeling = typeof maybeAnswers.feeling === "string" ? maybeAnswers.feeling : ""
  const goal = typeof maybeAnswers.goal === "string" ? maybeAnswers.goal : ""

  if (!validContexts.has(context) || !validFeelings.has(feeling) || !validGoals.has(goal)) {
    return null
  }

  return { context, feeling, goal }
}

export async function POST(request: Request) {
  try {
    if (!convexUrl) {
      return NextResponse.json(
        { error: "Convex is not configured yet. Add NEXT_PUBLIC_CONVEX_URL to continue." },
        { status: 500 },
      )
    }

    const body = (await request.json()) as {
      name?: string
      email?: string
      previewAnswers?: unknown
    }

    const name = body.name?.trim()
    const email = body.email?.trim().toLowerCase()
    const previewAnswers = parsePreviewAnswers(body.previewAnswers)

    if (!name || !email) {
      return NextResponse.json(
        { error: "Please enter your name and email." },
        { status: 400 },
      )
    }

    if (body.previewAnswers !== undefined && body.previewAnswers !== null && !previewAnswers) {
      return NextResponse.json(
        { error: "Preview answers are invalid. Please retake the preview and try again." },
        { status: 400 },
      )
    }

    const client = new ConvexHttpClient(convexUrl)

    await (client as any).mutation("waitlist:join", {
      name,
      email,
      previewAnswers: previewAnswers ?? undefined,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong."
    const status = message.includes("already on the waitlist") ? 409 : 500

    return NextResponse.json({ error: message }, { status })
  }
}
