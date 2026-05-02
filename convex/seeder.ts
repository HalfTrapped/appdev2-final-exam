import { mutation } from "./_generated/server";
import bcrypt from "bcryptjs";

export const seed = mutation({
  args: {},
  handler: async (ctx) => {
    // 1. Create a Seed User first
    // We check if they exist so we don't create duplicates
    const existingUser = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("username"), "testuser"))
      .unique();

    let userId;
    if (existingUser) {
      userId = existingUser._id;
    } else {
      const hashedPassword = bcrypt.hashSync("password123", 10);
      userId = await ctx.db.insert("users", {
        username: "testuser",
        password: hashedPassword,
        fullname: "Test User"
      });
    }
    
    const initialTasks = [
      "Buy groceries",
      "Finish React Native tutorial",
      "Clean the kitchen",
      "Call mom",
      "Schedule dentist appointment",
      "Fix bug in todo app",
      "Read 10 pages of a book",
      "Go for a 20-minute run",
      "Organize desk",
      "Meditate for 5 minutes"
    ];

    for (const taskText of initialTasks) {
      await ctx.db.insert("todos", {
        text: taskText,
        isCompleted: Math.random() > 0.7, // Randomly mark some as completed
        userId: userId
      });
    }
    
    return "Successfully seeded 10 tasks!";
  },
});
