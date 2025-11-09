"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Upload, FileText, AlertCircle, CheckCircle } from "lucide-react"
import { Spinner } from "@/components/ui/spinner"

interface ResumeUploaderProps {
  onSuccess: (text: string, resumeId: string, wordCount: number) => void
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
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch("/api/upload/resume", {
        method: "POST",
        body: formData,
      })

      const data = await response.json()

      if (!response.ok) {
        if (data.errorCode === "TOO_SHORT") {
          onError(data.message)
        } else if (data.errorCode === "GIBBERISH_CONTENT") {
          onError(data.message)
        } else {
          onError(data.error || "Upload failed")
        }
        setUploadStatus("error")
        return
      }

      setFileName(file.name)
      setUploadStatus("success")
      onSuccess(data.text, data.resumeId, data.wordCount)
    } catch (err) {
      onError(err instanceof Error ? err.message : "Upload failed")
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
        className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
          isDragActive
            ? "border-black dark:border-white bg-neutral-100 dark:bg-neutral-900"
            : "border-neutral-300 dark:border-neutral-700"
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
            <CheckCircle className="w-8 h-8 text-green-600 mx-auto" />
            <p className="text-sm font-medium text-black dark:text-white">Resume uploaded successfully</p>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">{fileName}</p>
          </div>
        ) : uploadStatus === "error" ? (
          <div className="space-y-2">
            <AlertCircle className="w-8 h-8 text-red-600 mx-auto" />
            <p className="text-sm font-medium text-black dark:text-white">Upload failed</p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUploadStatus("idle")
                fileInputRef.current?.click()
              }}
              className="text-xs"
            >
              Try again
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {isLoading ? (
              <>
                <Spinner className="w-6 h-6 mx-auto text-black dark:text-white" />
                <p className="text-sm text-neutral-600 dark:text-neutral-400">Processing PDF...</p>
              </>
            ) : (
              <>
                <Upload className="w-6 h-6 mx-auto text-neutral-600 dark:text-neutral-400" />
                <div>
                  <p className="text-sm font-medium text-black dark:text-white">Drag & drop your resume PDF</p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">or click to select</p>
                </div>
                <Button variant="outline" size="sm" onClick={() => fileInputRef.current?.click()} className="text-xs">
                  <FileText className="w-3 h-3 mr-1.5" />
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
