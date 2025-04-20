"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { Search, Loader2, User } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface PatientSearchModalProps {
  isOpen: boolean
  onClose: () => void
  userRole: "doctor" | "clinician"
}

// Mock patient data - in a real app, this would come from an API
const mockPatients = [
  { id: "1001", name: "John Doe", age: 42, gender: "Male", lastVisit: "April 10, 2023" },
  { id: "1002", name: "Jane Smith", age: 35, gender: "Female", lastVisit: "April 15, 2023" },
  { id: "1003", name: "Robert Johnson", age: 58, gender: "Male", lastVisit: "April 8, 2023" },
  { id: "1004", name: "Emily Davis", age: 29, gender: "Female", lastVisit: "April 12, 2023" },
  { id: "1005", name: "Michael Brown", age: 47, gender: "Male", lastVisit: "April 5, 2023" },
]

export default function PatientSearchModal({ isOpen, onClose, userRole }: PatientSearchModalProps) {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [searchResults, setSearchResults] = useState<typeof mockPatients>([])
  const [searched, setSearched] = useState(false)

  const handleSearch = () => {
    setLoading(true)
    setSearched(true)

    // Simulate API call with timeout
    setTimeout(() => {
      if (searchQuery.trim() === "") {
        setSearchResults([])
      } else {
        // Filter mock patients based on search query
        const results = mockPatients.filter(
          (patient) =>
            patient.name.toLowerCase().includes(searchQuery.toLowerCase()) || patient.id.includes(searchQuery),
        )
        setSearchResults(results)
      }
      setLoading(false)
    }, 500)
  }

  const handlePatientSelect = (patientId: string) => {
    router.push(`/dashboard/${userRole}/patient/${patientId}`)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Search Patients</DialogTitle>
          <DialogDescription>Search for patients by name or ID to access their medical records</DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by name or ID..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button onClick={handleSearch} disabled={loading}>
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
          </Button>
        </div>

        <div className="mt-4 max-h-[300px] overflow-y-auto">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            </div>
          ) : searched && searchResults.length === 0 ? (
            <div className="text-center py-8">
              <User className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
              <p className="mt-2 text-muted-foreground">No patients found</p>
            </div>
          ) : (
            <div className="space-y-2">
              {searchResults.map((patient) => (
                <div
                  key={patient.id}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-muted cursor-pointer"
                  onClick={() => handlePatientSelect(patient.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{patient.name}</p>
                      <p className="text-sm text-muted-foreground">
                        ID: {patient.id} • {patient.age} years • {patient.gender}
                      </p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Select
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
