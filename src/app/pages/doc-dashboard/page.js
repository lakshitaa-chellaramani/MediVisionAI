'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Clock, Calendar as CalendarIcon, FileText, Users, CheckCircle, XCircle, RotateCcw, FileSearch, Plus } from "lucide-react"

export default function AppointmentsPage() {
  const [isAvailable, setIsAvailable] = useState(true)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [isAddingNotes, setIsAddingNotes] = useState(false)
  const [isRequestingTests, setIsRequestingTests] = useState(false)

  const pendingAppointments = [
    { id: 1, patientName: "Emma Wilson", requestedDateTime: "Mar 3, 2025 - 10:30 AM", reasonForVisit: "Annual checkup", avatar: "/assets/doctor3.png" },
    { id: 2, patientName: "Liam Johnson", requestedDateTime: "Mar 4, 2025 - 2:15 PM", reasonForVisit: "Persistent headaches", avatar: "/assets/doctor1.png" },
  ]

  const confirmedAppointments = [
    { id: 3, patientName: "Sophia Martinez", dateTime: "Mar 2, 2025 - 9:00 AM", status: "Upcoming", condition: "Diabetes follow-up", avatar: "/api/placeholder/32/32" },
    { id: 4, patientName: "Noah Davis", dateTime: "Mar 2, 2025 - 11:45 AM", status: "Upcoming", condition: "Hypertension", avatar: "/api/placeholder/32/32" },
    { id: 5, patientName: "Olivia Brown", dateTime: "Mar 1, 2025 - 3:30 PM", status: "In Progress", condition: "Pregnancy check", avatar: "/api/placeholder/32/32" },
  ]

  const completedAppointments = [
    { id: 6, patientName: "William Taylor", date: "Feb 28, 2025", condition: "Respiratory infection", notes: "", avatar: "/api/placeholder/32/32" },
    { id: 7, patientName: "Ava Miller", date: "Feb 27, 2025", condition: "Post-surgery follow-up", notes: "Patient recovering well. Continue current medication for two more weeks.", avatar: "/api/placeholder/32/32" },
  ]

  const handleApprove = (id) => {
    // Logic to approve appointment
    console.log(`Appointment ${id} approved`)
  }

  const handleReject = (id) => {
    // Logic to reject appointment
    console.log(`Appointment ${id} rejected`)
  }

  const handleAddNotes = (appointment) => {
    setSelectedAppointment(appointment)
    setIsAddingNotes(true)
  }

  const handleRequestTests = (appointment) => {
    setSelectedAppointment(appointment)
    setIsRequestingTests(true)
  }

  const handleSaveNotes = () => {
    // Logic to save notes
    console.log(`Notes saved for appointment ${selectedAppointment.id}`)
    setIsAddingNotes(false)
  }

  const handleSubmitTestsRequest = () => {
    // Logic to submit tests request
    console.log(`Tests requested for appointment ${selectedAppointment.id}`)
    setIsRequestingTests(false)
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-6 pt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-green-600">Appointments</h1>
        <p className="text-gray-500 mt-1">Manage and schedule patient visits.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white border-gray-200 shadow-sm col-span-1">
          <CardHeader className="pb-2">
            <CardTitle className="text-green-600">Your Availability</CardTitle>
            <CardDescription className="text-gray-500">Set your working hours and availability status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="availability" className="text-gray-700 font-medium">Available for Appointments</Label>
                <p className="text-gray-500 text-sm">Toggle to show your availability</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="availability" 
                  checked={isAvailable} 
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-green-600"
                />
                <span className={isAvailable ? "text-green-600 font-medium" : "text-gray-500"}>
                  {isAvailable ? "Available" : "Busy"}
                </span>
              </div>
            </div>
            
            <Separator className="bg-gray-200" />
            
            <div>
              <Label className="text-gray-700 font-medium block mb-2">Preferred Working Hours</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Weekdays</p>
                  <p className="text-gray-700 font-medium">9:00 AM - 5:00 PM</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-md">
                  <p className="text-sm text-gray-500">Weekends</p>
                  <p className="text-gray-700 font-medium">10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <Calendar 
              className="rounded-md border-gray-200 text-gray-800"
              selected={new Date()}
              mode="single"
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
              Update Availability
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-white border-gray-200 shadow-sm col-span-1 lg:col-span-2">
          <Tabs defaultValue="pending" className="w-full">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-600">Appointment Requests</CardTitle>
                <TabsList className="bg-gray-100">
                  <TabsTrigger value="pending" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="confirmed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">
                    Confirmed
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-gray-700">
                    Completed
                  </TabsTrigger>
                </TabsList>
              </div>
              <CardDescription className="text-gray-500 mt-1">Review and manage appointment requests</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <TabsContent value="pending" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableHead className="text-gray-600">Patient</TableHead>
                      <TableHead className="text-gray-600">Requested Date & Time</TableHead>
                      <TableHead className="text-gray-600">Reason for Visit</TableHead>
                      <TableHead className="text-gray-600 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-gray-200 text-gray-700 hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Avatar className="border border-gray-200">
                              <img src={appointment.avatar} alt={appointment.patientName} />
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span>{appointment.requestedDateTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.reasonForVisit}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleApprove(appointment.id)}
                              className="border-green-600 text-green-600 hover:bg-green-50"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleReject(appointment.id)}
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <XCircle className="mr-1 h-4 w-4" />
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                {pendingAppointments.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-8 text-gray-500">
                    <Users className="h-12 w-12 mb-2 opacity-50" />
                    <p>No pending appointment requests</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="confirmed" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableHead className="text-gray-600">Patient</TableHead>
                      <TableHead className="text-gray-600">Date & Time</TableHead>
                      <TableHead className="text-gray-600">Condition</TableHead>
                      <TableHead className="text-gray-600">Status</TableHead>
                      <TableHead className="text-gray-600 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {confirmedAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Avatar className="border border-gray-200">
                              <img src={appointment.avatar} alt={appointment.patientName} />
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span>{appointment.dateTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.condition}</TableCell>
                        <TableCell>
                          <Badge className={appointment.status === "In Progress" ? "bg-amber-100 text-amber-700 hover:bg-amber-200" : "bg-green-100 text-green-700 hover:bg-green-200"}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRequestTests(appointment)}
                              className="border-green-600 text-green-600 hover:bg-green-50"
                            >
                              <FileSearch className="mr-1 h-4 w-4" />
                              Request Tests
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-gray-300 text-gray-700 hover:bg-gray-50"
                            >
                              <RotateCcw className="mr-1 h-4 w-4" />
                              Reschedule
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>

              <TabsContent value="completed" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-gray-200 hover:bg-gray-50">
                      <TableHead className="text-gray-600">Patient</TableHead>
                      <TableHead className="text-gray-600">Date</TableHead>
                      <TableHead className="text-gray-600">Condition Discussed</TableHead>
                      <TableHead className="text-gray-600 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-gray-200 hover:bg-gray-50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Avatar className="border border-gray-200">
                              <img src={appointment.avatar} alt={appointment.patientName} />
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4 text-gray-500" />
                            <span>{appointment.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.condition}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAddNotes(appointment)}
                            className="border-green-600 text-green-600 hover:bg-green-50"
                          >
                            <FileText className="mr-1 h-4 w-4" />
                            {appointment.notes ? "View Notes" : "Add Notes"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>

      {/* Add floating action button for quick actions */}
      <div className="fixed bottom-6 right-6">
        <Button className="h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-lg">
          <Plus className="h-6 w-6 text-white" />
        </Button>
      </div>

      {/* Add Notes Dialog */}
      <Dialog open={isAddingNotes} onOpenChange={setIsAddingNotes}>
        <DialogContent className="bg-white border-gray-200 text-gray-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">{selectedAppointment ? `Notes for ${selectedAppointment.patientName}` : 'Add Notes'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="appointment-notes" className="text-gray-700">Post-Appointment Notes & Recommendations</Label>
              <Textarea
                id="appointment-notes"
                placeholder="Enter detailed notes about the appointment and any recommendations..."
                className="min-h-32 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus-visible:ring-green-600"
                defaultValue={selectedAppointment?.notes || ''}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddingNotes(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNotes}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Tests Dialog */}
      <Dialog open={isRequestingTests} onOpenChange={setIsRequestingTests}>
        <DialogContent className="bg-white border-gray-200 text-gray-800 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-600">{`Request Tests for ${selectedAppointment?.patientName || ''}`}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="test-type" className="text-gray-700">Test Type</Label>
              <select 
                id="test-type" 
                className="bg-white border-gray-300 text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              >
                <option value="blood">Blood Test</option>
                <option value="xray">X-Ray</option>
                <option value="mri">MRI Scan</option>
                <option value="ct">CT Scan</option>
                <option value="ultrasound">Ultrasound</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="test-notes" className="text-gray-700">Additional Instructions</Label>
              <Textarea
                id="test-notes"
                placeholder="Enter any specific instructions or areas of focus for this test..."
                className="min-h-24 bg-white border-gray-300 text-gray-800 placeholder:text-gray-400 focus-visible:ring-green-600"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-gray-700 flex items-center">
                <Switch 
                  className="mr-2 data-[state=checked]:bg-green-600" 
                  defaultChecked 
                />
                Notify patient immediately
              </Label>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRequestingTests(false)}
              className="border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitTestsRequest}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Request Tests
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}