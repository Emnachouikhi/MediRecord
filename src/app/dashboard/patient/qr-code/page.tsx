"use client"

import DashboardLayout from "@/components/dashboard-layout"
import GenerateQRCode from "@/components/generate-qr-code"

export default function PatientQRCode() {
  // In a real app, this would come from authentication/session
  const patientId = "1001"
  const patientName = "John Doe"

  return (
    <DashboardLayout role="patient" userName={patientName}>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your QR Code</h1>
          <p className="text-muted-foreground">
            Show this QR code to your healthcare provider for quick access to your medical records
          </p>
        </div>

        <div className="max-w-md mx-auto">
          <GenerateQRCode type="patient" id={patientId} name={patientName} />
        </div>

        <div className="max-w-md mx-auto mt-4 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">How to use your QR code:</h3>
          <ol className="list-decimal pl-5 space-y-2">
            <li>Download or print this QR code</li>
            <li>Present it to your doctor or clinician during your visit</li>
            <li>They can scan it to quickly access your medical records</li>
            <li>This helps reduce wait times and improves accuracy</li>
          </ol>
        </div>
      </div>
    </DashboardLayout>
  )
}
