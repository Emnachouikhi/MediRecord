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
import { Search, Calendar, Filter, UserPlus } from "lucide-react"
import Link from "next/link"

// Mock patient data
const mockPatients = [
  {
    id: "1001",
    name: "John Doe",
    age: 42,
    gender: "Male",
    bloodType: "O+",
    lastVisit: "April 10, 2023",
    status: "active",
    conditions: ["Hypertension", "Type 2 Diabetes"],
  },
  {
    id: "1002",
    name: "Jane Smith",
    age: 35,
    gender: "Female",
    bloodType: "A-",
    lastVisit: "April 15, 2023",
    status: "active",
    conditions: ["Asthma"],
  },
  {
    id: "1003",
    name: "Robert Johnson",
    age: 58,
    gender: "Male",
    bloodType: "B+",
    lastVisit: "April 8, 2023",
    status: "active",
    conditions: ["Coronary Artery Disease", "Hyperlipidemia"],
  },
  {
    id: "1004",
    name: "Emily Davis",
    age: 29,
    gender: "Female",
    bloodType: "AB+",
    lastVisit: "April 12, 2023",
    status: "active",
    conditions: ["Migraine"],
  },
  {
    id: "1005",
    name: "Michael Brown",
    age: 47,
    gender: "Male",
    bloodType: "O-",
    lastVisit: "April 5, 2023",
    status: "active",
    conditions: ["GERD", "Anxiety"],
  },
  {
    id: "1006",
    name: "Sarah Wilson",
    age: 62,
    gender: "Female",
    bloodType: "A+",
    lastVisit: "March 28, 2023",
    status: "active",
    conditions: ["Osteoarthritis", "Hypertension"],
  },
  {
    id: "1007",
    name: "David Martinez",
    age: 51,
    gender: "Male",
    bloodType: "B-",
    lastVisit: "March 30, 2023",
    status: "inactive",
    conditions: ["Type 2 Diabetes"],
  },
  {
    id: "1008",
    name: "Lisa Anderson",
    age: 33,
    gender: "Female",
    bloodType: "O+",
    lastVisit: "February 15, 2023",
    status: "inactive",
    conditions: ["Hypothyroidism"],
  },
  {
    id: "1009",
    name: "James Taylor",
    age: 40,
    gender: "Male",
    bloodType: "A+",
    lastVisit: "March 20, 2023",
    status: "active",
    conditions: ["Depression", "Insomnia"],
  },
  {
    id: "1010",
    name: "Patricia Thomas",
    age: 55,
    gender: "Female",
    bloodType: "AB-",
    lastVisit: "April 2, 2023",
    status: "active",
    conditions: ["Rheumatoid Arthritis"],
  },
]

export default function DoctorPatients() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter patients based on search query and active tab
  const filteredPatients = mockPatients.filter((patient) => {
    const matchesSearch =
      patient.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      patient.id.includes(searchQuery) ||
      patient.conditions.some((condition) => condition.toLowerCase().includes(searchQuery.toLowerCase()))

    if (activeTab === "all") return matchesSearch
    if (activeTab === "active") return matchesSearch && patient.status === "active"
    if (activeTab === "inactive") return matchesSearch && patient.status === "inactive"

    return matchesSearch
  })

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Johnson">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Patients</h1>
            <p className="text-muted-foreground">Manage and view your patient records</p>
          </div>
          <div className="flex gap-2">
           
            <Button>
              <UserPlus className="mr-2 h-4 w-4" />
              Add New Patient
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search patients by name, ID, or condition..."
              className="w-full pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4" onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All Patients</TabsTrigger>
            <TabsTrigger value="active">Active Patients</TabsTrigger>
            <TabsTrigger value="inactive">Inactive Patients</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Patient List</CardTitle>
                <CardDescription>View and manage all your patients</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="hidden md:block">Age/Gender</div>
                    <div className="hidden md:block">Last Visit</div>
                    <div className="hidden md:block">Conditions</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPatients.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No patients found</div>
                    ) : (
                      filteredPatients.map((patient) => (
                        <div key={patient.id} className="grid grid-cols-6 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder-user-${patient.id.slice(-1)}.jpg`} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-muted-foreground">ID: {patient.id}</div>
                            </div>
                          </div>
                          <div className="hidden md:block text-sm">
                            {patient.age} years • {patient.gender} • {patient.bloodType}
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {patient.lastVisit}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div className="flex flex-wrap gap-1">
                              {patient.conditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/doctor/patient/${patient.id}`}>View Details</Link>
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
                <CardTitle>Active Patients</CardTitle>
                <CardDescription>Patients with recent activity or ongoing treatment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="hidden md:block">Age/Gender</div>
                    <div className="hidden md:block">Last Visit</div>
                    <div className="hidden md:block">Conditions</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPatients.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No active patients found</div>
                    ) : (
                      filteredPatients.map((patient) => (
                        <div key={patient.id} className="grid grid-cols-6 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder-user-${patient.id.slice(-1)}.jpg`} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-muted-foreground">ID: {patient.id}</div>
                            </div>
                          </div>
                          <div className="hidden md:block text-sm">
                            {patient.age} years • {patient.gender} • {patient.bloodType}
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {patient.lastVisit}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div className="flex flex-wrap gap-1">
                              {patient.conditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/doctor/patient/${patient.id}`}>View Details</Link>
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

          <TabsContent value="inactive" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Inactive Patients</CardTitle>
                <CardDescription>Patients without recent visits or activity</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 bg-muted p-4 font-medium">
                    <div className="col-span-2">Patient</div>
                    <div className="hidden md:block">Age/Gender</div>
                    <div className="hidden md:block">Last Visit</div>
                    <div className="hidden md:block">Conditions</div>
                    <div className="text-right">Actions</div>
                  </div>
                  <div className="divide-y">
                    {filteredPatients.length === 0 ? (
                      <div className="p-4 text-center text-muted-foreground">No inactive patients found</div>
                    ) : (
                      filteredPatients.map((patient) => (
                        <div key={patient.id} className="grid grid-cols-6 items-center p-4">
                          <div className="col-span-2 flex items-center gap-3">
                            <Avatar>
                              <AvatarImage src={`/placeholder-user-${patient.id.slice(-1)}.jpg`} alt={patient.name} />
                              <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{patient.name}</div>
                              <div className="text-sm text-muted-foreground">ID: {patient.id}</div>
                            </div>
                          </div>
                          <div className="hidden md:block text-sm">
                            {patient.age} years • {patient.gender} • {patient.bloodType}
                          </div>
                          <div className="hidden md:block text-sm">
                            <div className="flex items-center">
                              <Calendar className="mr-1 h-3 w-3 text-muted-foreground" />
                              {patient.lastVisit}
                            </div>
                          </div>
                          <div className="hidden md:block">
                            <div className="flex flex-wrap gap-1">
                              {patient.conditions.map((condition, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {condition}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link href={`/dashboard/doctor/patient/${patient.id}`}>View Details</Link>
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
    </DashboardLayout>
  )
}
