import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Download, Calendar, Search } from "lucide-react"

export default function PatientRecords() {
  return (
    <DashboardLayout role="patient" userName="John Doe">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">View and download your complete medical history</p>
          </div>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download All Records
          </Button>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search records..." className="w-full pl-8 bg-white" />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="consultations">Consultations</TabsTrigger>
            <TabsTrigger value="tests">Test Results</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Complete Medical Records</CardTitle>
                <CardDescription>All your medical documentation in chronological order</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(10)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {i % 4 === 0
                          ? "General Check-up Report"
                          : i % 4 === 1
                            ? "Blood Test Results"
                            : i % 4 === 2
                              ? "Cardiology Consultation"
                              : "Chest X-Ray Results"}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(2023, 3 - Math.floor(i / 2), 15 - i).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {i % 3 === 0 ? "Dr. Sarah Johnson" : i % 3 === 1 ? "Dr. Michael Chen" : "Dr. Emily Rodriguez"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
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
          <TabsContent value="consultations" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Consultation Records</CardTitle>
                <CardDescription>Records from your doctor visits and consultations</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {i % 3 === 0 ? "General Check-up" : i % 3 === 1 ? "Cardiology Consultation" : "Follow-up Visit"}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(2023, 3 - i, 15 - i * 2).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {i % 3 === 0 ? "Dr. Sarah Johnson" : i % 3 === 1 ? "Dr. Michael Chen" : "Dr. Emily Rodriguez"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
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
          <TabsContent value="tests" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Laboratory Test Results</CardTitle>
                <CardDescription>Results from your laboratory tests and analyses</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {i === 0
                          ? "Complete Blood Count (CBC)"
                          : i === 1
                            ? "Comprehensive Metabolic Panel"
                            : i === 2
                              ? "Lipid Panel"
                              : "HbA1c Test"}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(2023, 3 - i, 15 - i * 3).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">Central Laboratory</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Results
                      </Button>
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
          <TabsContent value="imaging" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical Imaging</CardTitle>
                <CardDescription>X-rays, MRIs, and other imaging results</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-1">
                      <p className="font-medium">
                        {i === 0 ? "Chest X-Ray" : i === 1 ? "Abdominal Ultrasound" : "MRI - Right Knee"}
                      </p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="mr-1 h-3 w-3" />
                        <span>
                          {new Date(2023, 2 - i, 10 - i * 5).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {i === 0 ? "Radiology Department" : i === 1 ? "Imaging Center" : "MRI Center"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Images
                      </Button>
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
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
