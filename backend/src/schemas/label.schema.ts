import { z } from 'zod';

export const labelCreationSchema = z.object({
    label_data: z.object({
        Title: z.string(),
        _id: z.union([z.string(), z.any()]).optional(),
        Measurements: z.object({
            SeamGap: z.number(),
            Width: z.number(),
            Height: z.number(),
            FontSize: z.number(),
            TextAlignment: z.string(),
            MarginLeft: z.number()
        }),
        CountryOfOrigin: z.number(),
        FiberContent: z.array(z.object({material: z.number(), percentage: z.string()})),
        CareLabel: z.array(z.number()),
        AdditionalInfo: z.object({
            RnNumber: z.string(),
            Address: z.string(),
            Website: z.string(),
        }),
        Languages: z.array(z.string()),
    }),
});