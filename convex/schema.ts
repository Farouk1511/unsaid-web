import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  waitlistUsers: defineTable({
    email: v.string(),
    name: v.string(),
    offer: v.object({
      firstMonthDiscount: v.number(),
      secondMonthDiscount: v.number(),
    }),
    previewAnswers: v.optional(
      v.object({
        context: v.union(
          v.literal("dating"),
          v.literal("partner"),
          v.literal("friend"),
          v.literal("family"),
        ),
        feeling: v.union(
          v.literal("confused"),
          v.literal("anxious"),
          v.literal("angry"),
          v.literal("numb"),
        ),
        goal: v.union(
          v.literal("clarity"),
          v.literal("reply"),
          v.literal("pause"),
          v.literal("boundary"),
        ),
      }),
    ),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
