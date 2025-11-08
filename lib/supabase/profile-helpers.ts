import { createAdminClient } from "./admin"

export async function ensureProfileExists(userId: string) {
  const admin = createAdminClient()

  // Check if profile exists
  const { data: existingProfile } = await admin.from("profiles").select("id").eq("id", userId).maybeSingle()

  // If profile doesn't exist, create it
  if (!existingProfile) {
    const { data: newProfile } = await admin
      .from("profiles")
      .insert({
        id: userId,
        full_name: "",
        headline: "",
        preferred_tones: [],
      })
      .select()
      .single()
    return newProfile
  }

  return existingProfile
}

export async function getOrCreateProfile(userId: string) {
  const admin = createAdminClient()

  // Ensure profile exists first
  await ensureProfileExists(userId)

  // Fetch and return the profile
  const { data: profile } = await admin.from("profiles").select("*").eq("id", userId).maybeSingle()

  return profile
}
