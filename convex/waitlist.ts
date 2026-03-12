import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const join = mutation({
  args: {
    email: v.string(),
    name: v.string(),
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
      createdAt: Date.now(),
    });
  },
});
