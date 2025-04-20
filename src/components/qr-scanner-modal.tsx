"use client"

import { useState, useEffect } from "react"
import {IDetectedBarcode, Scanner as QrScanner} from "@yudiel/react-qr-scanner"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useRouter } from "next/navigation"
import { Loader2, AlertCircle, QrCode, Keyboard } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

interface QRScannerModalProps {
  isOpen: boolean
  onClose: () => void
}

const patientCodeSchema = z.object({
  patientCode: z.string().min(1, "Patient code is required"),
})

export default function QRScannerModal({ isOpen, onClose }: QRScannerModalProps) {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [permission, setPermission] = useState<boolean | null>(null)
  const [activeTab, setActiveTab] = useState<"scan" | "manual">("scan")

  const form = useForm<z.infer<typeof patientCodeSchema>>({
    resolver: zodResolver(patientCodeSchema),
    defaultValues: {
      patientCode: "",
    },
  })

  useEffect(() => {
    if (isOpen && activeTab === "scan") {
      // Reset states when opening
      setError(null)
      setLoading(false)

      // Check for camera permission
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then(() => {
          setPermission(true)
        })
        .catch(() => {
          setPermission(false)
          setError("Camera access denied. Please allow camera access to scan QR codes.")
        })
    }
  }, [isOpen, activeTab])

  const handleDecode = (result: IDetectedBarcode[]) => {
    console.log(result);
    
    // try {
    //   setLoading(true)

    //   // Parse the QR code data
    //   // Expected format: {"type":"patient","id":"123"} or {"type":"prescription","id":"456"}
    //   const data = JSON.parse(result)

    //   if (!data.type || !data.id) {
    //     throw new Error("Invalid QR code format")
    //   }

    //   // Navigate based on QR code type
    //   if (data.type === "patient") {
    //     router.push(`/dashboard/doctor/patient/${data.id}`)
    //   } else if (data.type === "prescription") {
    //     router.push(`/dashboard/doctor/prescription/${data.id}`)
    //   } else {
    //     throw new Error("Unknown QR code type")
    //   }

    //   onClose()
    // } catch (err) {
    //   setError("Invalid QR code. Please try again.")
    //   setLoading(false)
    // }
  }

  const handleError = (err: Error) => {
    console.error("QR Scanner error:", err)
    setError("Error scanning QR code. Please try again.")
  }

  const onSubmit = (values: z.infer<typeof patientCodeSchema>) => {
    setLoading(true)

    // Simulate validation (in a real app, this would check against a database)
    setTimeout(() => {
      try {
        const patientId = values.patientCode.trim()

        // Basic validation - in a real app, you'd validate the format or check if the patient exists
        if (patientId.length < 1) {
          throw new Error("Invalid patient code")
        }

        // Navigate to the patient's EMR
        router.push(`/dashboard/doctor/patient/${patientId}`)
        onClose()
      } catch (err) {
        setError("Invalid patient code. Please check and try again.")
        setLoading(false)
      }
    }, 500)
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Access Patient Records</DialogTitle>
          <DialogDescription>Scan a QR code or enter a patient code to access their medical records.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "scan" | "manual")} className="mt-2">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scan" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              Scan QR Code
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <Keyboard className="h-4 w-4" />
              Enter Code
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scan" className="mt-4">
            {loading && (
              <div className="flex flex-col items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                <p className="mt-2 text-sm text-muted-foreground">Processing QR code...</p>
              </div>
            )}

            {error && !loading && activeTab === "scan" && (
              <Alert variant="destructive" className="my-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {permission === false && (
              <div className="text-center py-4">
                <p className="text-sm text-muted-foreground mb-4">
                  Camera access is required to scan QR codes. Please allow camera access in your browser settings or use
                  the manual entry option.
                </p>
                <Button onClick={() => setActiveTab("manual")}>Use Manual Entry</Button>
              </div>
            )}

            {!loading && permission === true && (
              <div className="overflow-hidden rounded-md border">
                <QrScanner
                  onScan={(result:IDetectedBarcode[]) => {
                    if (result) {
                      handleDecode(result)
                    }
                  }}

                  onError={(error)=>console.log(error)}
                  constraints={{ facingMode: "environment" }}
                  styles={{ container:{ height: "300px" }}}
                />
              </div>
            )}
          </TabsContent>

          <TabsContent value="manual" className="mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="patientCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Patient Code</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter patient ID or code" {...field} autoComplete="off" autoFocus />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {error && !loading && activeTab === "manual" && (
                  <Alert variant="destructive">
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Access Patient Records
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>

        <div className="flex justify-between mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          {activeTab === "scan" && (
            <Button variant="ghost" onClick={() => setError(null)}>
              Try Again
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
