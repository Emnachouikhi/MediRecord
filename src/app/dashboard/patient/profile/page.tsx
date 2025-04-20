"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Edit,
  Save,
  AlertTriangle,
  UserPlus,
  FileText,
  Check,
  X,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export default function PatientProfile() {
  const { toast } = useToast()
  const [editMode, setEditMode] = useState(false)

  // Initial patient data
  const initialPatientData = {
    id: "P-1001",
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    bloodType: "O+",
    address: "123 Main Street, Anytown, CA 12345",
    emergencyContact: "Jane Doe (Wife) - +1 (555) 987-6543",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    medications: ["Lisinopril 10mg", "Metformin 500mg", "Atorvastatin 20mg"],
    primaryDoctor: "Dr. Sarah Johnson",
    insuranceProvider: "HealthPlus Insurance",
    insuranceNumber: "HP-987654321",
    lastUpdated: "April 10, 2023",
  }

  // State for patient data
  const [patientData, setPatientData] = useState(initialPatientData)

  // Add this useEffect to load data from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment (not during SSR)
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("patientProfileData")
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setPatientData(parsedData)
        } catch (error) {
          console.error("Failed to parse saved patient data:", error)
        }
      }
    }
  }, [])

  // Form refs for collecting data
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const dobRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLTextAreaElement>(null)
  const emergencyContactRef = useRef<HTMLInputElement>(null)
  const primaryDoctorRef = useRef<HTMLInputElement>(null)
  const insuranceProviderRef = useRef<HTMLInputElement>(null)
  const insuranceNumberRef = useRef<HTMLInputElement>(null)

  // State for new allergy and condition inputs
  const [newAllergy, setNewAllergy] = useState("")
  const [newCondition, setNewCondition] = useState("")
  const [newMedication, setNewMedication] = useState("")
  const [showAllergyInput, setShowAllergyInput] = useState(false)
  const [showConditionInput, setShowConditionInput] = useState(false)
  const [showMedicationInput, setShowMedicationInput] = useState(false)

  // Handle save changes
  const handleSaveChanges = () => {
    // Get values from refs
    const updatedData = {
      ...patientData,
      name: nameRef.current?.value || patientData.name,
      email: emailRef.current?.value || patientData.email,
      phone: phoneRef.current?.value || patientData.phone,
      dateOfBirth: dobRef.current?.value || patientData.dateOfBirth,
      address: addressRef.current?.value || patientData.address,
      emergencyContact: emergencyContactRef.current?.value || patientData.emergencyContact,
      primaryDoctor: primaryDoctorRef.current?.value || patientData.primaryDoctor,
      insuranceProvider: insuranceProviderRef.current?.value || patientData.insuranceProvider,
      insuranceNumber: insuranceNumberRef.current?.value || patientData.insuranceNumber,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }

    // Update patient data
    setPatientData(updatedData)

    // Save to localStorage
    localStorage.setItem("patientProfileData", JSON.stringify(updatedData))

    // Exit edit mode
    setEditMode(false)

    // Show success toast
    toast({
      title: "Profile Updated",
      description: "Your profile information has been successfully updated.",
      variant: "default",
    })
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false)
    setShowAllergyInput(false)
    setShowConditionInput(false)
    setShowMedicationInput(false)
    setNewAllergy("")
    setNewCondition("")
    setNewMedication("")
  }

  // Add new allergy
  const handleAddAllergy = () => {
    if (newAllergy.trim()) {
      const updatedData = {
        ...patientData,
        allergies: [...patientData.allergies, newAllergy.trim()],
      }
      setPatientData(updatedData)
      localStorage.setItem("patientProfileData", JSON.stringify(updatedData))
      setNewAllergy("")
      setShowAllergyInput(false)
    }
  }

  // Remove allergy
  const handleRemoveAllergy = (index: number) => {
    const updatedAllergies = [...patientData.allergies]
    updatedAllergies.splice(index, 1)
    const updatedData = {
      ...patientData,
      allergies: updatedAllergies,
    }
    setPatientData(updatedData)
    localStorage.setItem("patientProfileData", JSON.stringify(updatedData))
  }

  // Add new condition
  const handleAddCondition = () => {
    if (newCondition.trim()) {
      const updatedData = {
        ...patientData,
        chronicConditions: [...patientData.chronicConditions, newCondition.trim()],
      }
      setPatientData(updatedData)
      localStorage.setItem("patientProfileData", JSON.stringify(updatedData))
      setNewCondition("")
      setShowConditionInput(false)
    }
  }

  // Remove condition
  const handleRemoveCondition = (index: number) => {
    const updatedConditions = [...patientData.chronicConditions]
    updatedConditions.splice(index, 1)
    const updatedData = {
      ...patientData,
      chronicConditions: updatedConditions,
    }
    setPatientData(updatedData)
    localStorage.setItem("patientProfileData", JSON.stringify(updatedData))
  }

  // Add new medication
  const handleAddMedication = () => {
    if (newMedication.trim()) {
      const updatedData = {
        ...patientData,
        medications: [...patientData.medications, newMedication.trim()],
      }
      setPatientData(updatedData)
      localStorage.setItem("patientProfileData", JSON.stringify(updatedData))
      setNewMedication("")
      setShowMedicationInput(false)
    }
  }

  // Remove medication
  const handleRemoveMedication = (index: number) => {
    const updatedMedications = [...patientData.medications]
    updatedMedications.splice(index, 1)
    const updatedData = {
      ...patientData,
      medications: updatedMedications,
    }
    setPatientData(updatedData)
    localStorage.setItem("patientProfileData", JSON.stringify(updatedData))
  }

  return (
    <DashboardLayout role="patient" userName={patientData.name}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and manage your personal and medical information</p>
          </div>
          {editMode ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSaveChanges}>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>
              <Edit className="mr-2 h-4 w-4" />
              Edit Profile
            </Button>
          )}
        </div>

        <Tabs defaultValue="personal" className="space-y-4">
          <TabsList className="grid grid-cols-1 md:grid-cols-4 h-auto">
            <TabsTrigger value="personal" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Personal Information
            </TabsTrigger>
            <TabsTrigger value="medical" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Medical Details
            </TabsTrigger>
            
            <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-100 data-[state=active]:text-blue-700">
              Privacy & Security
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Profile Summary Card */}
              <Card className="md:col-span-1">
                <CardHeader>
                  <CardTitle>Profile Summary</CardTitle>
                  <CardDescription>Your basic information</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center space-y-4">
                  <Avatar className="h-32 w-32">
                    <AvatarImage src="/placeholder-user.jpg" alt={patientData.name} />
                    <AvatarFallback className="text-2xl">{patientData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  )}
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{patientData.name}</h2>
                    <p className="text-sm text-muted-foreground">Patient ID: {patientData.id}</p>
                    <div className="flex items-center justify-center mt-2 space-x-2">
                      <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                        {patientData.gender}
                      </Badge>
                      <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                        {patientData.bloodType}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Contact Information Card */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                  <CardDescription>Your personal contact details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="fullName">Full Name</Label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                        <User className="h-4 w-4 text-muted-foreground mr-2" />
                        {editMode ? (
                          <Input
                            id="fullName"
                            defaultValue={patientData.name}
                            className="border-0 p-0 shadow-none"
                            ref={nameRef}
                          />
                        ) : (
                          <span>{patientData.name}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                        <Mail className="h-4 w-4 text-muted-foreground mr-2" />
                        {editMode ? (
                          <Input
                            id="email"
                            defaultValue={patientData.email}
                            className="border-0 p-0 shadow-none"
                            ref={emailRef}
                          />
                        ) : (
                          <span>{patientData.email}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                        <Phone className="h-4 w-4 text-muted-foreground mr-2" />
                        {editMode ? (
                          <Input
                            id="phone"
                            defaultValue={patientData.phone}
                            className="border-0 p-0 shadow-none"
                            ref={phoneRef}
                          />
                        ) : (
                          <span>{patientData.phone}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob">Date of Birth</Label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                        <Calendar className="h-4 w-4 text-muted-foreground mr-2" />
                        {editMode ? (
                          <Input
                            id="dob"
                            type="date"
                            defaultValue={patientData.dateOfBirth}
                            className="border-0 p-0 shadow-none"
                            ref={dobRef}
                          />
                        ) : (
                          <span>{new Date(patientData.dateOfBirth).toLocaleDateString()}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-start border rounded-md px-3 py-2 bg-white">
                      <MapPin className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                      {editMode ? (
                        <Textarea
                          id="address"
                          defaultValue={patientData.address}
                          className="border-0 p-0 shadow-none min-h-[60px]"
                          ref={addressRef}
                        />
                      ) : (
                        <span>{patientData.address}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="emergency">Emergency Contact</Label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                      <UserPlus className="h-4 w-4 text-muted-foreground mr-2" />
                      {editMode ? (
                        <Input
                          id="emergency"
                          defaultValue={patientData.emergencyContact}
                          className="border-0 p-0 shadow-none"
                          ref={emergencyContactRef}
                        />
                      ) : (
                        <span>{patientData.emergencyContact}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Medical Details Tab */}
          <TabsContent value="medical" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Medical Conditions Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Medical Conditions</CardTitle>
                  <CardDescription>Your allergies and chronic conditions</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Allergies</Label>
                    <div className="border rounded-md p-3 bg-white">
                      <div className="flex flex-wrap gap-2">
                        {patientData.allergies.map((allergy, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-red-50 text-red-700 border-red-200 px-3 py-1"
                          >
                            {allergy}
                            {editMode && (
                              <button
                                className="ml-2 text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveAllergy(index)}
                              >
                                ×
                              </button>
                            )}
                          </Badge>
                        ))}
                        {editMode && !showAllergyInput && (
                          <Button variant="outline" size="sm" className="h-7" onClick={() => setShowAllergyInput(true)}>
                            + Add Allergy
                          </Button>
                        )}
                      </div>
                      {editMode && showAllergyInput && (
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Enter allergy"
                            value={newAllergy}
                            onChange={(e) => setNewAllergy(e.target.value)}
                            className="h-8"
                          />
                          <Button size="sm" onClick={handleAddAllergy}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowAllergyInput(false)
                              setNewAllergy("")
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Chronic Conditions</Label>
                    <div className="border rounded-md p-3 bg-white">
                      <div className="flex flex-wrap gap-2">
                        {patientData.chronicConditions.map((condition, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="bg-blue-50 text-blue-700 border-blue-200 px-3 py-1"
                          >
                            {condition}
                            {editMode && (
                              <button
                                className="ml-2 text-blue-500 hover:text-blue-700"
                                onClick={() => handleRemoveCondition(index)}
                              >
                                ×
                              </button>
                            )}
                          </Badge>
                        ))}
                        {editMode && !showConditionInput && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="h-7"
                            onClick={() => setShowConditionInput(true)}
                          >
                            + Add Condition
                          </Button>
                        )}
                      </div>
                      {editMode && showConditionInput && (
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Enter condition"
                            value={newCondition}
                            onChange={(e) => setNewCondition(e.target.value)}
                            className="h-8"
                          />
                          <Button size="sm" onClick={handleAddCondition}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowConditionInput(false)
                              setNewCondition("")
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Current Medications</Label>
                    <div className="border rounded-md p-3 bg-white">
                      <ul className="space-y-2">
                        {patientData.medications.map((medication, index) => (
                          <li key={index} className="flex items-center justify-between">
                            <span>{medication}</span>
                            {editMode && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-7 text-red-500 hover:text-red-700"
                                onClick={() => handleRemoveMedication(index)}
                              >
                                ×
                              </Button>
                            )}
                          </li>
                        ))}
                      </ul>
                      {editMode && !showMedicationInput && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="mt-2"
                          onClick={() => setShowMedicationInput(true)}
                        >
                          + Add Medication
                        </Button>
                      )}
                      {editMode && showMedicationInput && (
                        <div className="mt-2 flex gap-2">
                          <Input
                            placeholder="Enter medication"
                            value={newMedication}
                            onChange={(e) => setNewMedication(e.target.value)}
                            className="h-8"
                          />
                          <Button size="sm" onClick={handleAddMedication}>
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {
                              setShowMedicationInput(false)
                              setNewMedication("")
                            }}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Healthcare Providers Card */}
              <Card>
                <CardHeader>
                  <CardTitle>Healthcare Information</CardTitle>
                  <CardDescription>Your doctors and insurance details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="primaryDoctor">Primary Doctor</Label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                      <User className="h-4 w-4 text-muted-foreground mr-2" />
                      {editMode ? (
                        <Input
                          id="primaryDoctor"
                          defaultValue={patientData.primaryDoctor}
                          className="border-0 p-0 shadow-none"
                          ref={primaryDoctorRef}
                        />
                      ) : (
                        <span>{patientData.primaryDoctor}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceProvider">Insurance Provider</Label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                      <Shield className="h-4 w-4 text-muted-foreground mr-2" />
                      {editMode ? (
                        <Input
                          id="insuranceProvider"
                          defaultValue={patientData.insuranceProvider}
                          className="border-0 p-0 shadow-none"
                          ref={insuranceProviderRef}
                        />
                      ) : (
                        <span>{patientData.insuranceProvider}</span>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="insuranceNumber">Insurance Number</Label>
                    <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                      <FileText className="h-4 w-4 text-muted-foreground mr-2" />
                      {editMode ? (
                        <Input
                          id="insuranceNumber"
                          defaultValue={patientData.insuranceNumber}
                          className="border-0 p-0 shadow-none"
                          ref={insuranceNumberRef}
                        />
                      ) : (
                        <span>{patientData.insuranceNumber}</span>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <p className="text-sm text-muted-foreground">Last updated: {patientData.lastUpdated}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

  

          {/* Privacy & Security Tab */}
          <TabsContent value="privacy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Privacy & Security</CardTitle>
                <CardDescription>Manage your account security and data privacy</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="flex">
                        <Input id="current-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="flex">
                        <Input id="new-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <div className="flex">
                        <Input id="confirm-password" type="password" placeholder="••••••••" />
                      </div>
                    </div>
                    <Button className="mt-2">Change Password</Button>
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="two-factor">Enable Two-Factor Authentication</Label>
                      <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                    </div>
                    <Switch id="two-factor" defaultChecked={false} />
                  </div>
                </div>

                <Separator />

             
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
