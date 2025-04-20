"use client"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { exportPatientData } from "./data-export-service"
import { fetchPatientData } from "./data-fetcher"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  patientId: string
}

export default function ExportModal({ isOpen, onClose, patientId }: ExportModalProps) {
  const { toast } = useToast()
  const [isExporting, setIsExporting] = useState(false)
  const [selectedOptions, setSelectedOptions] = useState({
    personalInfo: true,
    medicalRecords: true,
    prescriptions: true,
    testResults: true,
    medicalImages: true,
    certificates: true,
  })

  const handleOptionChange = (option: keyof typeof selectedOptions) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: !prev[option],
    }))
  }

  const handleExport = async () => {
    try {
      setIsExporting(true)

      toast({
        title: "Export Started",
        description: "Gathering your medical data...",
      })

      // Fetch patient data
      const patientData = await fetchPatientData(patientId)

      // Filter data based on selected options
      if (!selectedOptions.medicalRecords) {
        patientData.medicalRecords = []
      }

      if (!selectedOptions.prescriptions) {
        patientData.prescriptions = []
      }

      if (!selectedOptions.testResults) {
        patientData.testResults = []
      }

      if (!selectedOptions.medicalImages) {
        patientData.medicalImages = []
      }

      if (!selectedOptions.certificates) {
        patientData.certificates = []
      }

      // Export the data
      await exportPatientData(patientData)

      toast({
        title: "Export Complete",
        description: "Your medical records have been downloaded successfully.",
      })

      onClose()
    } catch (error) {
      console.error("Export failed:", error)
      toast({
        title: "Export Failed",
        description: "There was an error exporting your medical records. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Export Medical Records</DialogTitle>
          <DialogDescription>Select which medical records you want to include in the export.</DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="personalInfo"
              checked={selectedOptions.personalInfo}
              onCheckedChange={() => handleOptionChange("personalInfo")}
              disabled={true} // Personal info is always included
            />
            <Label htmlFor="personalInfo">Personal Information (Required)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="medicalRecords"
              checked={selectedOptions.medicalRecords}
              onCheckedChange={() => handleOptionChange("medicalRecords")}
            />
            <Label htmlFor="medicalRecords">Medical Records</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="prescriptions"
              checked={selectedOptions.prescriptions}
              onCheckedChange={() => handleOptionChange("prescriptions")}
            />
            <Label htmlFor="prescriptions">Prescriptions</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="testResults"
              checked={selectedOptions.testResults}
              onCheckedChange={() => handleOptionChange("testResults")}
            />
            <Label htmlFor="testResults">Test Results</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="medicalImages"
              checked={selectedOptions.medicalImages}
              onCheckedChange={() => handleOptionChange("medicalImages")}
            />
            <Label htmlFor="medicalImages">Medical Images (X-rays, MRIs, etc.)</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="certificates"
              checked={selectedOptions.certificates}
              onCheckedChange={() => handleOptionChange("certificates")}
            />
            <Label htmlFor="certificates">Medical Certificates</Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isExporting}>
            Cancel
          </Button>
          <Button onClick={handleExport} disabled={isExporting}>
            {isExporting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isExporting ? "Exporting..." : "Download"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
