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
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});
