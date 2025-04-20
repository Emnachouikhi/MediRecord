"use client"

import type React from "react"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Filter, Plus, Eye, Edit, Trash, Upload } from "lucide-react"
import Link from "next/link"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useToast } from "@/hooks/use-toast"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2 } from "lucide-react"

// Mock test results data
const mockTestResults = [
  {
    id: "test-001",
    patientId: "1001",
    patientName: "John Doe",
    testType: "Blood Work",
    testName: "Complete Blood Count (CBC)",
    date: "April 10, 2023",
    status: "completed",
    results:
      "All parameters within normal range. WBC: 7.2, RBC: 4.8, Hemoglobin: 14.5, Hematocrit: 42%, Platelets: 250,000",
    doctor: "Dr. Sarah Johnson",
    technician: "Lab Technician",
    notes: "Patient fasting for 12 hours prior to test.",
  },
  {
    id: "test-002",
    patientId: "1001",
    patientName: "John Doe",
    testType: "Blood Work",
    testName: "Comprehensive Metabolic Panel",
    date: "April 10, 2023",
    status: "completed",
    results:
      "Glucose: 95 mg/dL, BUN: 15 mg/dL, Creatinine: 0.9 mg/dL, Sodium: 140 mEq/L, Potassium: 4.0 mEq/L, Chloride: 102 mEq/L, CO2: 24 mEq/L, Calcium: 9.5 mg/dL, Total Protein: 7.0 g/dL, Albumin: 4.5 g/dL, Bilirubin: 0.5 mg/dL, Alkaline Phosphatase: 70 U/L, AST: 25 U/L, ALT: 30 U/L",
    doctor: "Dr. Sarah Johnson",
    technician: "Lab Technician",
    notes: "Patient fasting for 12 hours prior to test.",
  },
  {
    id: "test-003",
    patientId: "1001",
    patientName: "John Doe",
    testType: "Blood Work",
    testName: "Lipid Panel",
    date: "April 10, 2023",
    status: "completed",
    results: "Total Cholesterol: 180 mg/dL, HDL: 55 mg/dL, LDL: 100 mg/dL, Triglycerides: 120 mg/dL",
    doctor: "Dr. Sarah Johnson",
    technician: "Lab Technician",
    notes: "Patient fasting for 12 hours prior to test.",
  },
  {
    id: "test-004",
    patientId: "1001",
    patientName: "John Doe",
    testType: "Blood Work",
    testName: "HbA1c",
    date: "April 10, 2023",
    status: "completed",
    results: "HbA1c: 5.7%",
    doctor: "Dr. Sarah Johnson",
    technician: "Lab Technician",
    notes: "Slightly elevated, but within pre-diabetic range.",
  },
  {
    id: "test-005",
    patientId: "1002",
    patientName: "Jane Smith",
    testType: "Urinalysis",
    testName: "Urinalysis",
    date: "April 15, 2023",
    status: "completed",
    results:
      "Color: Yellow, Clarity: Clear, pH: 6.0, Specific Gravity: 1.020, Glucose: Negative, Protein: Negative, Ketones: Negative, Blood: Negative, Nitrites: Negative, Leukocytes: Negative",
    doctor: "Dr. Michael Chen",
    technician: "Lab Technician",
    notes: "Normal urinalysis results.",
  },
  {
    id: "test-006",
    patientId: "1003",
    patientName: "Robert Johnson",
    testType: "Imaging",
    testName: "Chest X-Ray",
    date: "April 8, 2023",
    status: "completed",
    results:
      "No acute cardiopulmonary process. Heart size and pulmonary vascularity appear normal. No pleural effusion or pneumothorax.",
    doctor: "Dr. Emily Rodriguez",
    technician: "Lab Technician",
    notes: "Patient history of smoking.",
  },
  {
    id: "test-007",
    patientId: "1004",
    patientName: "Emily Davis",
    testType: "Blood Work",
    testName: "Thyroid Panel",
    date: "April 12, 2023",
    status: "completed",
    results: "TSH: 2.5 mIU/L, Free T4: 1.2 ng/dL, Free T3: 3.1 pg/mL",
    doctor: "Dr. Sarah Johnson",
    technician: "Lab Technician",
    notes: "All values within normal range.",
  },
  {
    id: "test-008",
    patientId: "1005",
    patientName: "Michael Brown",
    testType: "Blood Work",
    testName: "Liver Function Tests",
    date: "April 5, 2023",
    status: "completed",
    results:
      "AST: 25 U/L, ALT: 30 U/L, ALP: 70 U/L, Total Bilirubin: 0.8 mg/dL, Direct Bilirubin: 0.2 mg/dL, Total Protein: 7.0 g/dL, Albumin: 4.5 g/dL",
    doctor: "Dr. Michael Chen",
    technician: "Lab Technician",
    notes: "All values within normal range.",
  },
  {
    id: "test-009",
    patientId: "1006",
    patientName: "Sarah Wilson",
    testType: "Imaging",
    testName: "Knee X-Ray",
    date: "March 28, 2023",
    status: "completed",
    results: "Mild degenerative changes in the medial compartment of the knee joint. No fracture or dislocation.",
    doctor: "Dr. Emily Rodriguez",
    technician: "Lab Technician",
    notes: "Patient complains of knee pain with movement.",
  },
  {
    id: "test-010",
    patientId: "1007",
    patientName: "David Martinez",
    testType: "Blood Work",
    testName: "Glucose Tolerance Test",
    date: "March 30, 2023",
    status: "pending",
    results: "",
    doctor: "Dr. Sarah Johnson",
    technician: "",
    notes: "Patient to fast for 12 hours prior to test.",
  },
  {
    id: "test-011",
    patientId: "1008",
    patientName: "Lisa Anderson",
    testType: "Imaging",
    testName: "Abdominal Ultrasound",
    date: "February 15, 2023",
    status: "pending",
    results: "",
    doctor: "Dr. Emily Rodriguez",
    technician: "",
    notes: "Patient to fast for 8 hours prior to test.",
  },
  {
    id: "test-012",
    patientId: "1009",
    patientName: "James Taylor",
    testType: "Blood Work",
    testName: "Complete Blood Count (CBC)",
    date: "March 20, 2023",
    status: "pending",
    results: "",
    doctor: "Dr. Michael Chen",
    technician: "",
    notes: "Patient on anticoagulant therapy.",
  },
]

