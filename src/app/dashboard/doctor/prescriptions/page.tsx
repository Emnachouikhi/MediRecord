"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Search, Calendar, Filter, Plus, Edit, Trash, Eye } from "lucide-react"
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

// Mock prescription data
const mockPrescriptions = [
  {
    id: "presc-001",
    patientId: "1001",
    patientName: "John Doe",
    medication: "Lisinopril",
    dosage: "10mg",
    frequency: "Once daily",
    date: "April 10, 2023",
    expiryDate: "October 10, 2023",
    status: "active",
    details: "Take with or without food.",
  },
  {
    id: "presc-002",
    patientId: "1001",
    patientName: "John Doe",
    medication: "Metformin",
    dosage: "500mg",
    frequency: "Twice daily",
    date: "April 10, 2023",
    expiryDate: "October 10, 2023",
    status: "active",
    details: "Take with meals.",
  },
  {
    id: "presc-003",
    patientId: "1002",
    patientName: "Jane Smith",
    medication: "Albuterol",
    dosage: "90mcg",
    frequency: "As needed",
    date: "April 15, 2023",
    expiryDate: "October 15, 2023",
    status: "active",
    details: "Use inhaler for asthma symptoms.",
  },
  {
    id: "presc-004",
    patientId: "1003",
    patientName: "Robert Johnson",
    medication: "Atorvastatin",
    dosage: "20mg",
    frequency: "Once daily",
    date: "April 8, 2023",
    expiryDate: "October 8, 2023",
    status: "active",
    details: "Take at bedtime.",
  },
  {
    id: "presc-005",
    patientId: "1003",
    patientName: "Robert Johnson",
    medication: "Aspirin",
    dosage: "81mg",
    frequency: "Once daily",
    date: "April 8, 2023",
    expiryDate: "October 8, 2023",
    status: "active",
    details: "Take with food.",
  },
  {
    id: "presc-006",
    patientId: "1004",
    patientName: "Emily Davis",
    medication: "Sumatriptan",
    dosage: "50mg",
    frequency: "As needed",
    date: "April 12, 2023",
    expiryDate: "October 12, 2023",
    status: "active",
    details: "Take at onset of migraine symptoms.",
  },
  {
    id: "presc-007",
    patientId: "1005",
    patientName: "Michael Brown",
    medication: "Omeprazole",
    dosage: "20mg",
    frequency: "Once daily",
    date: "April 5, 2023",
    expiryDate: "October 5, 2023",
    status: "active",
    details: "Take before breakfast.",
  },
  {
    id: "presc-008",
    patientId: "1005",
    patientName: "Michael Brown",
    medication: "Lorazepam",
    dosage: "0.5mg",
    frequency: "As needed",
    date: "April 5, 2023",
    expiryDate: "May 5, 2023",
    status: "active",
    details: "Take for anxiety symptoms.",
  },
  {
    id: "presc-009",
    patientId: "1007",
    patientName: "David Martinez",
    medication: "Metformin",
    dosage: "1000mg",
    frequency: "Twice daily",
    date: "March 30, 2023",
    expiryDate: "September 30, 2023",
    status: "active",
    details: "Take with meals.",
  },
  {
    id: "presc-010",
    patientId: "1008",
    patientName: "Lisa Anderson",
    medication: "Levothyroxine",
    dosage: "75mcg",
    frequency: "Once daily",
    date: "February 15, 2023",
    expiryDate: "August 15, 2023",
    status: "expired",
    details: "Take on empty stomach.",
  },
  {
    id: "presc-011",
    patientId: "1009",
    patientName: "James Taylor",
    medication: "Sertraline",
    dosage: "50mg",
    frequency: "Once daily",
    date: "March 20, 2023",
    expiryDate: "September 20, 2023",
    status: "active",
    details: "Take in the morning.",
  },
  {
    id: "presc-012",
    patientId: "1009",
    patientName: "James Taylor",
    medication: "Zolpidem",
    dosage: "5mg",
    frequency: "Once daily",
    date: "March 20, 2023",
    expiryDate: "April 20, 2023",
    status: "expired",
    details: "Take before bedtime.",
  },
  {
    id: "presc-013",
    patientId: "1010",
    patientName: "Patricia Thomas",
    medication: "Prednisone",
    dosage: "10mg",
    frequency: "Once daily",
    date: "April 2, 2023",
    expiryDate: "May 2, 2023",
    status: "active",
    details: "Take with food.",
  },
]

