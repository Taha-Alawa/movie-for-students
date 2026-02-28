import { z } from "zod"

export const movieSchema = z.object({
  title: z.string({ required_error: "العنوان مطلوب" }).min(1, "العنوان مطلوب"),
  year: z.number({ required_error: "سنة غير صالحة" }).min(1900, "سنة غير صالحة").max(2100, "سنة غير صالحة"),
  rate: z.number({ required_error: "التقييم من 0 إلى 10" }).min(0, "التقييم من 0 إلى 10").max(10, "التقييم من 0 إلى 10"),
  location: z.string({ required_error: "الموقع مطلوب" }).min(1, "الموقع مطلوب"),
  genreId: z.number({ required_error: "اختر التصنيف" }).min(1, "اختر التصنيف"),
  id: z.number().optional(),
})
