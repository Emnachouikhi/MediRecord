"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, Calendar, Users, Search, QrCode, Plus, UserSearch, Activity, Pill, User } from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import ExportButton from "@/components/patient-data-export/export-button"
import { AnimatedCounter } from "../patient/animate_counte"
import NewPrescription from "./prescription/new/page"

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
        {/* header section */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-100 rounded-2xl p-6 md:p-10 shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left section: Text */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900"> Welcome back, Dr. Johnson </h1>
              <p className="text-blue-800 text-sm mt-2">Here's an overview of your patients records.</p>
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



        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">


          <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-green-900">Total Patients</CardTitle>
              <Users className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={248} colorClass="text-green-800" />
              <p className="text-sm text-green-700 mt-1">+12 this month</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-purple-900">Pending Reports</CardTitle>
              <FileText className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={5} colorClass="text-purple-800" />
              <p className="text-sm text-purple-700 mt-1">Requires your attention</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-cyan-900">Recent Prescriptions</CardTitle>
              <FileText className="h-5 w-5 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={24} colorClass="text-cyan-800" />
              <p className="text-sm text-cyan-700 mt-1">In the last 7 days</p>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="patients" className="space-y-6">
          <TabsList className="flex space-x-2 bg-white shadow-sm rounded-xl p-2">
            <TabsTrigger value="patients">Recent Patients</TabsTrigger>
            <TabsTrigger value="appointments">Today's Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Recent Prescriptions</TabsTrigger>
          </TabsList>

          <TabsContent value="patients">
            <Card>
              <CardHeader>
                <CardTitle>Recent Patients</CardTitle>
                <CardDescription>Patients you've recently attended to</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-muted-foreground">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center py-4">
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
                <div className="text-center mt-4">
                  <Link href="/dashboard/doctor/patients">
                    <Button variant="link">View All Patients</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Today's Appointments</CardTitle>
                <CardDescription>Your scheduled appointments for today</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-muted-foreground">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center py-4">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={`/placeholder-user-${i}.jpg`} alt="Patient" />
                        <AvatarFallback>P{i}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">Patient Name {i}</p>
                        <p className="text-sm text-muted-foreground">{i + 9}:00 AM - {i === 2 ? "Follow-up" : "Consultation"}</p>
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
                <div className="text-center mt-4">
                  <Link href="/dashboard/doctor/appointments">
                    <Button variant="link">View All Appointments</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescriptions">
            <Card>
              <CardHeader>
                <CardTitle>Recent Prescriptions</CardTitle>
                <CardDescription>Prescriptions you've recently issued</CardDescription>
              </CardHeader>
              <CardContent className="divide-y divide-muted-foreground">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex justify-between items-center py-4">
                    <div>
                      <p className="font-medium">Patient Name {i}</p>
                      <p className="text-sm">Medication {i} - 10mg, Once daily</p>
                      <p className="text-sm text-muted-foreground">Issued: April {i + 10}, 2023</p>
                    </div>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                ))}
                <div className="text-center mt-4">
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
      {searchModalOpen && <PatientSearchModal isOpen={searchModalOpen} onClose={() => setSearchModalOpen(false)} userRole="doctor" />}
    </DashboardLayout>
  )
}
