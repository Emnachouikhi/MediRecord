"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Plus, Trash } from "lucide-react"

export default function NewPrescription() {
  const router = useRouter()
  const [medications, setMedications] = useState([{ id: 1, name: "", dosage: "", frequency: "", duration: "" }])

  const addMedication = () => {
    const newId = medications.length > 0 ? Math.max(...medications.map((m) => m.id)) + 1 : 1
    setMedications([...medications, { id: newId, name: "", dosage: "", frequency: "", duration: "" }])
  }

  const removeMedication = (id: number) => {
    if (medications.length > 1) {
      setMedications(medications.filter((m) => m.id !== id))
    }
  }

  const updateMedication = (id: number, field: string, value: string) => {
    setMedications(medications.map((m) => (m.id === id ? { ...m, [field]: value } : m)))
  }

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Johnson">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">New Prescription</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
              <CardDescription>Select the patient for this prescription</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="Search patients..." className="pl-8" />
              </div>

              <div className="border rounded-lg divide-y">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="p-3 flex items-center space-x-3 hover:bg-muted/50 cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div>
                      <p className="font-medium">Patient Name {i}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: P-{1000 + i} • {30 + i} years
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2">
                <Label>Selected Patient</Label>
                <div className="border rounded-lg p-3 bg-muted/50">
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm">42 years • Male • ID: P-1001</p>
                  <p className="text-sm text-muted-foreground mt-1">Allergies: Penicillin, Peanuts</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Prescription Details</CardTitle>
              <CardDescription>Enter medication details and instructions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="prescription-date">Prescription Date</Label>
                    <Input id="prescription-date" type="date" defaultValue={new Date().toISOString().split("T")[0]} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valid-until">Valid Until</Label>
                    <Input id="valid-until" type="date" />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Medications</Label>
                    <Button variant="outline" size="sm" onClick={addMedication}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Medication
                    </Button>
                  </div>

                  {medications.map((medication) => (
                    <div key={medication.id} className="border rounded-lg p-4 space-y-4">
                      <div className="flex justify-between items-center">
                        <h4 className="font-medium">Medication {medication.id}</h4>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeMedication(medication.id)}
                          disabled={medications.length === 1}
                        >
                          <Trash className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`med-name-${medication.id}`}>Medication Name</Label>
                        <Input
                          id={`med-name-${medication.id}`}
                          placeholder="Enter medication name"
                          value={medication.name}
                          onChange={(e) => updateMedication(medication.id, "name", e.target.value)}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor={`med-dosage-${medication.id}`}>Dosage</Label>
                          <Input
                            id={`med-dosage-${medication.id}`}
                            placeholder="e.g., 10mg"
                            value={medication.dosage}
                            onChange={(e) => updateMedication(medication.id, "dosage", e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`med-frequency-${medication.id}`}>Frequency</Label>
                          <Select
                            onValueChange={(value) => updateMedication(medication.id, "frequency", value)}
                            value={medication.frequency}
                          >
                            <SelectTrigger id={`med-frequency-${medication.id}`}>
                              <SelectValue placeholder="Select frequency" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="once_daily">Once Daily</SelectItem>
                              <SelectItem value="twice_daily">Twice Daily</SelectItem>
                              <SelectItem value="three_times_daily">Three Times Daily</SelectItem>
                              <SelectItem value="four_times_daily">Four Times Daily</SelectItem>
                              <SelectItem value="as_needed">As Needed</SelectItem>
                              <SelectItem value="other">Other (Specify)</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor={`med-duration-${medication.id}`}>Duration</Label>
                          <Input
                            id={`med-duration-${medication.id}`}
                            placeholder="e.g., 30 days"
                            value={medication.duration}
                            onChange={(e) => updateMedication(medication.id, "duration", e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="instructions">Special Instructions</Label>
                  <Textarea
                    id="instructions"
                    placeholder="Enter any special instructions for the patient..."
                    className="min-h-[100px]"
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <div className="space-x-2">
                <Button variant="outline">Save as Draft</Button>
                <Button>Issue Prescription</Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
