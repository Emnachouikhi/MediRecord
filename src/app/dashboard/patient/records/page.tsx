"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Download, Calendar, Search, Eye } from "lucide-react"
import PDFViewerModal from "@/components/pdf-viewer-modal"
import { useToast } from "@/hooks/use-toast"

// Mock data for medical records
const mockRecords = {
  all: [
    {
      id: "rec-001",
      title: "General Check-up Report",
      date: "April 15, 2023",
      doctor: "Dr. Sarah Johnson",
      type: "consultation",
      pdfUrl: "/sample-pdfs/general-checkup.pdf",
    },
    {
      id: "rec-002",
      title: "Blood Test Results",
      date: "April 10, 2023",
      doctor: "Dr. Michael Chen",
      type: "test",
      pdfUrl: "/sample-pdfs/blood-test.pdf",
    },
    {
      id: "rec-003",
      title: "Cardiology Consultation",
      date: "March 25, 2023",
      doctor: "Dr. Emily Rodriguez",
      type: "consultation",
      pdfUrl: "/sample-pdfs/cardiology.pdf",
    },
    {
      id: "rec-004",
      title: "Chest X-Ray Results",
      date: "March 15, 2023",
      doctor: "Dr. Sarah Johnson",
      type: "imaging",
      pdfUrl: "/sample-pdfs/chest-xray.pdf",
    },
    {
      id: "rec-005",
      title: "Lipid Panel Results",
      date: "February 28, 2023",
      doctor: "Dr. Michael Chen",
      type: "test",
      pdfUrl: "/sample-pdfs/lipid-panel.pdf",
    },
    {
      id: "rec-006",
      title: "MRI - Right Knee",
      date: "February 10, 2023",
      doctor: "Dr. Emily Rodriguez",
      type: "imaging",
      pdfUrl: "/sample-pdfs/knee-mri.pdf",
    },
    {
      id: "rec-007",
      title: "Follow-up Consultation",
      date: "January 20, 2023",
      doctor: "Dr. Sarah Johnson",
      type: "consultation",
      pdfUrl: "/sample-pdfs/followup.pdf",
    },
    {
      id: "rec-008",
      title: "Comprehensive Metabolic Panel",
      date: "January 15, 2023",
      doctor: "Dr. Michael Chen",
      type: "test",
      pdfUrl: "/sample-pdfs/metabolic-panel.pdf",
    },
    {
      id: "rec-009",
      title: "Abdominal Ultrasound",
      date: "December 10, 2022",
      doctor: "Dr. Emily Rodriguez",
      type: "imaging",
      pdfUrl: "/sample-pdfs/abdominal-ultrasound.pdf",
    },
    {
      id: "rec-010",
      title: "Annual Physical Examination",
      date: "December 5, 2022",
      doctor: "Dr. Sarah Johnson",
      type: "consultation",
      pdfUrl: "/sample-pdfs/annual-physical.pdf",
    },
  ],
}

export default function PatientRecords() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRecord, setSelectedRecord] = useState<any>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  // Filter records by type
  const getRecordsByType = (type: string) => {
    return mockRecords.all
      .filter((record) => {
        if (type === "all") return true
        return record.type === type
      })
      .filter((record) => {
        if (!searchQuery) return true
        return (
          record.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          record.doctor.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })
  }

  const handleViewRecord = (record: any) => {
    setSelectedRecord(record)
    setIsViewerOpen(true)
  }

  const handleDownloadRecord = (record: any) => {
    // In a real app, this would trigger a download of the actual PDF
    // For this demo, we'll just show a toast notification
    toast({
      title: "Download Started",
      description: `${record.title} is being downloaded.`,
    })

    // Simulate download by creating a link and clicking it
    const link = document.createElement("a")
    link.href = record.pdfUrl
    link.download = `${record.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAll = () => {
    toast({
      title: "Bulk Download Started",
      description: "All your medical records are being prepared for download.",
    })

    // In a real app, this would trigger a download of all records as a zip file
    // For this demo, we'll just show a toast notification
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your medical records have been downloaded.",
      })
    }, 2000)
  }

  return (
    <DashboardLayout role="patient" userName="John Doe">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medical Records</h1>
            <p className="text-muted-foreground">View and download your complete medical history</p>
          </div>
       
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search records..."
              className="w-full pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Records</TabsTrigger>
            <TabsTrigger value="consultation">Consultations</TabsTrigger>
            <TabsTrigger value="test">Test Results</TabsTrigger>
            <TabsTrigger value="imaging">Imaging</TabsTrigger>
          </TabsList>

          {["all", "consultation", "test", "imaging"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {tabValue === "all"
                      ? "Complete Medical Records"
                      : tabValue === "consultation"
                        ? "Consultation Records"
                        : tabValue === "test"
                          ? "Laboratory Test Results"
                          : "Medical Imaging"}
                  </CardTitle>
                  <CardDescription>
                    {tabValue === "all"
                      ? "All your medical documentation in chronological order"
                      : tabValue === "consultation"
                        ? "Records from your doctor visits and consultations"
                        : tabValue === "test"
                          ? "Results from your laboratory tests and analyses"
                          : "X-rays, MRIs, and other imaging results"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getRecordsByType(tabValue).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No records found. Try adjusting your search.
                    </div>
                  ) : (
                    getRecordsByType(tabValue).map((record) => (
                      <div key={record.id} className="flex items-center justify-between border-b pb-4">
                        <div className="space-y-1">
                          <p className="font-medium">{record.title}</p>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>{record.date}</span>
                          </div>
                          <p className="text-sm text-muted-foreground">{record.doctor}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewRecord(record)}>
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadRecord(record)}>
                            <Download className="h-4 w-4" />
                            <span className="sr-only">Download</span>
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {selectedRecord && (
        <PDFViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          pdfUrl={selectedRecord.pdfUrl}
          title={selectedRecord.title}
          description={`${selectedRecord.date} • ${selectedRecord.doctor}`}
        />
      )}
    </DashboardLayout>
  )
}