export default function DoctorPrescriptions() {
  const router = useRouter()
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null)
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  // Filter prescriptions based on search query and active tab
  const filteredPrescriptions = mockPrescriptions.filter((prescription) => {
    const matchesSearch =
      prescription.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.medication.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.id.includes(searchQuery)

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && prescription.status === "active"
    if (activeTab === "expired") return matchesSearch && prescription.status === "expired"

    return matchesSearch
  })

  const handleViewPrescription = (prescription: any) => {
    setSelectedPrescription(prescription)
    setIsViewDialogOpen(true)
  }

  const handleDeletePrescription = (prescription: any) => {
    setSelectedPrescription(prescription)
    setIsDeleteDialogOpen(true)
  }

  const confirmDelete = () => {
    // In a real app, this would call an API to delete the prescription
    toast({
      title: "Prescription Deleted",
      description: `${selectedPrescription.medication} for ${selectedPrescription.patientName} has been deleted.`,
    })
    setIsDeleteDialogOpen(false)
  }

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Johnson">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Prescriptions</h1>
            <p className="text-muted-foreground">Manage and view all patient prescriptions</p>
          </div>
          <div className="flex gap-2">
           
            <Button asChild>
              <Link href="/dashboard/doctor/prescription/new">
                <Plus className="mr-2 h-4 w-4" />
                New Prescription
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by patient name, medication, or ID..."
              className="w-full pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Prescriptions</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="expired">Expired</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription List</CardTitle>
                <CardDescription>View and manage all prescriptions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="col-span-2">Medication</div>
                    <div className="hidden md:block">Date</div>
                    <div className="hidden md:block">Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPrescriptions.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No prescriptions found</div>
                    ) : (
                      filteredPrescriptions.map((prescription) => (
                        <div key={prescription.id} className="grid grid-cols-7 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder-user-${prescription.patientId.slice(-1)}.jpg`}
                                alt={prescription.patientName}
                              />
                              <AvatarFallback>{prescription.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{prescription.patientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {prescription.patientId}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{prescription.medication}</div>
                            <div className="text-sm text-muted-foreground">
                              {prescription.dosage}, {prescription.frequency}
                            </div>
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {prescription.date}
                            </div>
                            <div className="text-xs text-muted-foreground">Expires: {prescription.expiryDate}</div>
                          </div>
                          <div className="hidden md:block">
                            <Badge
                              variant="outline"
                              className={
                                prescription.status === "active"
                                  ? "bg-green-50 text-green-700 border-green-200"
                                  : "bg-red-50 text-red-700 border-red-200"
                              }
                            >
                              {prescription.status === "active" ? "Active" : "Expired"}
                            </Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewPrescription(prescription)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon" asChild title="Edit Prescription">
                              <Link href={`/dashboard/doctor/prescription/edit/${prescription.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePrescription(prescription)}
                              title="Delete Prescription"
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

          <TabsContent value="active" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Active Prescriptions</CardTitle>
                <CardDescription>Currently active prescriptions for patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="col-span-2">Medication</div>
                    <div className="hidden md:block">Date</div>
                    <div className="hidden md:block">Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPrescriptions.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No active prescriptions found</div>
                    ) : (
                      filteredPrescriptions.map((prescription) => (
                        <div key={prescription.id} className="grid grid-cols-7 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder-user-${prescription.patientId.slice(-1)}.jpg`}
                                alt={prescription.patientName}
                              />
                              <AvatarFallback>{prescription.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{prescription.patientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {prescription.patientId}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{prescription.medication}</div>
                            <div className="text-sm text-muted-foreground">
                              {prescription.dosage}, {prescription.frequency}
                            </div>
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {prescription.date}
                            </div>
                            <div className="text-xs text-muted-foreground">Expires: {prescription.expiryDate}</div>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Active
                            </Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewPrescription(prescription)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="ghost" size="icon" asChild title="Edit Prescription">
                              <Link href={`/dashboard/doctor/prescription/edit/${prescription.id}`}>
                                <Edit className="h-4 w-4" />
                                <span className="sr-only">Edit</span>
                              </Link>
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleDeletePrescription(prescription)}
                              title="Delete Prescription"
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

          <TabsContent value="expired" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Expired Prescriptions</CardTitle>
                <CardDescription>Prescriptions that have passed their expiry date</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-7 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="col-span-2">Medication</div>
                    <div className="hidden md:block">Date</div>
                    <div className="hidden md:block">Status</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPrescriptions.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No expired prescriptions found</div>
                    ) : (
                      filteredPrescriptions.map((prescription) => (
                        <div key={prescription.id} className="grid grid-cols-7 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage
                                src={`/placeholder-user-${prescription.patientId.slice(-1)}.jpg`}
                                alt={prescription.patientName}
                              />
                              <AvatarFallback>{prescription.patientName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{prescription.patientName}</div>
                              <div className="text-sm text-muted-foreground">ID: {prescription.patientId}</div>
                            </div>
                          </div>
                          <div className="col-span-2">
                            <div className="font-medium">{prescription.medication}</div>
                            <div className="text-sm text-muted-foreground">
                              {prescription.dosage}, {prescription.frequency}
                            </div>
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {prescription.date}
                            </div>
                            <div className="text-xs text-muted-foreground">Expired: {prescription.expiryDate}</div>
                          </div>
                          <div className="hidden md:block">
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Expired
                            </Badge>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewPrescription(prescription)}
                              title="View Details"
                            >
                              <Eye className="h-4 w-4" />
                              <span className="sr-only">View</span>
                            </Button>
                            <Button variant="outline" size="sm">
                              Renew
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

      {/* View Prescription Dialog */}
      {selectedPrescription && (
        <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Prescription Details</DialogTitle>
              <DialogDescription>
                Prescription for {selectedPrescription.patientName} ({selectedPrescription.patientId})
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Medication:</div>
                <div className="col-span-2">{selectedPrescription.medication}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Dosage:</div>
                <div className="col-span-2">{selectedPrescription.dosage}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Frequency:</div>
                <div className="col-span-2">{selectedPrescription.frequency}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Prescribed:</div>
                <div className="col-span-2">{selectedPrescription.date}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Expires:</div>
                <div className="col-span-2">{selectedPrescription.expiryDate}</div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <div className="font-medium">Status:</div>
                <div className="col-span-2">
                  <Badge
                    variant="outline"
                    className={
                      selectedPrescription.status === "active"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {selectedPrescription.status === "active" ? "Active" : "Expired"}
                  </Badge>
                </div>
              </div>
              <div className="grid grid-cols-3 items-start gap-4">
                <div className="font-medium">Instructions:</div>
                <div className="col-span-2">{selectedPrescription.details}</div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
                Close
              </Button>
              <Button asChild>
                <Link href={`/dashboard/doctor/prescription/edit/${selectedPrescription.id}`}>Edit Prescription</Link>
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      {selectedPrescription && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this prescription? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p>
                <span className="font-medium">{selectedPrescription.medication}</span> ({selectedPrescription.dosage},{" "}
                {selectedPrescription.frequency}) for patient{" "}
                <span className="font-medium">{selectedPrescription.patientName}</span>
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={confirmDelete}>
                Delete Prescription
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </DashboardLayout>
  )
}
