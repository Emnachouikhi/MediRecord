import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Download, Calendar, Activity, Pill, Stethoscope, CalendarCheck } from "lucide-react"
import Link from "next/link"
import { AnimatedCounter } from "./animate_counte"
import ExportButton from "@/components/patient-data-export/export-button"

export default function PatientDashboard() {
  return (
    <DashboardLayout role="patient" userName="John Doe">
      <div className="flex flex-col gap-6 bg-blue-50 min-h-screen p-4">
        {/* header section */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-100 rounded-2xl p-6 md:p-10 shadow-md mb-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Left section: Text */}
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-blue-900">Welcome back, John </h1>
              <p className="text-blue-800 text-sm mt-2">Here's an overview of your medical records.</p>
              <div className="mt-4 flex flex-col sm:flex-row gap-3">
                <ExportButton
                  patientId="P-1001"
                  variant="outline"
                  className="bg-white text-blue-700 border border-blue-700 hover:bg-blue-100 transition rounded-full"
                />
              </div>
            </div>

            {/* Right section: Illustration */}
            <div className="w-full md:w-1/3">
              <img
                src="/welcome.svg"
                alt="Patient Illustration"
                className="w-full h-auto"
              />
            </div>
          </div>
        </div>

        {/* Cards */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        

          <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-green-900">Active Prescriptions</CardTitle>
              <Pill className="h-5 w-5 text-green-600" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={3} colorClass="text-green-800" />
              <p className="text-sm text-green-700 mt-1">Last updated: 2 days ago</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-purple-900">Recent Test Results</CardTitle>
              <Activity className="h-5 w-5 text-purple-600" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={5} colorClass="text-purple-800" />
              <p className="text-sm text-purple-700 mt-1">Last result: April 10, 2023</p>
            </CardContent>
          </Card>

          <Card className="rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-base font-semibold text-cyan-900">Medical Documents</CardTitle>
              <FileText className="h-5 w-5 text-cyan-600" />
            </CardHeader>
            <CardContent>
              <AnimatedCounter value={12} colorClass="text-cyan-800" />
              <p className="text-sm text-cyan-700 mt-1">Including certificates & reports</p>
            </CardContent>
          </Card>
        </div>
        {/* tabs */}
        <Tabs defaultValue="records" className="space-y-6">
          <TabsList className="flex w-full justify-around bg-muted p-1 rounded-xl shadow-sm">
            <TabsTrigger
              value="records"
              className="w-full flex items-center justify-center gap-2 rounded-lg py-2 font-medium transition-all data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              <FileText className="h-4 w-4" />
              Medical Records
            </TabsTrigger>
            <TabsTrigger
              value="prescriptions"
              className="w-full flex items-center justify-center gap-2 rounded-lg py-2 font-medium transition-all data-[state=active]:bg-blue-700 data-[state=active]:text-white"
            >
              <Stethoscope className="h-4 w-4" />
              Prescriptions
            </TabsTrigger>
            
          </TabsList>

          {/* Medical Records */}
          <TabsContent value="records">
            <Card className="shadow-md rounded-xl">
              <CardHeader className="bg-blue-50   px-6 py-4">
                <CardTitle className="text-xl font-semibold">Recent Medical Records</CardTitle>
                <CardDescription>View and download your recent medical records</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-none">
                    <div className="space-y-1">
                      <p className="font-semibold text-base">General Check-up Report</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                        <span>April {i + 9}, 2023</span>
                      </div>
                      <p className="text-sm text-muted-foreground">Dr. Sarah Johnson</p>
                    </div>
                    
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Link href="/dashboard/patient/records">
                    <Button variant="link" className="text-primary font-medium">View All Records</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Prescriptions */}
          <TabsContent value="prescriptions">
            <Card className="shadow-md rounded-xl">
              <CardHeader className="bg-blue-50   px-6 py-4">        <CardTitle className="text-xl font-semibold">Active Prescriptions</CardTitle>
                <CardDescription>Your current medication prescriptions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6 px-6 py-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4 last:border-none">
                    <div className="space-y-1">
                      <p className="font-semibold text-base">Medication {i}</p>
                      <p className="text-sm text-muted-foreground">10mg, Once daily</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Valid until: May {i + 14}, 2023</span>
                      </div>
                    </div>
                  
                  </div>
                ))}
                <div className="text-center pt-2">
                  <Link href="/dashboard/patient/prescriptions">
                    <Button variant="link" className="text-primary font-medium">View All Prescriptions</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

         
        </Tabs>

      </div>
    </DashboardLayout>
  )
}
