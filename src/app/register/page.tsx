"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Download } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const [showQrCode, setShowQrCode] = useState(false)
  const [qrCodeData, setQrCodeData] = useState("")
  const [userId, setUserId] = useState<number | null>(null)
  const [formData, setFormData] = useState({
    nom: "",
    prenom: "",
    date_naissance: "",
    email: "",
    password: "",
    role: "patient",
    specialite: "",
    qualification: "",
    type: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const fetchPatientQrCode = async (id: number) => {
    try {
      const response = await fetch(`/getPatientByIdNom=${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })

      const data = await response.json()
      if (data.status && data.patient && data.patient.qrcode) {
        setQrCodeData(data.patient.qrcode)
        setShowQrCode(true)
      } else {
        console.log({
          title: "Error",
          description: "Failed to retrieve QR code.",
          variant: "destructive",
        })
      }
    } catch (err) {
      console.error("Error while retrieving the QR code:", err)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    try {
      const response = await fetch("http://127.0.0.1:8000/api/admin/add ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (data.status && data.codeR === "1") {
        console.log({
          title: "Registration successful",
          description: "Your account has been created successfully.",
        })

        if (formData.role === "patient" && data.admin && data.admin.id) {
          setUserId(data.admin.id)
          await fetchPatientQrCode(data.admin.id)
        } else {
          router.push("/login")
        }
      } else {
        setError(data.message || "An error occurred during registration.")
      }
    } catch (err) {
      setError("An error occurred while connecting to the server.")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const downloadQrCode = () => {
    if (!qrCodeData) return

    const link = document.createElement("a")
    link.href = `data:image/png;base64,${qrCodeData}`
    link.download = `qrcode-patient-${userId}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const closeQrCodeDialog = () => {
    setShowQrCode(false)
    router.push("/login")
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl">Create an account</CardTitle>
          <CardDescription>Fill out the form below to sign up.</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="nom">Last Name</Label>
                <Input id="nom" name="nom" value={formData.nom} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="prenom">First Name</Label>
                <Input id="prenom" name="prenom" value={formData.prenom} onChange={handleChange} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="date_naissance">Date of Birth</Label>
              <Input
                id="date_naissance"
                name="date_naissance"
                type="date"
                value={formData.date_naissance}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Role</Label>
              <RadioGroup
                value={formData.role}
                onValueChange={(value) => handleSelectChange("role", value)}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="patient" id="patient" />
                  <Label htmlFor="patient">Patient</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="docteur" id="docteur" />
                  <Label htmlFor="docteur">Doctor</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="clinicien" id="clinicien" />
                  <Label htmlFor="clinicien">Clinician</Label>
                </div>
              </RadioGroup>
            </div>

            {formData.role === "docteur" && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="specialite">Specialty</Label>
                  <Input
                    id="specialite"
                    name="specialite"
                    value={formData.specialite}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qualification">Qualification</Label>
                  <Input
                    id="qualification"
                    name="qualification"
                    value={formData.qualification}
                    onChange={handleChange}
                    required
                  />
                </div>
              </>
            )}

            {formData.role === "clinicien" && (
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select value={formData.type} onValueChange={(value) => handleSelectChange("type", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="laboratoire">Laboratory</SelectItem>
                    <SelectItem value="radiologie">Radiology</SelectItem>
                    <SelectItem value="pharmacie">Pharmacy</SelectItem>
                    <SelectItem value="autre">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {formData.role === "patient" && (
              <div className="p-4 bg-blue-50 rounded-md">
                <p className="text-sm text-blue-700">
                  As a patient, a unique QR code will be generated for you after registration. You can download and use it for your consultations.
                </p>
              </div>
            )}

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registering..." : "Sign Up"}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/login" className="text-primary hover:underline">
              Log in
            </a>
          </p>
        </CardFooter>
      </Card>

      {/* QR Code Dialog */}
      <Dialog open={showQrCode} onOpenChange={closeQrCodeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Your Patient QR Code</DialogTitle>
            <DialogDescription>
              Here is your unique QR code. Download and keep it for your medical consultations.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col items-center justify-center p-4">
            {qrCodeData && (
              <div className="border p-4 rounded-md bg-white">
                <img
                  src={`data:image/png;base64,${qrCodeData}`}
                  alt="Patient QR Code"
                  className="w-64 h-64 object-contain"
                />
              </div>
            )}
            <div className="flex gap-4 mt-6">
              <Button onClick={downloadQrCode} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                Download
              </Button>
              <Button variant="outline" onClick={closeQrCodeDialog}>
                Continue
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
