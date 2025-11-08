import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const admin = createAdminClient()
    const { data: profile, error } = await admin.from("profiles").select("*").eq("id", user.id).single()

    if (error && error.code !== "PGRST116") throw error

    return NextResponse.json({
      success: true,
      profile: profile || { id: user.id, email: user.email },
    })
  } catch (error) {
    console.error("[v0] Get profile API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { full_name, headline, preferred_tones } = await request.json()

    const admin = createAdminClient()
    const { data: profile, error } = await admin
      .from("profiles")
      .upsert({
        id: user.id,
        full_name,
        headline,
        preferred_tones: preferred_tones || [],
        updated_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (error) throw error

    return NextResponse.json({
      success: true,
      profile,
    })
  } catch (error) {
    console.error("[v0] Update profile API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
