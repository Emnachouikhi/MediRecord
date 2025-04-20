"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { exportPatientData } from "./data-export-service"
import { fetchPatientData } from "./data-fetcher"
import { Progress } from "@/components/ui/progress"

interface ExportButtonProps {
  patientId: string
  variant?: "default" | "outline" | "secondary" | "ghost" | "link" | "destructive"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
}

export default function ExportButton({
  patientId,
  variant = "default",
  size = "default",
  className,
}: ExportButtonProps) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleExport = async () => {
    try {
      setIsExporting(true)
      setProgress(10)

      toast({
        title: "Export Started",
        description: "Gathering your medical data...",
      })

      // Fetch patient data
      const patientData = await fetchPatientData(patientId)
      setProgress(30)

      // Update progress
      toast({
        title: "Processing Data",
        description: "Preparing your medical records for download...",
      })

      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 10
          if (newProgress >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return newProgress
        })
      }, 500)

      // Export the data
      await exportPatientData(patientData)

      clearInterval(progressInterval)
      setProgress(100)

      toast({
        title: "Export Complete",
        description: "Your medical records have been downloaded successfully.",
      })
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your medical records. Please try again.",
        variant: "destructive",
      })
    } finally {
      setTimeout(() => {
        setIsExporting(false)
        setProgress(0)
      }, 1000)
    }
  }

  return (
    <div className="flex flex-col gap-2">
      <Button variant={variant} size={size} onClick={handleExport} disabled={isExporting} className={className}>
        <Download className="mr-2 h-4 w-4" />
        {isExporting ? "Exporting..." : "Download Medical Records"}
      </Button>

      {isExporting && (
        <div className="w-full">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-1 text-center">
            {progress < 100 ? `${progress}% complete` : "Download ready"}
          </p>
        </div>
      )}
    </div>
  )
}
