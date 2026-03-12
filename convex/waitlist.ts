import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: {
    email: v.string(),
    name: v.string(),
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
  },
  handler: async (ctx: any, args: any) => {
    const existing = await ctx.db
      .query("waitlistUsers")
      .withIndex("by_email", (q: any) => q.eq("email", args.email))
      .first();

    if (existing) {
      throw new Error("This email is already on the waitlist.");
    }

    await ctx.db.insert("waitlistUsers", {
      email: args.email,
      name: args.name,
      offer: {
        firstMonthDiscount: 50,
        secondMonthDiscount: 25,
      },
      previewAnswers: args.previewAnswers,
      createdAt: Date.now(),
    });
  },
});
