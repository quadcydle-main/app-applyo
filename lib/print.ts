// Client-only: open a clean print window for a text document.
// Lets users "Save as PDF" via the browser's print dialog — no external lib needed.
export function printDocument(title: string, body: string) {
  if (typeof window === "undefined") return
  const w = window.open("", "_blank", "width=820,height=1000")
  if (!w) return
  const safe = body
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
  w.document.write(`<!doctype html><html><head><meta charset="utf-8"><title>${title}</title>
<style>
  @page { margin: 1in; }
  body { font-family: Georgia, 'Times New Roman', serif; color: #111; line-height: 1.55; font-size: 12pt; white-space: pre-wrap; padding: 0; margin: 0; }
  h1 { font-family: Arial, sans-serif; font-size: 13pt; color: #c2410c; margin: 0 0 4pt; }
  .meta { font-family: Arial, sans-serif; font-size: 8pt; color: #888; margin-bottom: 16pt; border-bottom: 1px solid #ddd; padding-bottom: 8pt; }
  @media print { .noprint { display: none; } }
  .noprint { font-family: Arial, sans-serif; margin-bottom: 16pt; }
  button { background:#c2410c; color:#fff; border:0; padding:8px 16px; border-radius:6px; font-size:11pt; cursor:pointer; }
</style></head><body>
<div class="noprint"><button onclick="window.print()">Save as PDF / Print</button></div>
<h1>${title}</h1>
<div class="meta">Generated with Applyo · applyo.app</div>
${safe}
</body></html>`)
  w.document.close()
  setTimeout(() => { try { w.print() } catch {} }, 350)
}
