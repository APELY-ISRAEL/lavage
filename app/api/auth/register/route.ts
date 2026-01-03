import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { z } from "zod";
import { UserRole } from "@/generated/prisma/client";


const registerSchema = z.object({
  nom: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
  prenom: z.string().min(3, "Le prenom doit contenir au moins 3 caractères"),
  adresse: z.string().min(3, "L'adresse doit contenir au moins 3 caractères"),
  email: z.string().email("Email invalide"),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  phone: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nom,prenom, adresse, email, password, phone } = registerSchema.parse(body);

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "Un utilisateur avec cet email existe déjà" },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 12);

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        nom,
        prenom,
        adresse,
        email,
        password: hashedPassword,
        phone,
        role: UserRole.CLIENT
      }
    });

    return NextResponse.json(
      { 
        message: "Compte créé avec succès",
        user: {
          id: user.id,
          name: user.nom,
          lastname: user.prenom,
          adresse: user.adresse,
          email: user.email,
          role: user.role
        }
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Données invalides", details: error.issues },
        { status: 400 }
      );
    }

    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}