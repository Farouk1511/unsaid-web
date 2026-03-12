import { ConvexHttpClient } from "convex/browser"
import { NextResponse } from "next/server"

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL ?? process.env.CONVEX_URL

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
    }

    const name = body.name?.trim()
    const email = body.email?.trim().toLowerCase()

    if (!name || !email) {
      return NextResponse.json(
        { error: "Please enter your name and email." },
        { status: 400 },
      )
    }

    const client = new ConvexHttpClient(convexUrl)

    await (client as any).mutation("waitlist:join", {
      name,
      email,
    })

    return NextResponse.json({ ok: true })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong."
    const status = message.includes("already on the waitlist") ? 409 : 500

    return NextResponse.json({ error: message }, { status })
  }
}
