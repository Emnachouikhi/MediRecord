"use client"
import { useParams, useRouter } from "next/navigation"
import DashboardLayout from "@/components/dashboard-layout"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import PatientEMRView from "@/components/patient-emr-view"

export default function PatientDetail() {
  const router = useRouter()
  const params = useParams()
  const patientId = params.id as string

  return (
    <DashboardLayout role="doctor" userName="Dr. Sarah Johnson">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => router.back()}>
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back</span>
          </Button>
          <h1 className="text-2xl font-bold tracking-tight">Patient Details</h1>
        </div>

        <PatientEMRView patientId={patientId} userRole="doctor" />
      </div>
    </DashboardLayout>
  )
}
