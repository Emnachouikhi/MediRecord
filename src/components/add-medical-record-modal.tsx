"use client"

import type React from "react"

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
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

interface AddMedicalRecordModalProps {
  isOpen: boolean
  onClose: () => void
  patientId?: string
  recordType: "note" | "prescription" | "certificate" | "test-result"
}

export default function AddMedicalRecordModal({ isOpen, onClose, patientId, recordType }: AddMedicalRecordModalProps) {
  const [loading, setLoading] = useState(false)

  const getTitle = () => {
    switch (recordType) {
      case "note":
        return "Add Medical Note"
      case "prescription":
        return "Add Prescription"
      case "certificate":
        return "Add Medical Certificate"
      case "test-result":
        return "Add Test Result"
      default:
        return "Add Medical Record"
    }
  }

  const getDescription = () => {
    switch (recordType) {
      case "note":
        return "Add a new medical note to the patient's record"
      case "prescription":
        return "Create a new prescription for the patient"
      case "certificate":
        return "Issue a medical certificate for the patient"
      case "test-result":
        return "Upload test results to the patient's record"
      default:
        return "Add a new entry to the patient's medical record"
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate API call
    setTimeout(() => {
      setLoading(false)
      onClose()
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <DialogTitle>{getTitle()}</DialogTitle>
          <DialogDescription>{getDescription()}</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            {recordType === "note" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="note-title" className="text-right">
                    Title
                  </Label>
                  <Input id="note-title" placeholder="Enter note title" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="note-content" className="text-right">
                    Note
                  </Label>
                  <Textarea
                    id="note-content"
                    placeholder="Enter medical observations, diagnoses, or treatment plans..."
                    className="col-span-3 min-h-[150px]"
                  />
                </div>
              </>
            )}

            {recordType === "prescription" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="medication" className="text-right">
                    Medication
                  </Label>
                  <Input id="medication" placeholder="Enter medication name" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="dosage" className="text-right">
                    Dosage
                  </Label>
                  <Input id="dosage" placeholder="e.g., 10mg" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="frequency" className="text-right">
                    Frequency
                  </Label>
                  <Select>
                    <SelectTrigger id="frequency" className="col-span-3">
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once_daily">Once Daily</SelectItem>
                      <SelectItem value="twice_daily">Twice Daily</SelectItem>
                      <SelectItem value="three_times_daily">Three Times Daily</SelectItem>
                      <SelectItem value="four_times_daily">Four Times Daily</SelectItem>
                      <SelectItem value="as_needed">As Needed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="duration" className="text-right">
                    Duration
                  </Label>
                  <Input id="duration" placeholder="e.g., 30 days" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="instructions" className="text-right">
                    Instructions
                  </Label>
                  <Textarea
                    id="instructions"
                    placeholder="Special instructions for the patient..."
                    className="col-span-3"
                  />
                </div>
              </>
            )}

            {recordType === "certificate" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="certificate-type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger id="certificate-type" className="col-span-3">
                      <SelectValue placeholder="Select certificate type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="sick_leave">Sick Leave</SelectItem>
                      <SelectItem value="fitness">Fitness Certificate</SelectItem>
                      <SelectItem value="medical_condition">Medical Condition</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valid-from" className="text-right">
                    Valid From
                  </Label>
                  <Input id="valid-from" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="valid-until" className="text-right">
                    Valid Until
                  </Label>
                  <Input id="valid-until" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="certificate-details" className="text-right">
                    Details
                  </Label>
                  <Textarea
                    id="certificate-details"
                    placeholder="Enter certificate details..."
                    className="col-span-3"
                  />
                </div>
              </>
            )}

            {recordType === "test-result" && (
              <>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="test-type" className="text-right">
                    Test Type
                  </Label>
                  <Select>
                    <SelectTrigger id="test-type" className="col-span-3">
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blood_test">Blood Test</SelectItem>
                      <SelectItem value="urine_test">Urine Test</SelectItem>
                      <SelectItem value="xray">X-Ray</SelectItem>
                      <SelectItem value="mri">MRI</SelectItem>
                      <SelectItem value="ct_scan">CT Scan</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="test-date" className="text-right">
                    Test Date
                  </Label>
                  <Input id="test-date" type="date" className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="test-results" className="text-right">
                    Results
                  </Label>
                  <Textarea
                    id="test-results"
                    placeholder="Enter test results or observations..."
                    className="col-span-3 min-h-[150px]"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="test-file" className="text-right">
                    Attach File
                  </Label>
                  <Input id="test-file" type="file" className="col-span-3" />
                </div>
              </>
            )}
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
