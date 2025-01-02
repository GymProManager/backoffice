// src/domain/schemas.js
import { z } from 'zod';

export const productSchema = z.object({
  name: z.string().nonempty(),
  price: z.number().positive(),
  category: z.string().nonempty(),
  type: z.string().nonempty(),
});
