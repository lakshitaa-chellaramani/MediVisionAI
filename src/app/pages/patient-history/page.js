"use client"
import React, { useState } from 'react';
import { Search, Calendar, Filter, ChevronDown, FileText, Xray, Flask, RefreshCw, Edit3, Clock, AlertCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';

const PatientHistoryPage = () => {
  // Sample data
  const patients = [
    {
      id: 1,
      name: "Aarav Mehta",
      age: 35,
      gender: "Male",
      condition: "Hypertension",
      lastVisit: "Feb 10, 2025",
      bloodGroup: "B+",
      allergies: ["Penicillin", "Peanuts"],
      medicalHistory: [
        { date: "Feb 10, 2025", type: "Consultation", doctor: "Dr. Patel", description: "Blood pressure: 140/90. Recommended lifestyle changes and continued medication." },
        { date: "Dec 15, 2024", type: "Prescription", doctor: "Dr. Patel", description: "Prescribed Amlodipine 5mg daily for hypertension management." },
        { date: "Dec 05, 2024", type: "Lab Test", doctor: "Dr. Sharma", description: "Cholesterol levels: Total 220, LDL: 140, HDL: 45. Recommended diet modification." },
        { date: "Oct 22, 2024", type: "Consultation", doctor: "Dr. Patel", description: "Initial diagnosis of hypertension. Blood pressure: 150/95." }
      ],
      medications: [
        { name: "Amlodipine", dosage: "5mg", frequency: "Once daily", startDate: "Dec 15, 2024", endDate: "Ongoing" },
        { name: "Atorvastatin", dosage: "10mg", frequency: "Once daily", startDate: "Dec 15, 2024", endDate: "Ongoing" }
      ],
      reports: [
        { id: 1, name: "Blood Test Report", date: "Dec 05, 2024", type: "Lab" },
        { id: 2, name: "ECG Report", date: "Oct 22, 2024", type: "Cardiac" }
      ],
      insights: "Patient shows improving blood pressure trends but cholesterol levels remain above optimal range. Consider dietary counseling.",
      notes: "Patient has been compliant with medication. Needs to improve exercise routine and reduce salt intake.",
      appointments: [
        { date: "Mar 15, 2025", time: "10:30 AM", doctor: "Dr. Patel", type: "Follow-up" }
      ]
    },
    {
      id: 2,
      name: "Meera Shah",
      age: 29,
      gender: "Female",
      condition: "Migraine",
      lastVisit: "Jan 25, 2025",
      bloodGroup: "A-",
      allergies: ["Sulfa Drugs"],
      medicalHistory: [
        { date: "Jan 25, 2025", type: "Consultation", doctor: "Dr. Khan", description: "Experiencing 2-3 migraine episodes weekly. Sleep pattern disturbed." },
        { date: "Jan 10, 2025", type: "Prescription", doctor: "Dr. Khan", description: "Prescribed Sumatriptan 50mg as needed for acute migraine attacks." },
        { date: "Jan 05, 2025", type: "Lab Test", doctor: "Dr. Mehra", description: "Blood tests normal. No underlying conditions detected." },
        { date: "Dec 15, 2024", type: "Consultation", doctor: "Dr. Khan", description: "First consultation for recurring migraine. Reports visual aura before onset." }
      ],
      medications: [
        { name: "Sumatriptan", dosage: "50mg", frequency: "As needed for migraine", startDate: "Jan 10, 2025", endDate: "Ongoing" },
        { name: "Propranolol", dosage: "40mg", frequency: "Once daily", startDate: "Jan 25, 2025", endDate: "Ongoing" }
      ],
      reports: [
        { id: 1, name: "MRI Brain", date: "Jan 15, 2025", type: "Imaging" },
        { id: 2, name: "Blood Test Report", date: "Jan 05, 2025", type: "Lab" }
      ],
      insights: "Migraine frequency correlates with stress levels and irregular sleep patterns. Prophylactic medication showing limited effectiveness.",
      notes: "Patient keeps a migraine diary. Triggers include lack of sleep, bright lights, and stress at work.",
      appointments: [
        { date: "Mar 05, 2025", time: "2:00 PM", doctor: "Dr. Khan", type: "Follow-up" }
      ]
    }
  ];

  const [selectedPatient, setSelectedPatient] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [doctorNotes, setDoctorNotes] = useState("");

  // Select patient handler
  const handleSelectPatient = (patientId) => {
    const patient = patients.find(p => p.id === parseInt(patientId));
    setSelectedPatient(patient);
    setDoctorNotes(patient?.notes || "");
  };

  // Simple dropdown component to replace Select from shadcn
  const PatientDropdown = ({ onSelect }) => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div className="relative ">
        <button
          className="w-full flex items-center justify-between border rounded-md p-2 bg-white"
          onClick={() => setIsOpen(!isOpen)}
        >
          <span>{selectedPatient?.name || "Select a patient"}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white border rounded-md shadow-lg">
            {patients.map(patient => (
              <div 
                key={patient.id}
                className="p-2 hover:bg-green-50 cursor-pointer"
                onClick={() => {
                  onSelect(patient.id.toString());
                  setIsOpen(false);
                }}
              >
                {patient.name} 
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pt-16">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-green-700">Patient History</h1>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search patients..."
                className="pl-8 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Filter className="h-4 w-4" />
              <span>Filter</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 flex-1">
        <div className="grid grid-cols-12 gap-6">
          {/* Sidebar - Patient Selection */}
          <div className="col-span-12 md:col-span-3">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Recently Viewed</CardTitle>
                <CardDescription>Select a patient to view details</CardDescription>
              </CardHeader>
              <CardContent>
                <PatientDropdown onSelect={handleSelectPatient} />

                <div className="mt-4 space-y-3">
                  {patients.map(patient => (
                    <Card 
                      key={patient.id} 
                      className={`cursor-pointer hover:bg-green-50 transition-colors ${selectedPatient?.id === patient.id ? 'border-green-500 bg-green-50' : ''}`}
                      onClick={() => handleSelectPatient(patient.id)}
                    >
                      <CardContent className="p-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{patient.name}</p>
                            <p className="text-sm text-gray-500">ID: {patient.id} | Age: {patient.age}</p>
                            <p className="text-sm text-gray-500">Last Visit: {patient.lastVisit}</p>
                            <Badge variant="outline" className="mt-1 bg-green-50 text-green-700 border-green-200">
                              {patient.condition}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content - Patient Details */}
          <div className="col-span-12 md:col-span-9">
            {selectedPatient ? (
              <div className="space-y-6">
                {/* Basic Info Card */}
                <Card>
                  <CardHeader className="bg-green-50 border-b">
                    <div className="flex justify-between items-center">
                      <div>
                        <CardTitle className="text-2xl text-green-800">{selectedPatient.name}</CardTitle>
                        <CardDescription className="text-gray-600">
                          {selectedPatient.age} years • {selectedPatient.gender} • Blood Group: {selectedPatient.bloodGroup}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                          {selectedPatient.condition}
                        </Badge>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Edit3 className="h-4 w-4" />
                          <span>Edit</span>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="p-4">
                    <div className="flex space-x-6">
                      <div>
                        <p className="text-sm font-medium text-gray-500">Patient ID</p>
                        <p>{selectedPatient.id}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Last Visit</p>
                        <p>{selectedPatient.lastVisit}</p>
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-500">Allergies</p>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedPatient.allergies.map((allergy, index) => (
                            <Badge key={index} variant="secondary" className="bg-red-50 text-red-700 border-red-200">
                              {allergy}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Tabs for Different Sections */}
                <Tabs defaultValue="timeline">
                  <TabsList className="grid grid-cols-5 mb-4">
                    <TabsTrigger value="timeline">Timeline</TabsTrigger>
                    <TabsTrigger value="medications">Medications</TabsTrigger>
                    <TabsTrigger value="reports">Reports</TabsTrigger>
                    <TabsTrigger value="insights">AI Insights</TabsTrigger>
                    <TabsTrigger value="appointments">Appointments</TabsTrigger>
                  </TabsList>

                  {/* Medical History Timeline */}
                  <TabsContent value="timeline">
                    <Card>
                      <CardHeader>
                        <CardTitle>Medical History Timeline</CardTitle>
                        <CardDescription>Chronological record of patient's medical events</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-96 pr-4">
                          <div className="space-y-4">
                            {selectedPatient.medicalHistory.map((event, index) => (
                              <div key={index} className="relative pl-6 pb-4">
                                <div className="absolute left-0 top-1 w-3 h-3 rounded-full bg-green-500"></div>
                                {index !== selectedPatient.medicalHistory.length - 1 && (
                                  <div className="absolute left-1.5 top-4 w-0.5 h-full bg-gray-200"></div>
                                )}
                                <div className="bg-white rounded-lg border p-3 shadow-sm">
                                  <div className="flex justify-between items-start">
                                    <div>
                                      <p className="font-medium text-green-700">{event.type}</p>
                                      <p className="text-sm text-gray-500">{event.date} • {event.doctor}</p>
                                    </div>
                                    <Badge variant="outline" className="bg-green-50 text-green-700">
                                      {event.type}
                                    </Badge>
                                  </div>
                                  <p className="mt-2 text-gray-700">{event.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Medications */}
                  <TabsContent value="medications">
                    <Card>
                      <CardHeader>
                        <CardTitle>Current Medications</CardTitle>
                        <CardDescription>Active prescriptions and medication history</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedPatient.medications.map((medication, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div>
                                    <p className="font-medium text-green-700">{medication.name}</p>
                                    <p className="text-sm">{medication.dosage} • {medication.frequency}</p>
                                    <p className="text-sm text-gray-500">
                                      Start: {medication.startDate} • End: {medication.endDate}
                                    </p>
                                  </div>
                                  <Badge className={medication.endDate === "Ongoing" ? "bg-green-500 text-white" : "bg-gray-200"}>
                                    {medication.endDate === "Ongoing" ? "Active" : "Completed"}
                                  </Badge>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Lab Reports & Scans */}
                  <TabsContent value="reports">
                    <Card>
                      <CardHeader>
                        <CardTitle>Lab Reports & Scans</CardTitle>
                        <CardDescription>Medical test results and imaging</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {selectedPatient.reports.map((report) => (
                            <Card key={report.id}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    {report.type === "Lab" ? (
                                      <div className="bg-blue-100 p-2 rounded-full">
                                        <Flask className="h-5 w-5 text-blue-600" />
                                      </div>
                                    ) : report.type === "Imaging" ? (
                                      <div className="bg-purple-100 p-2 rounded-full">
                                        <Xray className="h-5 w-5 text-purple-600" />
                                      </div>
                                    ) : (
                                      <div className="bg-orange-100 p-2 rounded-full">
                                        <FileText className="h-5 w-5 text-orange-600" />
                                      </div>
                                    )}
                                    <div>
                                      <p className="font-medium">{report.name}</p>
                                      <p className="text-sm text-gray-500">{report.date}</p>
                                    </div>
                                  </div>
                                  <Button size="sm">Preview</Button>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* AI Insights */}
                  <TabsContent value="insights">
                    <Card>
                      <CardHeader className="bg-green-50 border-b">
                        <CardTitle className="flex items-center gap-2">
                          <RefreshCw className="h-5 w-5 text-green-700" />
                          AI Health Insights
                        </CardTitle>
                        <CardDescription>Generated using MediVisionAI analytics</CardDescription>
                      </CardHeader>
                      <CardContent className="p-6">
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
                          <p className="text-green-800">{selectedPatient.insights}</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Health Trends</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <div className="h-40 flex items-center justify-center text-gray-500">
                                <p>Health trend visualization would appear here</p>
                              </div>
                            </CardContent>
                          </Card>
                          
                          <Card>
                            <CardHeader className="pb-2">
                              <CardTitle className="text-base">Recommendations</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-2">
                                <li className="flex items-start gap-2">
                                  <AlertCircle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                                  <span>Schedule follow-up within 30 days</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <AlertCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                                  <span>Continue current medication regimen</span>
                                </li>
                                <li className="flex items-start gap-2">
                                  <AlertCircle className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                  <span>Consider dietary consultation</span>
                                </li>
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* Appointments */}
                  <TabsContent value="appointments">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Appointments</CardTitle>
                        <CardDescription>Scheduled consultations and follow-ups</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {selectedPatient.appointments.map((appointment, index) => (
                            <Card key={index}>
                              <CardContent className="p-4">
                                <div className="flex justify-between items-start">
                                  <div className="flex items-center gap-3">
                                    <div className="bg-green-100 p-2 rounded-full">
                                      <Calendar className="h-5 w-5 text-green-600" />
                                    </div>
                                    <div>
                                      <p className="font-medium">{appointment.type} with {appointment.doctor}</p>
                                      <p className="text-sm text-gray-500">{appointment.date} at {appointment.time}</p>
                                    </div>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button variant="outline" size="sm">Reschedule</Button>
                                    <Button variant="destructive" size="sm">Cancel</Button>
                                  </div>
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>

                {/* Doctor Notes Section */}
                <Card>
                  <CardHeader>
                    <CardTitle>Doctor Notes</CardTitle>
                    <CardDescription>Add or update medical notes for this patient</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Add your clinical notes here..."
                      value={doctorNotes}
                      onChange={(e) => setDoctorNotes(e.target.value)}
                      rows={4}
                      className="resize-none"
                    />
                  </CardContent>
                  <CardFooter className="flex justify-end space-x-2">
                    <Button variant="outline">Discard Changes</Button>
                    <Button className="bg-green-600 hover:bg-green-700">Save Notes</Button>
                  </CardFooter>
                </Card>
              </div>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="py-12 text-center">
                  <div className="mx-auto bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mb-4">
                    <FileText className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">No Patient Selected</h3>
                  <p className="text-gray-500 max-w-md mx-auto">
                    Please select a patient from the list to view their complete medical history and details.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PatientHistoryPage;