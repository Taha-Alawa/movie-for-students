import { z } from "zod"

export const genreSchema = z.object({
  name: z.string().min(1, "الاسم مطلوب"),
  id: z.number().optional(),
})
