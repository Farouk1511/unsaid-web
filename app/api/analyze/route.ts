import { NextResponse } from "next/server"
import { z } from "zod"
import { analyzeConversationImage, analyzeConversationText } from "@/lib/gemini"
import { checkRateLimit, getClientIp } from "@/lib/rateLimit"
import { relationshipContexts } from "@/types/analysis"

export const runtime = "nodejs"

const requestSchema = z
  .object({
    text: z.string().trim().min(1).max(12000).optional(),
    image: z.string().trim().min(1).optional(),
    imageType: z.string().trim().optional(),
    context: z.enum(relationshipContexts).optional(),
  })
  .refine((value) => Boolean(value.text || value.image), {
    message: "Please paste a conversation or upload a screenshot.",
  })
  .refine((value) => (value.image ? Boolean(value.imageType) : true), {
    message: "Image type is required when uploading a screenshot.",
    path: ["imageType"],
  })

const allowedImageTypes = new Set(["image/png", "image/jpeg", "image/jpg", "image/webp"])

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request.headers)
    const rateLimit = checkRateLimit(`analyze:${ip}`, {
      limit: 10,
      windowMs: 60 * 60 * 1000,
    })

    if (!rateLimit.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            "you've decoded a lot today — come back in a bit, or drop your email and we'll tell you when unlimited access is ready ✨",
        },
        { status: 429 },
      )
    }

    const parsed = requestSchema.safeParse(await request.json())

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: parsed.error.issues[0]?.message ?? "Please check your input and try again.",
        },
        { status: 400 },
      )
    }

    const { text, image, imageType, context } = parsed.data

    if (image && imageType && !allowedImageTypes.has(imageType)) {
      return NextResponse.json(
        {
          success: false,
          error: "Please upload a PNG, JPG, JPEG, or WEBP screenshot.",
        },
        { status: 400 },
      )
    }

    const analysis = image && imageType
      ? await analyzeConversationImage({ image, imageType, context })
      : await analyzeConversationText({ text: text!, context })

    return NextResponse.json({ success: true, analysis })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Something went wrong."
    const friendlyMessage =
      message === "GEMINI_API_KEY is not configured."
        ? "Unsaid is not configured yet. Add GEMINI_API_KEY to start decoding conversations."
        : message.includes("readable conversation")
          ? message
          : "Something got in the way of the decode. Please try again in a moment."

    return NextResponse.json({ success: false, error: friendlyMessage }, { status: 500 })
  }
}
