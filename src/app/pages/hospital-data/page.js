'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { 
  Building2, Users, Star, MapPin, Phone, Mail, Search, 
  PlusCircle, FileSpreadsheet, Calendar, Activity, 
  Bed, Edit, Filter, ArrowDownUp, MoreHorizontal, 
  ChevronDown, Briefcase
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function HospitalDataPage() {
  const [selectedHospital, setSelectedHospital] = useState(null)
  const [showAddDoctorDialog, setShowAddDoctorDialog] = useState(false)
  const [showHospitalDetailsDialog, setShowHospitalDetailsDialog] = useState(false)
  const [activeView, setActiveView] = useState('grid')

  // Sample data
  const hospitals = [
    {
      id: 1,
      name: "Kohinoor Hospital",
      location: "Kurla, Mumbai",
      type: "Multispeciality Hospital",
      beds: 175,
      rating: 4.6,
      specialties: ["Cardiology", "Neurology", "Orthopedics", "Urology"],
      doctors: 150,
      contact: {
        phone: "+91 22 6755 6755",
        email: "info@kohinoorhospitals.in",
        address: "Kohinoor City, Off LBS Road, Kurla West, Mumbai 400070"
      },
      image: "/assets/hospital1.jpg"
    },
    {
      id: 2,
      name: "Phoenix Hospital",
      location: "Kurla, Mumbai",
      type: "General Hospital",
      beds: 100,
      rating: 4.3,
      specialties: ["Emergency Care", "General Surgery", "Gynecology"],
      doctors: 75,
      contact: {
        phone: "+91 22 2503 3000",
        email: "contact@phoenixhospital.in",
        address: "Kurla East, Mumbai 400024"
      },
      image: "/assets/hospital2.jpg"
    },
    {
      id: 3,
      name: "Aryan Hospital",
      location: "Kurla, Mumbai",
      type: "Multispeciality Hospital",
      beds: 120,
      rating: 4.4,
      specialties: ["Orthopedics", "ENT", "Nephrology", "Pediatrics"],
      doctors: 90,
      contact: {
        phone: "+91 22 2654 7890",
        email: "info@aryanhospital.com",
        address: "LBS Road, Kurla West, Mumbai 400070"
      },
      image: "/assets/hospital3.jpg"
    },
    {
      id: 4,
      name: "Habib Hospital",
      location: "Dongri, near Kurla, Mumbai",
      type: "Community Hospital",
      beds: 80,
      rating: 4.2,
      specialties: ["Internal Medicine", "Dermatology", "Psychiatry"],
      doctors: 60,
      contact: {
        phone: "+91 22 2345 6789",
        email: "support@habibhospital.org",
        address: "Dongri, near Kurla, Mumbai 400009"
      },
      image: "/assets/hospital4.jpg"
    },
    {
      id: 5,
      name: "Holy Sprit Hospital",
      location: "Kurla West, Mumbai",
      type: "General Hospital",
      beds: 200,
      rating: 4.5,
      specialties: ["Cardiology", "Gastroenterology", "Pulmonology"],
      doctors: 120,
      contact: {
        phone: "+91 22 2784 5678",
        email: "care@holycrosshospital.in",
        address: "Kurla West, Mumbai 400070"
      },
      image: "/assets/hospital5.jpg"
    },
    {
      id: 6,
      name: "Dr. L H Hiranandani Hospital",
      location: "Powai, near Kurla, Mumbai",
      type: "Multispeciality Hospital",
      beds: 250,
      rating: 4.7,
      specialties: ["Oncology", "Neurosurgery", "Endocrinology"],
      doctors: 180,
      contact: {
        phone: "+91 22 2576 3300",
        email: "info@hiranandanihospital.org",
        address: "Hill Side Avenue, Powai, Mumbai 400076"
      },
      image: "/assets/hospital6.jpeg"
    },
    {
      id: 7,
      name: "Saifee Hospital",
      location: "Charni Road, near Kurla, Mumbai",
      type: "Private Hospital",
      beds: 300,
      rating: 4.6,
      specialties: ["Cardiology", "Neurosurgery", "Plastic Surgery"],
      doctors: 220,
      contact: {
        phone: "+91 22 6757 0111",
        email: "info@saifeehospital.com",
        address: "Charni Road, Mumbai 400004"
      },
      image: "/assets/hospital7.jpg"
    },
    {
      id: 8,
      name: "Asian Heart Institute",
      location: "Bandra-Kurla Complex, Mumbai",
      type: "Cardiac Hospital",
      beds: 250,
      rating: 4.8,
      specialties: ["Cardiac Surgery", "Preventive Cardiology"],
      doctors: 140,
      contact: {
        phone: "+91 22 6698 6666",
        email: "info@asianheartinstitute.org",
        address: "G Block, BKC, Bandra East, Mumbai 400051"
      },
      image: "/assets/hospital8.jpeg"
    },
    {
      id: 9,
      name: "Tata Memorial Hospital",
      location: "Parel, near Kurla, Mumbai",
      type: "Cancer Hospital",
      beds: 700,
      rating: 4.9,
      specialties: ["Oncology", "Radiotherapy", "Palliative Care"],
      doctors: 300,
      contact: {
        phone: "+91 22 2417 7000",
        email: "info@tmc.gov.in",
        address: "Dr. E Borges Road, Parel, Mumbai 400012"
      },
      image: "/assets/hospital9.jpg"
    },
    // {
    //   id: 10,
    //   name: "Lilavati Hospital and Research Centre",
    //   location: "Bandra, near Kurla, Mumbai",
    //   type: "Multispeciality Hospital",
    //   beds: 350,
    //   rating: 4.6,
    //   specialties: ["Cardiology", "Gastroenterology", "Oncology"],
    //   doctors: 250,
    //   contact: {
    //     phone: "+91 22 2675 1000",
    //     email: "info@lilavatihospital.com",
    //     address: "A-791, Bandra Reclamation, Bandra West, Mumbai 400050"
    //   },
    //   image: "/assets/hospital1.jpg"
    // }
  ];
  

  const doctors = [
    { id: 1, name: "Dr. Rajesh Sharma", specialty: "Cardiology", hospitalId: 1, avatar: "/assets/doctor1.png", yearsExperience: 12, patients: 142, rating: 4.9 },
    { id: 2, name: "Dr. Anjali Mehta", specialty: "Neurology", hospitalId: 1, avatar: "/assets/doctor3.png", yearsExperience: 8, patients: 98, rating: 4.7 },
    { id: 3, name: "Dr. Vikram Nair", specialty: "Oncology", hospitalId: 1, avatar: "/assets/doctor1.png", yearsExperience: 15, patients: 173, rating: 4.8 },
    { id: 4, name: "Dr. Priya Deshmukh", specialty: "Pediatrics", hospitalId: 1, avatar: "/assets/doctor4.png", yearsExperience: 9, patients: 110, rating: 4.9 },
    { id: 5, name: "Dr. Amit Verma", specialty: "Family Medicine", hospitalId: 2, avatar: "/assets/doctor2.png", yearsExperience: 7, patients: 215, rating: 4.6 },
    { id: 6, name: "Dr. Neha Kulkarni", specialty: "Emergency Care", hospitalId: 2, avatar: "/assets/doctor2.png", yearsExperience: 11, patients: 160, rating: 4.5 },
    { id: 7, name: "Dr. Ramesh Iyer", specialty: "Orthopedics", hospitalId: 2, avatar: "/assets/doctor1.png", yearsExperience: 14, patients: 128, rating: 4.4 },
    { id: 8, name: "Dr. Kavita Joshi", specialty: "Pediatric Surgery", hospitalId: 3, avatar: "/assets/doctor2.png", yearsExperience: 17, patients: 89, rating: 4.9 },
    { id: 9, name: "Dr. Arjun Kapoor", specialty: "Neonatology", hospitalId: 3, avatar: "/assets/doctor2.png", yearsExperience: 13, patients: 104, rating: 4.8 },
    { id: 10, name: "Dr. Sangeeta Rao", specialty: "Trauma Care", hospitalId: 4, avatar: "/assets/doctor3.png", yearsExperience: 10, patients: 132, rating: 4.5 },
    { id: 11, name: "Dr. Manoj Pandey", specialty: "Cardiology", hospitalId: 4, avatar: "/assets/doctor1.png", yearsExperience: 16, patients: 158, rating: 4.7 },
];


  const handleViewHospitalDetails = (hospital) => {
    setSelectedHospital(hospital)
    setShowHospitalDetailsDialog(true)
  }
  
  const handleAddDoctor = (hospital) => {
    setSelectedHospital(hospital)
    setShowAddDoctorDialog(true)
  }

  const getHospitalDoctors = (hospitalId) => {
    return doctors.filter(doctor => doctor.hospitalId === hospitalId)
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 text-gray-800 p-6 pt-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-green-600">Hospital Management</h1>
          <p className="text-gray-500 mt-1">Overview of hospital facilities and affiliated medical staff.</p>
        </header>
  
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="relative w-full sm:w-64 lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input 
              placeholder="Search hospitals or doctors..." 
              className="pl-10 bg-white border-gray-200 focus-visible:ring-green-600"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 text-gray-700">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>Filter By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Hospital Type</DropdownMenuItem>
                <DropdownMenuItem>Location</DropdownMenuItem>
                <DropdownMenuItem>Speciality</DropdownMenuItem>
                <DropdownMenuItem>Rating</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="border-gray-200 text-gray-700">
                  <ArrowDownUp className="h-4 w-4 mr-2" />
                  Sort
                  <ChevronDown className="h-4 w-4 ml-2" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Name (A-Z)</DropdownMenuItem>
                <DropdownMenuItem>Name (Z-A)</DropdownMenuItem>
                <DropdownMenuItem>Rating (High-Low)</DropdownMenuItem>
                <DropdownMenuItem>Size (Large-Small)</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
  
            <div className="flex border border-gray-200 rounded-md overflow-hidden">
              <Button 
                variant="ghost" 
                className={`px-3 rounded-none ${activeView === 'grid' ? 'bg-green-50 text-green-600' : 'text-gray-500'}`}
                onClick={() => setActiveView('grid')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7"></rect>
                  <rect x="14" y="3" width="7" height="7"></rect>
                  <rect x="3" y="14" width="7" height="7"></rect>
                  <rect x="14" y="14" width="7" height="7"></rect>
                </svg>
              </Button>
              <Button 
                variant="ghost" 
                className={`px-3 rounded-none ${activeView === 'list' ? 'bg-green-50 text-green-600' : 'text-gray-500'}`}
                onClick={() => setActiveView('list')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              </Button>
            </div>
  
            <Button className="bg-green-600 hover:bg-green-700 text-white gap-2">
              <PlusCircle className="h-4 w-4" />
              Add Hospital
            </Button>
          </div>
        </div>
  
        {activeView === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {hospitals.map(hospital => (
              <Card key={hospital.id} className="bg-white border-gray-200 shadow-sm overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img src={hospital.image} alt={hospital.name} className="w-full h-full object-cover" />
                </div>
                
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg font-bold text-gray-800">{hospital.name}</CardTitle>
                    <Badge className={`${hospital.type === 'General Hospital' ? 'bg-blue-100 text-blue-800' : hospital.type === 'Community Hospital' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>{hospital.type}</Badge>
                  </div>
                  <CardDescription className="flex items-center text-gray-500">
                    <MapPin className="h-3.5 w-3.5 mr-1" />
                    {hospital.location}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pb-2">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-amber-500">
                      <Star className="fill-current h-4 w-4 mr-1" />
                      <span className="font-medium">{hospital.rating}</span>
                    </div>
                    <div className="flex items-center text-gray-500 gap-4">
                      <div className="flex items-center">
                        <Bed className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{hospital.beds} beds</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-400" />
                        <span>{hospital.doctors} doctors</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-3">
                    <p className="text-xs text-gray-500 mb-1">Specialties</p>
                    <div className="flex flex-wrap gap-1">
                      {hospital.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="bg-gray-50 text-gray-600 border-gray-200 font-normal text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <Separator className="my-3 bg-gray-100" />
                  
                  <p className="text-xs text-gray-500 mb-1">Affiliated Doctors</p>
                  <div className="flex flex-wrap gap-1 mb-1">
                    {getHospitalDoctors(hospital.id).slice(0, 4).map((doctor) => (
                      <Avatar key={doctor.id} className="h-8 w-8 border border-gray-200">
                        <img src={doctor.avatar} alt={doctor.name} />
                      </Avatar>
                    ))}
                    {getHospitalDoctors(hospital.id).length > 4 && (
                      <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs text-gray-500 font-medium">
                        +{getHospitalDoctors(hospital.id).length - 4}
                      </div>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 flex gap-2">
                  <Button 
                    variant="outline" 
                    className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                    onClick={() => handleViewHospitalDetails(hospital)}
                  >
                    View Details
                  </Button>
                  <Button 
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                    onClick={() => handleAddDoctor(hospital)}
                  >
                    Add Doctor
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-white border-gray-200 shadow-sm overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-gray-200 hover:bg-gray-50">
                  <TableHead className="text-gray-600">Hospital Name</TableHead>
                  <TableHead className="text-gray-600">Type</TableHead>
                  <TableHead className="text-gray-600">Location</TableHead>
                  <TableHead className="text-gray-600">Beds</TableHead>
                  <TableHead className="text-gray-600">Rating</TableHead>
                  <TableHead className="text-gray-600">Doctors</TableHead>
                  <TableHead className="text-gray-600">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {hospitals.map((hospital) => (
                  <TableRow key={hospital.id} className="border-gray-200 hover:bg-gray-50">
                    <TableCell className="font-medium">{hospital.name}</TableCell>
                    <TableCell>
                      <Badge className={`${hospital.type === 'General Hospital' ? 'bg-blue-100 text-blue-800' : hospital.type === 'Community Hospital' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                        {hospital.type}
                      </Badge>
                    </TableCell>
                    <TableCell>{hospital.location}</TableCell>
                    <TableCell>{hospital.beds}</TableCell>
                    <TableCell>
                      <div className="flex items-center text-amber-500">
                        <Star className="fill-current h-4 w-4 mr-1" />
                        <span>{hospital.rating}</span>
                      </div>
                    </TableCell>
                    <TableCell>{getHospitalDoctors(hospital.id).length}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="border-gray-200 text-gray-700 hover:bg-gray-50"
                          onClick={() => handleViewHospitalDetails(hospital)}
                        >
                          View
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-white">
                            <DropdownMenuItem onClick={() => handleAddDoctor(hospital)}>
                              <PlusCircle className="h-4 w-4 mr-2" />
                              Add Doctor
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Hospital
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              Remove Hospital
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
  
        {/* Add Doctor Dialog */}
        <Dialog open={showAddDoctorDialog} onOpenChange={setShowAddDoctorDialog}>
          {selectedHospital && (
            <DialogContent className="bg-white border-gray-200 text-gray-800 sm:max-w-md">
              <DialogHeader>
                <DialogTitle className="text-green-600">Add Doctor to {selectedHospital.name}</DialogTitle>
              </DialogHeader>
              
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <Label htmlFor="doctor-name" className="text-gray-700">Doctor Name</Label>
                  <Input 
                    id="doctor-name" 
                    placeholder="Dr. Full Name"
                    className="bg-white border-gray-300 text-gray-800 focus-visible:ring-green-600"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="doctor-specialty" className="text-gray-700">Specialty</Label>
                  <select 
                    id="doctor-specialty" 
                    className="bg-white border-gray-300 text-gray-800 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-600"
                  >
                    {selectedHospital.specialties.map((specialty, i) => (
                      <option key={i} value={specialty}>{specialty}</option>
                    ))}
                    <option value="other">Other Specialty</option>
                  </select>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="experience" className="text-gray-700">Years Experience</Label>
                    <Input 
                      id="experience" 
                      type="number" 
                      min="0"
                      placeholder="Years"
                      className="bg-white border-gray-300 text-gray-800 focus-visible:ring-green-600"
                    />
                  </div>
                  
                  <div className="grid gap-2">
                    <Label htmlFor="license" className="text-gray-700">License Number</Label>
                    <Input 
                      id="license" 
                      placeholder="License #"
                      className="bg-white border-gray-300 text-gray-800 focus-visible:ring-green-600"
                    />
                  </div>
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                  <Input 
                    id="email" 
                    type="email"
                    placeholder="doctor@example.com"
                    className="bg-white border-gray-300 text-gray-800 focus-visible:ring-green-600"
                  />
                </div>
                
                <div className="grid gap-2">
                  <Label htmlFor="phone" className="text-gray-700">Phone Number</Label>
                  <Input 
                    id="phone" 
                    placeholder="(123) 456-7890"
                    className="bg-white border-gray-300 text-gray-800 focus-visible:ring-green-600"
                  />
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowAddDoctorDialog(false)}
                  className="border-gray-300 text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Add Doctor
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
  
        {/* Hospital Details Dialog */}
        <Dialog open={showHospitalDetailsDialog} onOpenChange={setShowHospitalDetailsDialog}>
          {selectedHospital && (
            <DialogContent className="bg-white border-gray-200 text-gray-800 sm:max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-green-600">
                  {selectedHospital.name}
                </DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <img 
                      src={selectedHospital.image} 
                      alt={selectedHospital.name} 
                      className="w-full h-48 object-cover rounded-md border border-gray-200" 
                    />
                    
                    <div className="mt-4 space-y-3">
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <p className="text-gray-600 text-sm">{selectedHospital.contact.address}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-600">{selectedHospital.contact.phone}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-400" />
                        <p className="text-gray-600">{selectedHospital.contact.email}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-1">Hospital Type</h3>
                      <Badge className={`${selectedHospital.type === 'General Hospital' ? 'bg-blue-100 text-blue-800' : selectedHospital.type === 'Community Hospital' ? 'bg-purple-100 text-purple-800' : 'bg-amber-100 text-amber-800'}`}>
                        {selectedHospital.type}
                      </Badge>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Bed Capacity</p>
                        <div className="flex items-center text-gray-800">
                          <Bed className="h-4 w-4 mr-2 text-green-600" />
                          <span className="font-semibold">{selectedHospital.beds}</span>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-md border border-gray-100">
                        <p className="text-sm text-gray-500 mb-1">Rating</p>
                        <div className="flex items-center text-gray-800">
                          <Star className="h-4 w-4 mr-2 text-amber-500 fill-current" />
                          <span className="font-semibold">{selectedHospital.rating}/5.0</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-500 mb-2">Specialties</h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedHospital.specialties.map((specialty, i) => (
                          <Badge key={i} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                <Separator className="bg-gray-200" />
                
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-800">Affiliated Doctors</h3>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-600 border-green-200 hover:bg-green-50"
                      onClick={() => {
                        setShowHospitalDetailsDialog(false);
                        handleAddDoctor(selectedHospital);
                      }}
                    >
                      <PlusCircle className="h-4 w-4 mr-1" />
                      Add Doctor
                    </Button>
                  </div>
                  
                  <div className="max-h-60 overflow-y-auto pr-2">
                    <Table>
                      <TableHeader>
                        <TableRow className="border-gray-200">
                          <TableHead className="text-gray-600">Name</TableHead>
                          <TableHead className="text-gray-600">Specialty</TableHead>
                          <TableHead className="text-gray-600 text-right">Experience</TableHead>
                          <TableHead className="text-gray-600 text-right">Rating</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {getHospitalDoctors(selectedHospital.id).map(doctor => (
                          <TableRow key={doctor.id} className="border-gray-200">
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <Avatar className="h-8 w-8 border border-gray-200">
                                  <img src={doctor.avatar} alt={doctor.name} />
                                </Avatar>
                                <span className="font-medium">{doctor.name}</span>
                              </div>
                            </TableCell>
                            <TableCell>{doctor.specialty}</TableCell>
                            <TableCell className="text-right">{doctor.yearsExperience} years</TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end text-amber-500">
                                <Star className="fill-current h-4 w-4 mr-1" />
                                <span>{doctor.rating}</span>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
              
              <DialogFooter className="gap-2 sm:gap-0">
                <Button 
                  variant="outline" 
                  onClick={() => setShowHospitalDetailsDialog(false)}
                  className="border-gray-200 text-gray-700 hover:bg-gray-50"
                >
                  Close
                </Button>
                <Button className="bg-green-600 hover:bg-green-700 text-white">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit Hospital Details
                </Button>
              </DialogFooter>
            </DialogContent>
          )}
        </Dialog>
      </div>
    </>
  );
    }