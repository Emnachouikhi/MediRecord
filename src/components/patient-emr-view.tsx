"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Edit, FileText, Plus, Activity, Pill } from "lucide-react"
import AddMedicalRecordModal from "@/components/add-medical-record-modal"

interface PatientEMRViewProps {
  patientId: string
  userRole: "doctor" | "clinician"
  patientData?: any // In a real app, this would be properly typed
}

export default function PatientEMRView({ patientId, userRole, patientData }: PatientEMRViewProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [modalOpen, setModalOpen] = useState(false)
  const [recordType, setRecordType] = useState<"note" | "prescription" | "certificate" | "test-result">("note")

  // This would normally come from an API call using the patientId
  const patient = patientData || {
    id: patientId,
    name: "John Doe",
    age: 42,
    gender: "Male",
    bloodType: "O+",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    address: "123 Main St, Anytown, CA 12345",
    emergencyContact: "Jane Doe (Wife) - +1 (555) 987-6543",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    lastVisit: "April 10, 2023",
  }

  const openAddRecordModal = (type: "note" | "prescription" | "certificate" | "test-result") => {
    setRecordType(type)
    setModalOpen(true)
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-1">
          <CardHeader>
            <div className="flex flex-col items-center space-y-3">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder-user.jpg" alt={patient.name} />
                <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="space-y-1 text-center">
                <h2 className="text-xl font-bold">{patient.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {patient.age} years • {patient.gender} • {patient.bloodType}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Allergies</p>
                <div className="flex flex-wrap gap-1">
                  {patient.allergies.map((allergy: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-red-50 text-red-500 border-red-200">
                      {allergy}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Chronic Conditions</p>
                <div className="flex flex-wrap gap-1">
                  {patient.chronicConditions.map((condition: string, index: number) => (
                    <Badge key={index} variant="outline" className="bg-blue-50 text-blue-500 border-blue-200">
                      {condition}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Last Visit</p>
                <div className="flex items-center text-sm">
                  <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                  {patient.lastVisit}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="md:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 md:grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="records">Medical Records</TabsTrigger>
              <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              <TabsTrigger value="tests">Test Results</TabsTrigger>
              <TabsTrigger value="notes" className="hidden md:inline-flex">
                Notes
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Patient Summary</CardTitle>
                  <CardDescription>Overview of patient's health status and recent activities</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Prescriptions</CardTitle>
                        <Pill className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">3</div>
                        <p className="text-xs text-muted-foreground">Last updated: 2 days ago</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Recent Tests</CardTitle>
                        <Activity className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">5</div>
                        <p className="text-xs text-muted-foreground">Last result: April 10, 2023</p>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Next Appointment</CardTitle>
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-md font-bold">April 25, 2023</div>
                        <p className="text-xs text-muted-foreground">10:30 AM - Follow-up</p>
                      </CardContent>
                    </Card>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Recent Vital Signs</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Blood Pressure</p>
                        <p className="font-medium">130/85 mmHg</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Heart Rate</p>
                        <p className="font-medium">78 bpm</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Temperature</p>
                        <p className="font-medium">98.6 °F</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm text-muted-foreground">Respiratory Rate</p>
                        <p className="font-medium">16 breaths/min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {userRole === "doctor" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Common tasks for this patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Button
                        variant="outline"
                        className="flex flex-col h-auto py-4 px-2"
                        onClick={() => openAddRecordModal("note")}
                      >
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Add Note</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col h-auto py-4 px-2"
                        onClick={() => openAddRecordModal("prescription")}
                      >
                        <Pill className="h-6 w-6 mb-2" />
                        <span>New Prescription</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col h-auto py-4 px-2"
                        onClick={() => openAddRecordModal("certificate")}
                      >
                        <FileText className="h-6 w-6 mb-2" />
                        <span>Issue Certificate</span>
                      </Button>
                      <Button
                        variant="outline"
                        className="flex flex-col h-auto py-4 px-2"
                        onClick={() => openAddRecordModal("test-result")}
                      >
                        <Activity className="h-6 w-6 mb-2" />
                        <span>Order Test</span>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {userRole === "clinician" && (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle>Test Results</CardTitle>
                    <Button onClick={() => openAddRecordModal("test-result")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Test Result
                    </Button>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Upload and manage test results for this patient
                    </p>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="records" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Medical Records</CardTitle>
                    <CardDescription>Patient's medical history and documentation</CardDescription>
                  </div>
                  {userRole === "doctor" && (
                    <Button onClick={() => openAddRecordModal("note")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Record
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {i === 1
                            ? "Annual Physical Examination"
                            : i === 2
                              ? "Cardiology Consultation"
                              : i === 3
                                ? "Diabetes Management"
                                : "Hypertension Follow-up"}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {i === 1
                              ? "April 10, 2023"
                              : i === 2
                                ? "February 15, 2023"
                                : i === 3
                                  ? "December 5, 2022"
                                  : "October 20, 2022"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {i === 1
                            ? "Dr. Sarah Johnson"
                            : i === 2
                              ? "Dr. Michael Chen"
                              : i === 3
                                ? "Dr. Emily Rodriguez"
                                : "Dr. Sarah Johnson"}
                        </p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {userRole === "doctor" && (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="prescriptions" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Prescriptions</CardTitle>
                    <CardDescription>Patient's current and past medications</CardDescription>
                  </div>
                  {userRole === "doctor" && (
                    <Button onClick={() => openAddRecordModal("prescription")}>
                      <Plus className="mr-2 h-4 w-4" />
                      New Prescription
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {i === 1 ? "Lisinopril" : i === 2 ? "Metformin" : "Atorvastatin"}
                          </p>
                          <Badge variant="outline" className="bg-green-50 text-green-500 border-green-200">
                            Active
                          </Badge>
                        </div>
                        <p className="text-sm">
                          {i === 1
                            ? "10mg, Once daily"
                            : i === 2
                              ? "500mg, Twice daily"
                              : "20mg, Once daily at bedtime"}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            Prescribed:{" "}
                            {i === 1 ? "April 10, 2023" : i === 2 ? "February 15, 2023" : "December 5, 2022"}
                          </span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                        {userRole === "doctor" && (
                          <>
                            <Button variant="outline" size="sm">
                              Refill
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                              <span className="sr-only">Edit</span>
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tests" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Test Results</CardTitle>
                    <CardDescription>Laboratory, imaging, and other diagnostic results</CardDescription>
                  </div>
                  {userRole === "doctor" && (
                    <Button onClick={() => openAddRecordModal("test-result")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Order New Test
                    </Button>
                  )}
                  {userRole === "clinician" && (
                    <Button onClick={() => openAddRecordModal("test-result")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Test Result
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-between border-b pb-4">
                      <div className="space-y-1">
                        <p className="font-medium">
                          {i === 1
                            ? "Complete Blood Count (CBC)"
                            : i === 2
                              ? "Comprehensive Metabolic Panel"
                              : i === 3
                                ? "Lipid Panel"
                                : i === 4
                                  ? "HbA1c"
                                  : "Chest X-Ray"}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {i === 1
                              ? "April 10, 2023"
                              : i === 2
                                ? "April 10, 2023"
                                : i === 3
                                  ? "February 15, 2023"
                                  : i === 4
                                    ? "February 15, 2023"
                                    : "December 5, 2022"}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground">{i === 5 ? "Radiology" : "Laboratory"}</p>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Results
                        </Button>
                        {userRole === "clinician" && (
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                          <span className="sr-only">Download</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Medical Notes</CardTitle>
                    <CardDescription>Clinical observations and treatment notes</CardDescription>
                  </div>
                  {userRole === "doctor" && (
                    <Button onClick={() => openAddRecordModal("note")}>
                      <Plus className="mr-2 h-4 w-4" />
                      Add Note
                    </Button>
                  )}
                </CardHeader>
                <CardContent className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-medium">
                            {i === 1
                              ? "Follow-up Consultation"
                              : i === 2
                                ? "Medication Adjustment"
                                : "Initial Assessment"}
                          </h3>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>
                              {i === 1 ? "April 10, 2023" : i === 2 ? "February 15, 2023" : "December 5, 2022"}
                            </span>
                            <span className="mx-1">•</span>
                            <span>
                              {i === 1 ? "Dr. Sarah Johnson" : i === 2 ? "Dr. Michael Chen" : "Dr. Sarah Johnson"}
                            </span>
                          </div>
                        </div>
                        {userRole === "doctor" && (
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </Button>
                        )}
                      </div>
                      <p className="text-sm">
                        {i === 1
                          ? "Patient reports improved symptoms after medication adjustment. Blood pressure readings show improvement at 130/85 mmHg. Continue current medication regimen and follow up in 3 months."
                          : i === 2
                            ? "Increased Metformin dosage to 1000mg twice daily due to elevated HbA1c levels. Patient tolerated previous dosage well with no significant side effects."
                            : "Initial consultation for hypertension and type 2 diabetes. Patient presents with BP 150/95 mmHg and HbA1c of 8.2%. Starting on Lisinopril 10mg daily and Metformin 500mg twice daily."}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <AddMedicalRecordModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        patientId={patientId}
        recordType={recordType}
      />
    </div>
  )
}
