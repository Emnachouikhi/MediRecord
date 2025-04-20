"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Calendar, Users, Search, QrCode, Plus, UserSearch } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"

// Dynamically import the QR scanner to avoid SSR issues
const QRScannerModal = dynamic(() => import("@/components/qr-scanner-modal"), {
  ssr: false,
})

// Dynamically import the patient search modal
const PatientSearchModal = dynamic(() => import("@/components/patient-search-modal"), {
  ssr: false,
})

export default function DoctorDashboard() {
  const [qrScannerOpen, setQrScannerOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Johnson">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Doctor Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back, Dr. Johnson. Here's an overview of your patients and appointments.
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => setQrScannerOpen(true)}>
              <QrCode className="mr-2 h-4 w-4" />
              Scan QR Code
            </Button>
            <Button variant="outline" onClick={() => setSearchModalOpen(true)}>
              <UserSearch className="mr-2 h-4 w-4" />
              Find Patient
            </Button>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              New Prescription
            </Button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Today's Appointments</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Next: 10:30 AM - John Doe</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">248</div>
              <p className="text-xs text-muted-foreground">+12 this month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Reports</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">Requires your attention</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Prescriptions</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">In the last 7 days</p>
            </CardContent>
          </Card>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search patients..." className="w-full pl-8 bg-white" />
          </div>
        </div>

        <Tabs defaultValue="patients" className="space-y-4">
          <TabsList>
            <TabsTrigger value="patients">Recent Patients</TabsTrigger>
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Recent Prescriptions</TabsTrigger>
          </TabsList>
          <TabsContent value="patients" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Patients you've recently attended to</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder-user-${i}.jpg`} alt="Patient" />
                        <AvatarFallback>P{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Patient Name {i}</p>
                        <p className="text-sm text-muted-foreground">Last visit: April {i + 10}, 2023</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/doctor/patient/${i}`}>View Records</Link>
                    </Button>
                  </div>
                ))}
                <div className="text-center">
                  <Link href="/dashboard/doctor/patients">
                    <Button variant="link">View All Patients</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="appointments" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Your scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder-user-${i}.jpg`} alt="Patient" />
                        <AvatarFallback>P{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Patient Name {i}</p>
                        <p className="text-sm text-muted-foreground">
                          {i + 9}:00 AM - {i === 2 ? "Follow-up" : "Consultation"}
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/doctor/patient/${i}`}>View Records</Link>
                      </Button>
                      <Button size="sm">Start Session</Button>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <Link href="/dashboard/doctor/appointments">
                    <Button variant="link">View All Appointments</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="prescriptions" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Recent Prescriptions</CardTitle>
                <CardDescription>Prescriptions you've recently issued</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div>
                      <p className="font-medium">Patient Name {i}</p>
                      <p className="text-sm">Medication {i} - 10mg, Once daily</p>
                      <p className="text-sm text-muted-foreground">Issued: April {i + 10}, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Details
                    </Button>
                  </div>
                ))}
                <div className="text-center">
                  <Link href="/dashboard/doctor/prescriptions">
                    <Button variant="link">View All Prescriptions</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {qrScannerOpen && <QRScannerModal isOpen={qrScannerOpen} onClose={() => setQrScannerOpen(false)} />}
      {searchModalOpen && (
        <PatientSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} userRole="doctor" />
      )}
    </DashboardLayout>
  )
}
