"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Download, Search, Eye, FileText, CheckCircle, Clock, AlertCircle } from "lucide-react"
import PDFViewerModal from "@/components/pdf-viewer-modal"
import { useToast } from "@/hooks/use-toast"

// Mock data for certificates
const mockCertificates = {
  medical: [
    {
      id: "cert-001",
      title: "Medical Fitness Certificate",
      date: "March 10, 2023",
      doctor: "Dr. Sarah Johnson",
      validUntil: "March 10, 2024",
      status: "valid",
      type: "fitness",
      pdfUrl: "/sample-pdfs/medical-fitness.pdf",
    },
    {
      id: "cert-002",
      title: "Vaccination Certificate - COVID-19",
      date: "January 15, 2023",
      doctor: "Dr. Michael Chen",
      validUntil: "Permanent",
      status: "valid",
      type: "vaccination",
      pdfUrl: "/sample-pdfs/vaccination.pdf",
    },
    {
      id: "cert-003",
      title: "Allergy Documentation",
      date: "February 5, 2023",
      doctor: "Dr. Emily Rodriguez",
      validUntil: "Permanent",
      status: "valid",
      type: "allergy",
      pdfUrl: "/sample-pdfs/allergy.pdf",
    },
  ],
  sickLeave: [
    {
      id: "cert-004",
      title: "Sick Leave Certificate",
      date: "April 5, 2023",
      doctor: "Dr. Sarah Johnson",
      validFrom: "April 5, 2023",
      validUntil: "April 12, 2023",
      status: "expired",
      type: "sickLeave",
      pdfUrl: "/sample-pdfs/sick-leave.pdf",
    },
    {
      id: "cert-005",
      title: "Medical Leave Extension",
      date: "February 20, 2023",
      doctor: "Dr. Michael Chen",
      validFrom: "February 20, 2023",
      validUntil: "February 28, 2023",
      status: "expired",
      type: "sickLeave",
      pdfUrl: "/sample-pdfs/leave-extension.pdf",
    },
  ],
  insurance: [
    {
      id: "cert-006",
      title: "Insurance Medical Certificate",
      date: "March 25, 2023",
      doctor: "Dr. Sarah Johnson",
      validUntil: "March 25, 2024",
      status: "valid",
      type: "insurance",
      pdfUrl: "/sample-pdfs/insurance-certificate.pdf",
    },
    {
      id: "cert-007",
      title: "Health Insurance Claim Form",
      date: "January 30, 2023",
      doctor: "Dr. Emily Rodriguez",
      validUntil: "April 30, 2023",
      status: "valid",
      type: "insurance",
      pdfUrl: "/sample-pdfs/insurance-claim.pdf",
    },
  ],
}

export default function PatientCertificates() {
  const { toast } = useToast()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCertificate, setSelectedCertificate] = useState<any>(null)
  const [isViewerOpen, setIsViewerOpen] = useState(false)

  // Filter certificates by type and search query
  const getCertificatesByType = (type: string) => {
    let certificates: any[] = []

    if (type === "all") {
      certificates = [...mockCertificates.medical, ...mockCertificates.sickLeave, ...mockCertificates.insurance]
    } else if (type === "medical") {
      certificates = mockCertificates.medical
    } else if (type === "sickLeave") {
      certificates = mockCertificates.sickLeave
    } else if (type === "insurance") {
      certificates = mockCertificates.insurance
    }

    return certificates.filter((certificate) => {
      if (!searchQuery) return true
      return (
        certificate.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        certificate.doctor.toLowerCase().includes(searchQuery.toLowerCase())
      )
    })
  }

  const handleViewCertificate = (certificate: any) => {
    setSelectedCertificate(certificate)
    setIsViewerOpen(true)
  }

  const handleDownloadCertificate = (certificate: any) => {
    // In a real app, this would trigger a download of the actual PDF
    toast({
      title: "Download Started",
      description: `${certificate.title} is being downloaded.`,
    })

    // Simulate download by creating a link and clicking it
    const link = document.createElement("a")
    link.href = certificate.pdfUrl
    link.download = `${certificate.title.replace(/\s+/g, "-").toLowerCase()}.pdf`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handleRequestCertificate = () => {
    toast({
      title: "Certificate Request Submitted",
      description: "Your request has been sent to your healthcare provider.",
    })
  }

  const getStatusBadge = (status: string) => {
    if (status === "valid") {
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          <CheckCircle className="mr-1 h-3 w-3" /> Valid
        </Badge>
      )
    } else if (status === "expired") {
      return (
        <Badge variant="outline" className="bg-red-50 text-red-800 hover:bg-red-50">
          <AlertCircle className="mr-1 h-3 w-3" /> Expired
        </Badge>
      )
    } else if (status === "pending") {
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 hover:bg-yellow-50">
          <Clock className="mr-1 h-3 w-3" /> Pending
        </Badge>
      )
    }
    return null
  }

  return (
    <DashboardLayout role="patient" userName="John Doe">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Medical Certificates</h1>
            <p className="text-muted-foreground">View and download your medical certificates and documentation</p>
          </div>
          <Button onClick={handleRequestCertificate}>
            <FileText className="mr-2 h-4 w-4" />
            Request New Certificate
          </Button>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search certificates..."
              className="w-full pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Certificates</TabsTrigger>
            <TabsTrigger value="medical">Medical Certificates</TabsTrigger>
            <TabsTrigger value="sickLeave">Sick Leave</TabsTrigger>
            <TabsTrigger value="insurance">Insurance Documents</TabsTrigger>
          </TabsList>

          {["all", "medical", "sickLeave", "insurance"].map((tabValue) => (
            <TabsContent key={tabValue} value={tabValue} className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {tabValue === "all"
                      ? "All Medical Certificates"
                      : tabValue === "medical"
                        ? "Medical Certificates"
                        : tabValue === "sickLeave"
                          ? "Sick Leave Certificates"
                          : "Insurance Documents"}
                  </CardTitle>
                  <CardDescription>
                    {tabValue === "all"
                      ? "All your medical certificates and documentation"
                      : tabValue === "medical"
                        ? "Health and fitness certificates issued by your healthcare providers"
                        : tabValue === "sickLeave"
                          ? "Sick leave certificates for work or school"
                          : "Medical certificates for insurance purposes"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {getCertificatesByType(tabValue).length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No certificates found. Try adjusting your search.
                    </div>
                  ) : (
                    getCertificatesByType(tabValue).map((certificate) => (
                      <div key={certificate.id} className="flex items-center justify-between border-b pb-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{certificate.title}</p>
                            {getStatusBadge(certificate.status)}
                          </div>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>Issued: {certificate.date}</span>
                            {certificate.validUntil && (
                              <>
                                <span className="mx-1">•</span>
                                <span>Valid until: {certificate.validUntil}</span>
                              </>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">Issued by: {certificate.doctor}</p>
                        </div>
                        <div className="flex space-x-2">
                          <Button variant="outline" size="sm" onClick={() => handleViewCertificate(certificate)}>
                            <Eye className="mr-1 h-4 w-4" />
                            View
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleDownloadCertificate(certificate)}>
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

      {selectedCertificate && (
        <PDFViewerModal
          isOpen={isViewerOpen}
          onClose={() => setIsViewerOpen(false)}
          pdfUrl={selectedCertificate.pdfUrl}
          title={selectedCertificate.title}
          description={`Issued: ${selectedCertificate.date} • Valid until: ${selectedCertificate.validUntil}`}
        />
      )}
    </DashboardLayout>
  )
}
