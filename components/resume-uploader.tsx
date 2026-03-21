"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"
import { extractTextFromPdf, validateResumeText } from "@/lib/utils/pdf-parser"

interface ResumeUploaderProps {
  onSuccess: (text: string, wordCount: number) => void
  onError: (message: string) => void
  disabled?: boolean
}

export function ResumeUploader({ onSuccess, onError, disabled = false }: ResumeUploaderProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [isDragActive, setIsDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle")
  const [fileName, setFileName] = useState("")

  const handleFile = async (file: File) => {
    if (!file.name.toLowerCase().endsWith(".pdf")) {
      onError("Only PDF files are accepted")
      return
    }

    setIsLoading(true)
    setUploadStatus("idle")

    try {
      const text = await extractTextFromPdf(file)
      const validation = validateResumeText(text, 100)

      if (!validation.valid) {
        onError(validation.error || "Invalid resume")
        setUploadStatus("error")
        setIsLoading(false)
        return
      }

      setFileName(file.name)
      setUploadStatus("success")
      onSuccess(text, validation.wordCount)
    } catch (err) {
      onError(err instanceof Error ? err.message : "Failed to parse PDF")
      setUploadStatus("error")
    } finally {
      setIsLoading(false)
    }
  }

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(e.type === "dragenter" || e.type === "dragover")
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragActive(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFile(files[0])
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0])
    }
  }

  return (
    <div className="space-y-2">
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-xl p-6 text-center smooth-hover ${
          isDragActive
            ? "border-primary bg-primary/5"
            : "border-border hover:border-primary/30"
        } ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled || isLoading}
        />

        {uploadStatus === "success" ? (
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-emerald-100 dark:bg-emerald-950/50 rounded-xl flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <p className="text-sm font-medium text-foreground">Resume parsed successfully</p>
            <p className="text-xs text-muted-foreground">{fileName}</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUploadStatus("idle")
                fileInputRef.current?.click()
              }}
              className="text-xs h-7 border-border hover:bg-muted smooth-hover"
            >
              Upload different file
            </Button>
          </div>
        ) : uploadStatus === "error" ? (
          <div className="space-y-2">
            <div className="w-10 h-10 mx-auto bg-destructive/10 rounded-xl flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-destructive" />
            </div>
            <p className="text-sm font-medium text-foreground">Parse failed</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUploadStatus("idle")
                fileInputRef.current?.click()
              }}
              className="text-xs h-7 border-border hover:bg-muted smooth-hover"
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {isLoading ? (
              <>
                <Spinner className="w-6 h-6 mx-auto text-primary" />
                <p className="text-sm text-muted-foreground">Parsing PDF...</p>
              </>
            ) : (
              <>
                <div className="w-10 h-10 mx-auto bg-muted rounded-xl flex items-center justify-center">
                  <Upload className="w-5 h-5 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">Drag & drop your resume PDF</p>
                  <p className="text-xs text-muted-foreground">or click to select</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-xs h-7 border-border hover:bg-muted smooth-hover gap-1.5"
                >
                  <FileText className="w-3 h-3" />
                  Choose File
                </Button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
