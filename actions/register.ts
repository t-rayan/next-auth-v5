"use server";
import * as z from "zod";
import bcrypt from "bcryptjs";

import { RegisterSchema } from "@/schemas";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  // validating form values
  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  // extracting validated fields
  const { email, name, password } = validatedFields.data;
  // hashing plain password
  const hashedPassword = await bcrypt.hash(password, 10);

  // checking for existing email in database
  const existingEmail = await getUserByEmail(email);

  if (existingEmail) {
    return { error: "Email already in use!" };
  }

  await db.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
    },
  });

  // TODO: send verification token email
  const verificationToken = await generateVerificationToken(email);

  sendVerificationEmail(verificationToken.email, verificationToken.token);

  return { success: "Confirmation email sent" };
};
