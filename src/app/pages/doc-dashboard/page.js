// app/dashboard/appointments/page.jsx
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
    <div className="min-h-screen bg-[#121212] text-zinc-100 p-6 pt-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">Appointments</h1>
        <p className="text-zinc-400 mt-1">Manage and schedule patient visits.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <Card className="bg-zinc-900 border-zinc-800 col-span-1">
          <CardHeader>
            <CardTitle className="text-green-400">Your Availability</CardTitle>
            <CardDescription className="text-zinc-400">Set your working hours and availability status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="availability" className="text-zinc-300">Available for Appointments</Label>
                <p className="text-zinc-500 text-sm">Toggle to show your availability</p>
              </div>
              <div className="flex items-center space-x-2">
                <Switch 
                  id="availability" 
                  checked={isAvailable} 
                  onCheckedChange={setIsAvailable}
                  className="data-[state=checked]:bg-green-500"
                />
                <span className={isAvailable ? "text-green-400" : "text-zinc-500"}>
                  {isAvailable ? "Available" : "Busy"}
                </span>
              </div>
            </div>
            
            <Separator className="bg-zinc-800" />
            
            <div>
              <Label className="text-zinc-300 block mb-2">Preferred Working Hours</Label>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-zinc-800 p-3 rounded-md">
                  <p className="text-sm text-zinc-400">Weekdays</p>
                  <p className="text-zinc-300">9:00 AM - 5:00 PM</p>
                </div>
                <div className="bg-zinc-800 p-3 rounded-md">
                  <p className="text-sm text-zinc-400">Weekends</p>
                  <p className="text-zinc-300">10:00 AM - 2:00 PM</p>
                </div>
              </div>
            </div>
            
            <Calendar 
              className="bg-zinc-800 rounded-md border-zinc-700 text-zinc-300"
              selected={new Date()}
              mode="single"
            />
          </CardContent>
          <CardFooter>
            <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-green-900 border-0">
              Update Availability
            </Button>
          </CardFooter>
        </Card>

        <Card className="bg-zinc-900 border-zinc-800 col-span-1 lg:col-span-2">
          <Tabs defaultValue="pending" className="w-full">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-green-400">Appointment Requests</CardTitle>
                <TabsList className="bg-zinc-800">
                  <TabsTrigger value="pending" className="data-[state=active]:bg-green-500 data-[state=active]:text-green-900 text-zinc-300">
                    Pending
                  </TabsTrigger>
                  <TabsTrigger value="confirmed" className="data-[state=active]:bg-green-500 data-[state=active]:text-green-900 text-zinc-300">
                    Confirmed
                  </TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-green-500 data-[state=active]:text-green-900 text-zinc-300">
                    Completed
                  </TabsTrigger>
                </TabsList>
              </div>
              <CardDescription className="text-zinc-400 mt-1">Review and manage appointment requests</CardDescription>
            </CardHeader>

            <CardContent className="pt-6">
              <TabsContent value="pending" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Patient</TableHead>
                      <TableHead className="text-zinc-400">Requested Date & Time</TableHead>
                      <TableHead className="text-zinc-400">Reason for Visit</TableHead>
                      <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-zinc-800 text-zinc-100 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2 text-zinc-100">
                            <Avatar>
                              <img src={appointment.avatar} alt={appointment.patientName} />
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4 text-zinc-100" />
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
                              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-green-900"
                            >
                              <CheckCircle className="mr-1 h-4 w-4" />
                              Approve
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleReject(appointment.id)}
                              className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-green-900"
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
                  <div className="flex flex-col items-center justify-center py-8 text-zinc-500">
                    <Users className="h-12 w-12 mb-2 opacity-50" />
                    <p>No pending appointment requests</p>
                  </div>
                )}
              </TabsContent>

              <TabsContent value="confirmed" className="m-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Patient</TableHead>
                      <TableHead className="text-zinc-400">Date & Time</TableHead>
                      <TableHead className="text-zinc-400">Condition</TableHead>
                      <TableHead className="text-zinc-400">Status</TableHead>
                      <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {confirmedAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <img src={appointment.avatar} alt={appointment.patientName} />
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-4 w-4 text-zinc-500" />
                            <span>{appointment.dateTime}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.condition}</TableCell>
                        <TableCell>
                          <Badge className={appointment.status === "In Progress" ? "bg-amber-500/20 text-amber-500 hover:bg-amber-500/30" : "bg-emerald-500/20 text-emerald-500 hover:bg-emerald-500/30"}>
                            {appointment.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleRequestTests(appointment)}
                              className="border-green-500 text-green-400 hover:bg-green-500 hover:text-green-900"
                            >
                              <FileSearch className="mr-1 h-4 w-4" />
                              Request Tests
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-green-900"
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
                    <TableRow className="border-zinc-800 hover:bg-zinc-800/50">
                      <TableHead className="text-zinc-400">Patient</TableHead>
                      <TableHead className="text-zinc-400">Date</TableHead>
                      <TableHead className="text-zinc-400">Condition Discussed</TableHead>
                      <TableHead className="text-zinc-400 text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {completedAppointments.map((appointment) => (
                      <TableRow key={appointment.id} className="border-zinc-800 hover:bg-zinc-800/50">
                        <TableCell className="font-medium">
                          <div className="flex items-center space-x-2">
                            <Avatar>
                              <img src={appointment.avatar} alt={appointment.patientName} />
                            </Avatar>
                            <span>{appointment.patientName}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-1">
                            <CalendarIcon className="h-4 w-4 text-zinc-500" />
                            <span>{appointment.date}</span>
                          </div>
                        </TableCell>
                        <TableCell>{appointment.condition}</TableCell>
                        <TableCell className="text-right">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleAddNotes(appointment)}
                            className="border-green-500 text-green-400 hover:bg-green-500 hover:text-green-900"
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

      {/* Bottom sticky action bar */}
      {/* <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-zinc-900/80 backdrop-blur-md rounded-full border border-zinc-800 shadow-lg">
        <div className="flex items-center space-x-4">
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
            <Calendar className="mr-2 h-4 w-4 text-green-400" />
            Set Availability
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
            <Clock className="mr-2 h-4 w-4 text-green-400" />
            View Upcoming
          </Button>
          <Button className="bg-zinc-800 hover:bg-zinc-700 text-zinc-300">
            <FileText className="mr-2 h-4 w-4 text-green-400" />
            Add Notes
          </Button>
          <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-green-900 border-0">
            <Plus className="mr-2 h-4 w-4" />
            New Appointment
          </Button>
        </div>
      </div> */}

      {/* Add Notes Dialog */}
      <Dialog open={isAddingNotes} onOpenChange={setIsAddingNotes}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-400">{selectedAppointment ? `Notes for ${selectedAppointment.patientName}` : 'Add Notes'}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="appointment-notes" className="text-zinc-300">Post-Appointment Notes & Recommendations</Label>
              <Textarea
                id="appointment-notes"
                placeholder="Enter detailed notes about the appointment and any recommendations..."
                className="min-h-32 bg-zinc-800 border-zinc-700 text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-green-500"
                defaultValue={selectedAppointment?.notes || ''}
              />
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsAddingNotes(false)}
              className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-green-900"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSaveNotes}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-green-900 border-0"
            >
              Save Notes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Tests Dialog */}
      <Dialog open={isRequestingTests} onOpenChange={setIsRequestingTests}>
        <DialogContent className="bg-zinc-900 border-zinc-800 text-zinc-100 sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-green-400">{`Request Tests for ${selectedAppointment?.patientName || ''}`}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="test-type" className="text-zinc-300">Test Type</Label>
              <select 
                id="test-type" 
                className="bg-zinc-800 border-zinc-700 text-zinc-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="blood">Blood Test</option>
                <option value="xray">X-Ray</option>
                <option value="mri">MRI Scan</option>
                <option value="ct">CT Scan</option>
                <option value="ultrasound">Ultrasound</option>
              </select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="test-notes" className="text-zinc-300">Additional Instructions</Label>
              <Textarea
                id="test-notes"
                placeholder="Enter any specific instructions or areas of focus for this test..."
                className="min-h-24 bg-zinc-800 border-zinc-700 text-zinc-300 placeholder:text-zinc-500 focus-visible:ring-green-500"
              />
            </div>
            <div className="grid gap-2">
              <Label className="text-zinc-300 flex items-center">
                <Switch 
                  className="mr-2 data-[state=checked]:bg-green-500" 
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
              className="border-zinc-700 text-zinc-400 hover:bg-zinc-700 hover:text-green-900"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSubmitTestsRequest}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-green-900 border-0"
            >
              Request Tests
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}