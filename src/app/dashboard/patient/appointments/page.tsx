import DashboardLayout from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calendar, Search, Clock, MapPin, Video, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default function PatientAppointments() {
  return (
    <DashboardLayout role="patient" userName="John Doe">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">My Appointments</h1>
            <p className="text-muted-foreground">View and manage your medical appointments</p>
          </div>
          <Button>
            <Calendar className="mr-2 h-4 w-4" />
            Schedule New Appointment
          </Button>
        </div>

        <div className="relative">
          <div className="relative mb-4">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input type="search" placeholder="Search appointments..." className="w-full pl-8 bg-white" />
          </div>
        </div>

        <Tabs defaultValue="upcoming" className="space-y-4">
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past Appointments</TabsTrigger>
            <TabsTrigger value="canceled">Canceled</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Appointments</CardTitle>
                <CardDescription>Your scheduled medical appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {[1, 2].map((i) => (
                  <div key={i} className="border rounded-lg p-4 space-y-4">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={`/placeholder-user-${i}.jpg`} alt="Doctor" />
                          <AvatarFallback>{i === 1 ? "MC" : "SJ"}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold text-lg">
                            {i === 1 ? "Dr. Michael Chen" : "Dr. Sarah Johnson"}
                          </h3>
                          <p className="text-sm text-muted-foreground">{i === 1 ? "Cardiology" : "General Practice"}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Button variant="outline" size="sm">
                          Reschedule
                        </Button>
                        <Button variant="outline" size="sm" className="text-red-500 hover:text-red-600">
                          Cancel
                        </Button>
                        {i === 1 && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Join Video Call
                          </Button>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-blue-500" />
                        <span>{i === 1 ? "April 25, 2023" : "May 10, 2023"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>{i === 1 ? "10:30 AM - 11:00 AM" : "2:15 PM - 2:45 PM"}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        {i === 1 ? (
                          <>
                            <Video className="h-4 w-4 text-blue-500" />
                            <span>Video Consultation</span>
                          </>
                        ) : (
                          <>
                            <MapPin className="h-4 w-4 text-blue-500" />
                            <span>In-person Visit</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md">
                      <h4 className="font-medium text-sm mb-1">Appointment Details:</h4>
                      <p className="text-sm">
                        {i === 1
                          ? "Follow-up consultation to review recent test results and adjust medication if necessary."
                          : "Annual physical examination and routine health check-up."}
                      </p>
                    </div>

                    {i === 1 ? (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <Video className="h-4 w-4" />
                        <span>Video link will be available 15 minutes before the appointment</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-sm text-blue-600">
                        <MapPin className="h-4 w-4" />
                        <span>City Medical Center, 123 Health St, Floor 3, Room 302</span>
                      </div>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Appointment Reminders</CardTitle>
                <CardDescription>Important information about your upcoming appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">Preparation for Cardiology Appointment</h3>
                      <p className="text-sm mt-1">
                        Please bring your blood pressure readings from the last two weeks to your appointment with Dr.
                        Chen on April 25.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg p-4 bg-blue-50">
                  <div className="flex items-start gap-3">
                    <User className="h-5 w-5 text-blue-500 mt-0.5" />
                    <div>
                      <h3 className="font-medium">New Patient Forms</h3>
                      <p className="text-sm mt-1">
                        Please arrive 15 minutes early to your appointment with Dr. Johnson on May 10 to complete new
                        patient paperwork.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="past" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Past Appointments</CardTitle>
                <CardDescription>Your previous medical appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder-user-${i}.jpg`} alt="Doctor" />
                        <AvatarFallback>{i % 2 === 0 ? "SJ" : "MC"}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <p className="font-medium">{i % 2 === 0 ? "Dr. Sarah Johnson" : "Dr. Michael Chen"}</p>
                        <p className="text-sm">
                          {i === 1
                            ? "General Check-up"
                            : i === 2
                              ? "Cardiology Consultation"
                              : i === 3
                                ? "Blood Test Results Review"
                                : "Follow-up Appointment"}
                        </p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>
                            {new Date(2023, 3 - i, 15).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </span>
                          <span className="mx-1">•</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{i % 2 === 0 ? "10:30 AM" : "2:15 PM"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">
                        View Summary
                      </Button>
                      <Button variant="outline" size="sm">
                        Book Follow-up
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="canceled" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Canceled Appointments</CardTitle>
                <CardDescription>Your canceled or missed appointments</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="flex items-center justify-between border-b pb-4">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/placeholder-user-${i}.jpg`} alt="Doctor" />
                        <AvatarFallback>{i === 1 ? "SJ" : "MC"}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{i === 1 ? "Dr. Sarah Johnson" : "Dr. Michael Chen"}</p>
                          <Badge variant="outline" className="bg-red-50 text-red-800">
                            {i === 1 ? "Canceled by you" : "Rescheduled"}
                          </Badge>
                        </div>
                        <p className="text-sm">{i === 1 ? "General Check-up" : "Cardiology Consultation"}</p>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="mr-1 h-3 w-3" />
                          <span>{i === 1 ? "March 5, 2023" : "February 20, 2023"}</span>
                          <span className="mx-1">•</span>
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{i === 1 ? "9:00 AM" : "11:30 AM"}</span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                  </div>
                ))}

                <div className="text-center py-4">
                  <p className="text-muted-foreground mb-4">Need to schedule a new appointment?</p>
                  <Button>Schedule Appointment</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
