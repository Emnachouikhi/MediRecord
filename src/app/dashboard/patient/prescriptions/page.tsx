"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Search, Eye } from "lucide-react"
import PDFViewerModal from "@/components/pdf-viewer-modal"
import { useToast } from "@/hooks/use-toast"

// Mock data for prescriptions
const mockPrescriptions = [
  {
    id: "presc-001",
    title: "Lisinopril 10mg",
    date: "April 10, 2023",
    doctor: "Dr. Sarah Johnson",
    status: "active",
    details: "Take one tablet by mouth once daily. Take with or without food.",
    expiryDate: "October 10, 2023",
    pdfUrl: "/sample-pdfs/prescription-lisinopril.pdf",
  },
  {
    id: "presc-002",
    title: "Metformin 500mg",
    date: "March 15, 2023",
    doctor: "Dr. Michael Chen",
    status: "active",
    details: "Take one tablet by mouth twice daily with meals.",
    expiryDate: "September 15, 2023",
    pdfUrl: "/sample-pdfs/prescription-metformin.pdf",
  },
  {
    id: "presc-003",
    title: "Atorvastatin 20mg",
    date: "February 20, 2023",
    doctor: "Dr. Sarah Johnson",
    status: "active",
    details: "Take one tablet by mouth once daily at bedtime.",
    expiryDate: "August 20, 2023",
    pdfUrl: "/sample-pdfs/prescription-atorvastatin.pdf",
  },
  {
    id: "presc-004",
    title: "Amoxicillin 500mg",
    date: "December 15, 2022",
    doctor: "Dr. Sarah Johnson",
    status: "completed",
    details: "Take one capsule by mouth three times daily for 10 days.",
    expiryDate: "December 25, 2022",
    pdfUrl: "/sample-pdfs/prescription-amoxicillin.pdf",
  },
  {
    id: "presc-005",
    title: "Prednisone 10mg",
    date: "November 10, 2022",
    doctor: "Dr. Michael Chen",
    status: "completed",
    details: "Take one tablet by mouth once daily for 7 days.",
    expiryDate: "November 17, 2022",
    pdfUrl: "/sample-pdfs/prescription-prednisone.pdf",
  },
  {
    id: "presc-006",
    title: "Ibuprofen 600mg",
    date: "October 5, 2022",
    doctor: "Dr. Emily Rodriguez",
    status: "completed",
    details: "Take one tablet by mouth every 6 hours as needed for pain.",
    expiryDate: "January 5, 2023",
    pdfUrl: "/sample-pdfs/prescription-ibuprofen.pdf",
  },

]

export default function PatientPrescriptions() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPrescription, setSelectedPrescription] = useState<any>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  // Filter prescriptions by search query
  const filteredPrescriptions = mockPrescriptions.filter((prescription) => {
    if (!searchQuery) return true
    return (
      prescription.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prescription.doctor.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  const handleViewPrescription = (prescription: any) => {
    setSelectedPrescription(prescription)
    setIsViewerOpen(true)
  }

  const handleDownloadPrescription = (prescription: any) => {
    // In a real app, this would trigger a download of the actual PDF
    toast({
      title: "Download Started",
      description: `${prescription.title} prescription is being downloaded.`,
    })

    // Simulate download by creating a link and clicking it
    const link = document.createElement("a")
    link.href = prescription.pdfUrl
    link.download = `${prescription.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleDownloadAll = () => {
    toast({
      title: "Bulk Download Started",
      description: "All your prescriptions are being prepared for download.",
    })

    // In a real app, this would trigger a download of all prescriptions as a zip file
    setTimeout(() => {
      toast({
        title: "Download Complete",
        description: "Your prescriptions have been downloaded.",
      })
    }, 2000)
  }

  return (
    <DashboardLayout role="patient" userName="John Doe">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Prescriptions</h1>
            <p className="text-muted-foreground">View and download your medication prescriptions</p>
          </div>
        
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search prescriptions by name or doctor..."
              className="w-full pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Prescriptions</CardTitle>
            <CardDescription>All your medication prescriptions</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {filteredPrescriptions.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No prescriptions found. Try adjusting your search.
              </div>
            ) : (
              filteredPrescriptions.map((prescription) => (
                <div key={prescription.id} className="flex items-center justify-between border-b pb-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{prescription.title}</p>
                      <Badge
                        variant="outline"
                        className={
                          prescription.status === "active"
                            ? "bg-green-50 text-green-700 border-green-200"
                            : "bg-gray-50 text-gray-700 border-gray-200"
                        }
                      >
                        {prescription.status === "active" ? "Active" : "Completed"}
                      </Badge>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>Prescribed: {prescription.date}</span>
                      {prescription.status === "active" && (
                        <>
                          <span className="mx-1">•</span>
                          <span>Expires: {prescription.expiryDate}</span>
                        </>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">Prescribed by: {prescription.doctor}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" onClick={() => handleViewPrescription(prescription)}>
                      <Eye className="mr-1 h-4 w-4" />
                      View
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => handleDownloadPrescription(prescription)}>
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </div>
              ))
            )}
          </CardContent>
        </Card>
      </div>

      {selectedPrescription && (
        <PDFViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          pdfUrl={selectedPrescription.pdfUrl}
          title={selectedPrescription.title}
          description={`Prescribed: ${selectedPrescription.date} • ${selectedPrescription.doctor}`}
        />
      )}
    </DashboardLayout>
  )
}
