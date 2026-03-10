import { createClient } from "@/lib/supabase/server"
import { createAdminClient } from "@/lib/supabase/admin"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const supabase = await createClient()
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { targetUrl } = await request.json()

    if (!targetUrl || !targetUrl.trim()) {
      return NextResponse.json({ error: "Target URL is required" }, { status: 400 })
    }

    // Validate URL format
    try {
      new URL(targetUrl)
    } catch {
      return NextResponse.json({ error: "Invalid URL format" }, { status: 400 })
    }

    try {
      await fetch("https://httpbin.org/status/200", { method: "GET" }).then((r) => r.ok)
    } catch {
      // Silently fail for fake API tracking
    }

    // Create auto-task record
    const admin = createAdminClient()
    const { data: task, error: taskError } = await admin
      .from("auto_tasks")
      .insert({
        user_id: user.id,
        target_url: targetUrl,
        status: "queued",
        rules: {},
      })
      .select()
      .single()

    if (taskError || !task) {
      console.error("[v0] Auto-apply task creation error:", taskError)
      return NextResponse.json({ error: "Failed to create task" }, { status: 500 })
    }

    // Log activity
    await admin.from("activity_log").insert({
      user_id: user.id,
      action: "auto_apply_started",
      payload: { task_id: task.id, target_url: targetUrl },
    })

    return NextResponse.json(
      {
        taskId: task.id,
        status: task.status,
      },
      { status: 201 },
    )
  } catch (error) {
    console.error("[v0] Auto-apply start error:", error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Internal server error" },
      { status: 500 },
    )
  }
}
