"use client"

import { useState, useRef, useEffect } from "react"
import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { User, Mail, Phone, MapPin, Building, Save, Loader2, X } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ClinicianProfile() {
  const { toast } = useToast()
  const [editMode, setEditMode] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("personal")

  // Initial clinician data
  const initialClinicianData = {
    id: "C-1001",
    name: "Lab Technician",
    email: "lab.tech@example.com",
    phone: "+1 (555) 456-7890",
    clinicName: "City Medical Laboratory",
    clinicType: "laboratory",
    address: "456 Medical Center Dr, Anytown, CA 12345",
    specialization: "Blood Work, Urinalysis",
    certification: "Medical Laboratory Technician (MLT)",
    licenseNumber: "LAB12345",
    experience: "8",
    bio: "Experienced laboratory technician specializing in blood work and urinalysis with 8 years of experience in clinical laboratory settings.",
    lastUpdated: "April 10, 2023",
  }

  // State for clinician data
  const [clinicianData, setClinicianData] = useState(initialClinicianData)

  // Add this useEffect to load data from localStorage on component mount
  useEffect(() => {
    // Check if we're in a browser environment (not during SSR)
    if (typeof window !== "undefined") {
      const savedData = localStorage.getItem("clinicianProfileData")
      if (savedData) {
        try {
          const parsedData = JSON.parse(savedData)
          setClinicianData(parsedData)
        } catch (error) {
          console.error("Failed to parse saved clinician data:", error)
        }
      }
    }
  }, [])

  // Form refs for collecting data
  const nameRef = useRef<HTMLInputElement>(null)
  const emailRef = useRef<HTMLInputElement>(null)
  const phoneRef = useRef<HTMLInputElement>(null)
  const clinicNameRef = useRef<HTMLInputElement>(null)
  const addressRef = useRef<HTMLTextAreaElement>(null)
  const specializationRef = useRef<HTMLInputElement>(null)
  const certificationRef = useRef<HTMLInputElement>(null)
  const licenseNumberRef = useRef<HTMLInputElement>(null)
  const experienceRef = useRef<HTMLInputElement>(null)
  const bioRef = useRef<HTMLTextAreaElement>(null)
  const [clinicType, setClinicType] = useState(clinicianData.clinicType)

  // Handle save changes
  const handleSaveChanges = () => {
    setLoading(true)

    // Get values from refs
    const updatedData = {
      ...clinicianData,
      name: nameRef.current?.value || clinicianData.name,
      email: emailRef.current?.value || clinicianData.email,
      phone: phoneRef.current?.value || clinicianData.phone,
      clinicName: clinicNameRef.current?.value || clinicianData.clinicName,
      clinicType: clinicType,
      address: addressRef.current?.value || clinicianData.address,
      specialization: specializationRef.current?.value || clinicianData.specialization,
      certification: certificationRef.current?.value || clinicianData.certification,
      licenseNumber: licenseNumberRef.current?.value || clinicianData.licenseNumber,
      experience: experienceRef.current?.value || clinicianData.experience,
      bio: bioRef.current?.value || clinicianData.bio,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }

    // Simulate API call with timeout
    setTimeout(() => {
      // Update clinician data
      setClinicianData(updatedData)

      // Save to localStorage
      localStorage.setItem("clinicianProfileData", JSON.stringify(updatedData))

      // Exit edit mode
      setEditMode(false)
      setLoading(false)

      // Show success toast
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
        variant: "default",
      })
    }, 1000)
  }

  // Handle cancel edit
  const handleCancelEdit = () => {
    setEditMode(false)
  }

  return (
    <DashboardLayout role="clinician" userName={clinicianData.name}>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Profile</h1>
            <p className="text-muted-foreground">View and manage your professional information</p>
          </div>
          {editMode ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancelEdit}>
                <X className="mr-2 h-4 w-4" />
                Cancel
              </Button>
              <Button onClick={handleSaveChanges} disabled={loading}>
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </Button>
            </div>
          ) : (
            <Button onClick={() => setEditMode(true)}>Edit Profile</Button>
          )}
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList>
            <TabsTrigger value="personal">Personal Information</TabsTrigger>
            <TabsTrigger value="professional">Professional Information</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
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
                    <AvatarImage src="/placeholder-user.jpg" alt={clinicianData.name} />
                    <AvatarFallback className="text-2xl">{clinicianData.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  {editMode && (
                    <Button variant="outline" size="sm">
                      Change Photo
                    </Button>
                  )}
                  <div className="text-center">
                    <h2 className="text-xl font-bold">{clinicianData.name}</h2>
                    <p className="text-sm text-muted-foreground">Clinician ID: {clinicianData.id}</p>
                    <div className="flex items-center justify-center mt-2 space-x-2">
                      <div className="text-sm text-muted-foreground">{clinicianData.clinicType}</div>
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
                            defaultValue={clinicianData.name}
                            className="border-0 p-0 shadow-none"
                            ref={nameRef}
                          />
                        ) : (
                          <span>{clinicianData.name}</span>
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
                            defaultValue={clinicianData.email}
                            className="border-0 p-0 shadow-none"
                            ref={emailRef}
                          />
                        ) : (
                          <span>{clinicianData.email}</span>
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
                            defaultValue={clinicianData.phone}
                            className="border-0 p-0 shadow-none"
                            ref={phoneRef}
                          />
                        ) : (
                          <span>{clinicianData.phone}</span>
                        )}
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="clinicName">Clinic/Laboratory Name</Label>
                      <div className="flex items-center border rounded-md px-3 py-2 bg-white">
                        <Building className="h-4 w-4 text-muted-foreground mr-2" />
                        {editMode ? (
                          <Input
                            id="clinicName"
                            defaultValue={clinicianData.clinicName}
                            className="border-0 p-0 shadow-none"
                            ref={clinicNameRef}
                          />
                        ) : (
                          <span>{clinicianData.clinicName}</span>
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
                          defaultValue={clinicianData.address}
                          className="border-0 p-0 shadow-none min-h-[60px]"
                          ref={addressRef}
                        />
                      ) : (
                        <span>{clinicianData.address}</span>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Professional Information Tab */}
          <TabsContent value="professional" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Professional Information</CardTitle>
                <CardDescription>Your professional qualifications and experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="clinicType">Clinic Type</Label>
                    {editMode ? (
                      <Select defaultValue={clinicianData.clinicType} onValueChange={(value) => setClinicType(value)}>
                        <SelectTrigger id="clinicType">
                          <SelectValue placeholder="Select clinic type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="laboratory">Laboratory</SelectItem>
                          <SelectItem value="radiology">Radiology</SelectItem>
                          <SelectItem value="mri">MRI</SelectItem>
                          <SelectItem value="ultrasound">Ultrasound</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <div className="border rounded-md px-3 py-2 bg-white">
                        <span className="capitalize">{clinicianData.clinicType}</span>
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="specialization">Specialization</Label>
                    {editMode ? (
                      <Input id="specialization" defaultValue={clinicianData.specialization} ref={specializationRef} />
                    ) : (
                      <div className="border rounded-md px-3 py-2 bg-white">{clinicianData.specialization}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certification">Certification</Label>
                    {editMode ? (
                      <Input id="certification" defaultValue={clinicianData.certification} ref={certificationRef} />
                    ) : (
                      <div className="border rounded-md px-3 py-2 bg-white">{clinicianData.certification}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="licenseNumber">License Number</Label>
                    {editMode ? (
                      <Input id="licenseNumber" defaultValue={clinicianData.licenseNumber} ref={licenseNumberRef} />
                    ) : (
                      <div className="border rounded-md px-3 py-2 bg-white">{clinicianData.licenseNumber}</div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    {editMode ? (
                      <Input
                        id="experience"
                        type="number"
                        defaultValue={clinicianData.experience}
                        ref={experienceRef}
                      />
                    ) : (
                      <div className="border rounded-md px-3 py-2 bg-white">{clinicianData.experience} years</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Professional Bio</Label>
                  {editMode ? (
                    <Textarea id="bio" className="min-h-[150px]" defaultValue={clinicianData.bio} ref={bioRef} />
                  ) : (
                    <div className="border rounded-md px-3 py-2 bg-white min-h-[100px]">{clinicianData.bio}</div>
                  )}
                </div>

                <div className="pt-4">
                  <p className="text-sm text-muted-foreground">Last updated: {clinicianData.lastUpdated}</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Security & Privacy</CardTitle>
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
