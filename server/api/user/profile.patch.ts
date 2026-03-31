import { z } from 'zod'
import { updateUserProfile } from "#server/services/user.service";

const profileSchema = z.object({
    name: z.string().min(1, "Le nom ne peut pas être vide")
})

export default defineEventHandler(async (event) => {
    const session = await requireUserSession(event)
    if (!session.user) {
        throw createError({ statusCode: 401, message: "Non authentifié" })
    }

    const result = await readValidatedBody(event, body => profileSchema.safeParse(body))
    if (!result.success) {
        throw createError({
            statusCode: 400,
            message: result.error.issues[0]?.message
        })
    }

    const newName = result.data.name

    try {
        await updateUserProfile(session.user.id, newName)
        await setUserSession(event, {
            user: {
                id:session.user.id,
                email:session.user.email,
                name:newName
            },
            loggedInAt: new Date()
        });

        return {
            success: true,
            message: "Profil mis à jour avec succès"
        }
    } catch (error) {
        console.error(error)
        throw createError({ statusCode: 500, message: 'Erreur serveur' })
    }
})