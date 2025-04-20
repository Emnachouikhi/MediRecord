"use client"

import { useState } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Download, Printer, Share2, QrCode, Smartphone } from "lucide-react"
import GenerateQRCode from "@/components/generate-qr-code"
import { useToast } from "@/hooks/use-toast"

export default function PatientQRCode() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState<"personal">("personal")

  // In a real app, this would come from authentication/session
  const patientId = "P-1001"
  const patientName = "John Doe"

  const handleShare = () => {
    // In a real app, this would open a sharing dialog
    // For now, we'll just show a toast notification
    toast({
      title: "Share QR Code",
      description: "Sharing functionality would be implemented here.",
    })
  }

  return (
    <DashboardLayout role="patient" userName={patientName}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Your QR Code</h1>
            <p className="text-muted-foreground">
              Show this QR code to your healthcare provider for quick access to your medical records
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Medical Record QR Code</CardTitle>
              <CardDescription>This QR code provides secure access to your medical information</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <Tabs
                value={activeTab}
                onValueChange={(value) => setActiveTab(value as "personal")}
                className="w-full mb-6"
              >
                <TabsList className="grid w-full grid-cols-1">
                  <TabsTrigger value="personal" className="flex items-center gap-2">
                    <QrCode className="h-4 w-4" />
                    Personal
                  </TabsTrigger>
                  
                </TabsList>

                <TabsContent value="personal" className="flex justify-center pt-4">
                  <GenerateQRCode type="patient" id={patientId} name={patientName} />
                </TabsContent>

           
              </Tabs>

           
            </CardContent>
          </Card>

          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>How to Use Your QR Code</CardTitle>
              <CardDescription>Quick access to your medical information for healthcare providers</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-lg font-medium">Personal QR Code</h3>
                <p className="text-sm text-muted-foreground">
                  Your personal QR code provides access to your complete medical record. Show this to your healthcare
                  provider during visits.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-medium">When to use:</h4>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
            
                    <li>Doctor consultations</li>
            
                    <li>Laboratory tests and imaging</li>
                  </ul>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
