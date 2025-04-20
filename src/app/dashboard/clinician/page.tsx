"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Calendar, Users, Search, Upload, QrCode, UserSearch } from "lucide-react"
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

export default function ClinicianDashboard() {
  const [qrScannerOpen, setQrScannerOpen] = useState(false)
  const [searchModalOpen, setSearchModalOpen] = useState(false)

  return (
    <DashboardLayout role="clinician" userName="Lab Technician">
      <div className="flex flex-col gap-6">
      
 {/* header section */}
 <div className="bg-gradient-to-r from-blue-400 to-blue-100 rounded-2xl p-6 md:p-10 shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left section: Text */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900"> Welcome back,</h1>
              <p className="text-blue-800 text-sm mt-2"> Welcome back. Here's an overview of your test results.</p>
              <div className="flex flex-wrap gap-3 mt-4">
                {/* Scan QR */}
                <Button
                  variant="secondary"
                  className="px-5 py-2 text-sm font-medium text-blue-700 border border-blue-300 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                  onClick={() => setQrScannerOpen(true)}
                >
                  <QrCode className="mr-2 h-5 w-5" />
                  Scan QR Code
                </Button>

                {/* Find Patient */}
                <Button
                  variant="secondary"
                  className="px-5 py-2 text-sm font-medium text-blue-700 border border-blue-300 bg-white hover:bg-blue-50 hover:shadow-md transition-all duration-200"
                  onClick={() => setSearchModalOpen(true)}
                >
                  <UserSearch className="mr-2 h-5 w-5" />
                  Find Patient
                </Button>

            
              </div>

            </div>

            {/* Right section: Illustration */}
            <div className="w-full md:w-1/3">
              <img
                src="/doctor.svg"
                alt="Patient Illustration"
                className="w-80 h-80"
              />
            </div>
          </div>
        </div>
        {/* Rest of the component remains the same */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">Awaiting processing</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">Results uploaded</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">156</div>
              <p className="text-xs text-muted-foreground">In database</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Scheduled Tests</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">For the next 7 days</p>
            </CardContent>
          </Card>
        </div>

      

        <Tabs defaultValue="pending" className="space-y-4">
          {/* Tab content remains the same */}
          <TabsList>
            <TabsTrigger value="pending">Pending Tests</TabsTrigger>
            <TabsTrigger value="completed">Completed Tests</TabsTrigger>
            <TabsTrigger value="scheduled">Scheduled Tests</TabsTrigger>
          </TabsList>

          {/* Content for tabs remains the same */}
          <TabsContent value="pending" className="space-y-4">
            {/* Content remains the same */}
            <Card>
              <CardHeader>
                <CardTitle>Pending Test Results</CardTitle>
                <CardDescription>Tests awaiting processing and result upload</CardDescription>
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
                        <p className="text-sm">Test ID: LAB-{1000 + i}</p>
                        <p className="text-sm text-muted-foreground">
                          {i % 2 === 0 ? "Blood Work" : "Urinalysis"} - Requested: April {i + 10}, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" asChild>
                        <Link href={`/dashboard/clinician/patient/${i}`}>View Patient</Link>
                      </Button>
                      <Button size="sm">Upload Results</Button>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <Link href="/dashboard/clinician/results">
                    <Button variant="link">View All Pending Tests</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="completed" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Completed Test Results</CardTitle>
                <CardDescription>Recently completed and uploaded test results</CardDescription>
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
                        <p className="text-sm">Test ID: LAB-{900 + i}</p>
                        <p className="text-sm text-muted-foreground">
                          {i % 3 === 0 ? "Blood Work" : i % 3 === 1 ? "Urinalysis" : "Cholesterol"} - Completed: April{" "}
                          {i + 8}, 2023
                        </p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
                <div className="text-center">
                  <Link href="/dashboard/clinician/results">
                    <Button variant="link">View All Completed Tests</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="scheduled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Scheduled Tests</CardTitle>
                <CardDescription>Upcoming tests scheduled for patients</CardDescription>
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
                        <p className="text-sm">
                          {i % 3 === 0 ? "Blood Work" : i % 3 === 1 ? "Urinalysis" : "Cholesterol"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Scheduled: April {i + 15}, 2023 - {9 + i}:00 AM
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/clinician/patient/${i}`}>View Patient</Link>
                    </Button>
                  </div>
                ))}
                <div className="text-center">
                  <Link href="/dashboard/clinician/results">
                    <Button variant="link">View All Scheduled Tests</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {qrScannerOpen && <QRScannerModal isOpen={qrScannerOpen} onClose={() => setQrScannerOpen(false)} />}
      {searchModalOpen && (
        <PatientSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} userRole="clinician" />
      )}
    </DashboardLayout>
  )
}