export default function ClinicianTestResults() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedTest, setSelectedTest] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // New test form state
  const [newTest, setNewTest] = useState({
    patientId: "",
    patientName: "",
    testType: "",
    testName: "",
    results: "",
    notes: "",
  })

  // Filter test results based on search query and active tab
  const filteredTestResults = mockTestResults.filter((test) => {
    const matchesSearch =
      test.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.testType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      test.id.includes(searchQuery)

    if (activeTab === "all") return matchesSearch
    if (activeTab === "completed") return matchesSearch && test.status === "completed"
    if (activeTab === "pending") return matchesSearch && test.status === "pending"

    return matchesSearch
  })

  const handleViewTest = (test: any) => {
    setSelectedTest(test)
    setIsViewDialogOpen(true)
  }

  const handleDeleteTest = (test: any) => {
    setSelectedTest(test)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the test result
    toast({
      title: "Test Result Deleted",
      description: `${selectedTest.testName} for ${selectedTest.patientName} has been deleted.`,
    })
    setIsDeleteDialogOpen(false)
  }

  const handleAddTest = () => {
    setIsAddDialogOpen(true)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setNewTest((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setNewTest((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmitNewTest = () => {
    setIsSubmitting(true)

    // Validate form
    if (!newTest.patientId || !newTest.patientName || !newTest.testType || !newTest.testName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      })
      setIsSubmitting(false)
      return
    }

    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, this would call an API to add the test result
      toast({
        title: "Test Result Added",
        description: `${newTest.testName} for ${newTest.patientName} has been added.`,
      })

      // Reset form and close dialog
      setNewTest({
        patientId: "",
        patientName: "",
        testType: "",
        testName: "",
        results: "",
        notes: "",
      })
      setIsAddDialogOpen(false)
      setIsSubmitting(false)
    }, 1000)
  }

  return (
    <DashboardLayout role="clinician" userName="Lab Technician">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Test Results</h1>
            <p className="text-muted-foreground">Manage and view all patient test results</p>
          </div>
          <div className="flex gap-1">
            
            <Button onClick={handleAddTest}>
              <Plus className="mr-2 h-4 w-4" />
              Add Test Result
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by patient name, test name, or ID..."
              className="w-full pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
                <CardDescription>View and manage all patient test results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="col-span-2">Test</div>
                    <div className="hidden md:block">Date</div>
                    <div className="hidden md:block">Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredTestResults.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No test results found</div>
                    ) : (
                      filteredTestResults.map((test) => (
                        <div key={test.id} className="grid grid-cols-7 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder-user-${test.patientId.slice(-1)}.jpg`}
                                alt={test.patientName}
                              />
                              <AvatarFallback>{test.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{test.patientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {test.patientId}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{test.testName}</div>
                            <div className="text-sm text-muted-foreground">{test.testType}</div>
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {test.date}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <Badge
                              variant="outline"
                              className={
                                test.status === "completed"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-yellow-50 text-yellow-700 border-yellow-200"
                              }
                            >
                              {test.status === "completed" ? "Completed" : "Pending"}
                            </Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewTest(test)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            {test.status === "pending" && (
                              <Button variant="ghost" size="icon" asChild title="Edit Test">
                                <Link href={`/dashboard/clinician/results/edit/${test.id}`}>
                                  <Edit className="h-4 w-4" />
                                  <span className="sr-only">Edit</span>
                                </Link>
                              </Button>
                            )}
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTest(test)}
                              title="Delete Test"
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Tests</CardTitle>
                <CardDescription>Tests with results uploaded and completed</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="col-span-2">Test</div>
                    <div className="hidden md:block">Date</div>
                    <div className="hidden md:block">Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredTestResults.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No completed tests found</div>
                    ) : (
                      filteredTestResults.map((test) => (
                        <div key={test.id} className="grid grid-cols-7 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder-user-${test.patientId.slice(-1)}.jpg`}
                                alt={test.patientName}
                              />
                              <AvatarFallback>{test.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{test.patientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {test.patientId}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{test.testName}</div>
                            <div className="text-sm text-muted-foreground">{test.testType}</div>
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {test.date}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Completed
                            </Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewTest(test)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeleteTest(test)}
                              title="Delete Test"
                            >
                              <Trash className="h-4 w-4" />
                              <span className="sr-only">Delete</span>
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Pending Tests</CardTitle>
                <CardDescription>Tests awaiting results upload</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="col-span-2">Test</div>
                    <div className="hidden md:block">Date</div>
                    <div className="hidden md:block">Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredTestResults.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No pending tests found</div>
                    ) : (
                      filteredTestResults.map((test) => (
                        <div key={test.id} className="grid grid-cols-7 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder-user-${test.patientId.slice(-1)}.jpg`}
                                alt={test.patientName}
                              />
                              <AvatarFallback>{test.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{test.patientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {test.patientId}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{test.testName}</div>
                            <div className="text-sm text-muted-foreground">{test.testType}</div>
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {test.date}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                              Pending
                            </Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm">
                              <Upload className="mr-2 h-4 w-4" />
                              Upload Results
                            </Button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* View Test Details Dialog */}
      {selectedTest && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Test Result Details</DialogTitle>
              <DialogDescription>
                {selectedTest.testName} for {selectedTest.patientName} ({selectedTest.patientId})
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Test Type:</div>
                <div className="col-span-2">{selectedTest.testType}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Test Name:</div>
                <div className="col-span-2">{selectedTest.testName}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Date:</div>
                <div className="col-span-2">{selectedTest.date}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className={
                      selectedTest.status === "completed"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-yellow-50 text-yellow-700 border-yellow-200"
                    }
                  >
                    {selectedTest.status === "completed" ? "Completed" : "Pending"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Ordered By:</div>
                <div className="col-span-2">{selectedTest.doctor}</div>
              </div>
              {selectedTest.status === "completed" && (
                <>
                  <div className="grid grid-cols-3 items-center gap-4">
                    <div className="font-medium">Technician:</div>
                    <div className="col-span-2">{selectedTest.technician}</div>
                  </div>
                  <div className="grid grid-cols-3 items-start gap-4">
                    <div className="font-medium">Results:</div>
                    <div className="col-span-2 whitespace-pre-wrap">{selectedTest.results}</div>
                  </div>
                </>
              )}
              <div className="grid grid-cols-3 items-start gap-4">
                <div className="font-medium">Notes:</div>
                <div className="col-span-2">{selectedTest.notes}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              {selectedTest.status === "pending" && (
                <Button asChild>
                  <Link href={`/dashboard/clinician/results/edit/${selectedTest.id}`}>Upload Results</Link>
                </Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedTest && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this test result? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>
                <span className="font-medium">{selectedTest.testName}</span> ({selectedTest.testType}) for patient{" "}
                <span className="font-medium">{selectedTest.patientName}</span>
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Test Result
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Add New Test Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Test Result</DialogTitle>
            <DialogDescription>Enter the details for the new test result</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="patientId">Patient ID</Label>
                <Input
                  id="patientId"
                  name="patientId"
                  value={newTest.patientId}
                  onChange={handleInputChange}
                  placeholder="Enter patient ID"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="patientName">Patient Name</Label>
                <Input
                  id="patientName"
                  name="patientName"
                  value={newTest.patientName}
                  onChange={handleInputChange}
                  placeholder="Enter patient name"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="testType">Test Type</Label>
                <Select onValueChange={(value) => handleSelectChange("testType", value)} value={newTest.testType}>
                  <SelectTrigger id="testType">
                    <SelectValue placeholder="Select test type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Blood Work">Blood Work</SelectItem>
                    <SelectItem value="Urinalysis">Urinalysis</SelectItem>
                    <SelectItem value="Imaging">Imaging</SelectItem>
                    <SelectItem value="Pathology">Pathology</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="testName">Test Name</Label>
                <Input
                  id="testName"
                  name="testName"
                  value={newTest.testName}
                  onChange={handleInputChange}
                  placeholder="Enter test name"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="results">Results</Label>
              <Textarea
                id="results"
                name="results"
                value={newTest.results}
                onChange={handleInputChange}
                placeholder="Enter test results"
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea
                id="notes"
                name="notes"
                value={newTest.notes}
                onChange={handleInputChange}
                placeholder="Enter any additional notes"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="file">Attach File (optional)</Label>
              <Input id="file" type="file" />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isSubmitting}>
              Cancel
            </Button>
            <Button onClick={handleSubmitNewTest} disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Test Result
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}
