import { createClient } from "@/lib/supabase/server"
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

    const { searchParams } = new URL(request.url)
    const feature = searchParams.get("feature")
    const limit = Math.min(Number.parseInt(searchParams.get("limit") || "20"), 100)
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    let query = supabase
      .from("generated_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false })

    if (feature) {
      query = query.eq("feature", feature)
    }

    const { data, error, count } = await query.range(offset, offset + limit - 1)

    if (error) throw error

    return NextResponse.json({
      success: true,
      items: data,
      total: count,
      limit,
      offset,
    })
  } catch (error) {
    console.error("[v0] Get items API error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
