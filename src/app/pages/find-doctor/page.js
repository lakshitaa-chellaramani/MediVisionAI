'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectContent, SelectTrigger } from '@/components/ui/select';
import { Pagination, PaginationItem } from '@/components/ui/pagination';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Filter, UserCheck, MapPin, Stethoscope, CheckCircle } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dr. Aisha Kapoor', specialty: 'Cardiologist', location: 'Mumbai', available: true, image: '/assets/doctor1.png' },
  { id: 2, name: 'Dr. Rajesh Malhotra', specialty: 'Neurologist', location: 'Delhi', available: false, image: '/assets/doctor2.png' },
  { id: 3, name: 'Dr. Ananya Sharma', specialty: 'Orthopedic', location: 'Bangalore', available: true, image: '/assets/doctor3.png' },
  { id: 4, name: 'Dr. Vikram Sinha', specialty: 'Radiologist', location: 'Chennai', available: true, image: '/assets/doctor4.png' },
];

export default function FindDoctorsPage() {
  const [filters, setFilters] = useState({ specialty: 'all', location: 'all', available: 'all' });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({ description: '', appointmentType: '' });

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const filteredDoctors = doctors.filter((doctor) => {
    return (
      (filters.specialty === 'all' || doctor.specialty === filters.specialty) &&
      (filters.location === 'all' || doctor.location === filters.location) &&
      (filters.available === 'all' || doctor.available === (filters.available === 'true'))
    );
  });

  return (
    <div className="bg-neutral-900 min-h-screen text-white pt-16">
      {/* Header and Filters Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-green-400">Find Specialists</h1>
        
        <div className="bg-neutral-800 p-6 rounded-xl mb-8 shadow-lg">
          <h2 className="text-lg font-medium mb-4 text-green-300">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Specialty</label>
              <Select defaultValue="all" onValueChange={(value) => handleFilterChange('specialty', value)}>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white w-full">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-green-400" />
                    <span>{filters.specialty === 'all' ? 'All Specialties' : filters.specialty}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectItem value="all">All Specialties</SelectItem>
                  <SelectItem value="Cardiologist">Cardiologist</SelectItem>
                  <SelectItem value="Neurologist">Neurologist</SelectItem>
                  <SelectItem value="Orthopedic">Orthopedic</SelectItem>
                  <SelectItem value="Radiologist">Radiologist</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Location</label>
              <Select defaultValue="all" onValueChange={(value) => handleFilterChange('location', value)}>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>{filters.location === 'all' ? 'All Locations' : filters.location}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="Mumbai">Mumbai</SelectItem>
                  <SelectItem value="Delhi">Delhi</SelectItem>
                  <SelectItem value="Bangalore">Bangalore</SelectItem>
                  <SelectItem value="Chennai">Chennai</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Availability</label>
              <Select defaultValue="all" onValueChange={(value) => handleFilterChange('available', value)}>
                <SelectTrigger className="bg-neutral-700 border-neutral-600 text-white w-full">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{filters.available === 'all' ? 'All' : filters.available === 'true' ? 'Available' : 'Unavailable'}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="bg-green-500 hover:bg-green-600 text-white mt-4 w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" /> Apply Filters
          </Button>
        </div>

        {/* Doctors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {filteredDoctors.map((doctor) => (
            <Card key={doctor.id} className="bg-neutral-800 border-none overflow-hidden rounded-xl shadow-lg hover:shadow-green-900/20 transition-all duration-300">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/3 p-4 flex justify-center items-center bg-neutral-700">
                  <img 
                    src={doctor.image} 
                    alt={doctor.name} 
                    className="w-32 h-32 object-cover rounded-full border-2 border-green-500/20"
                  />
                </div>
                
                <div className="md:w-2/3 p-4">
                  <CardHeader className="p-0 pb-2">
                    <h3 className="text-xl font-semibold text-green-400">{doctor.name}</h3>
                    <div className={`text-xs font-medium rounded-full px-2 py-1 inline-block mt-1 ${doctor.available ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'}`}>
                      {doctor.available ? 'Available' : 'Unavailable'}
                    </div>
                  </CardHeader>
                  
                  <CardContent className="p-0 py-3">
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Stethoscope className="w-4 h-4 text-green-300" />
                        <span className="text-gray-300">{doctor.specialty}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-green-300" />
                        <span className="text-gray-300">{doctor.location}</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-0 pt-3">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          className={`w-full ${doctor.available ? 'bg-green-500 hover:bg-green-600' : 'bg-neutral-700 cursor-not-allowed'}`} 
                          onClick={() => setSelectedDoctor(doctor)} 
                          disabled={!doctor.available}
                        >
                          {doctor.available ? 'Book Appointment' : 'Not Available'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-neutral-900 border-neutral-700 text-white">
                        <DialogHeader>
                          <DialogTitle className="text-green-400">Book Appointment with {selectedDoctor?.name}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          <div>
                            <label className="text-sm text-gray-400 mb-1 block">Description</label>
                            <Input
                              placeholder="Short description of your issue..."
                              className="bg-neutral-800 text-white border-neutral-700"
                              onChange={(e) => setAppointmentDetails({ ...appointmentDetails, description: e.target.value })}
                            />
                          </div>
                          
                          <div>
                            <label className="text-sm text-gray-400 mb-1 block">Appointment Type</label>
                            <Select onValueChange={(value) => setAppointmentDetails({ ...appointmentDetails, appointmentType: value })}>
                              <SelectTrigger className="bg-neutral-800 text-white border-neutral-700">
                                Appointment Type
                              </SelectTrigger>
                              <SelectContent className="bg-neutral-800 text-white border-neutral-700">
                                <SelectItem value="Virtual">Virtual Consultation</SelectItem>
                                <SelectItem value="In-Person">In-Person Visit</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <Button className="bg-green-500 hover:bg-green-600 text-white w-full mt-4">
                            Confirm Appointment
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </CardFooter>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <Pagination>
            <PaginationItem className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">Previous</PaginationItem>
            <PaginationItem className="bg-green-500 text-white">1</PaginationItem>
            <PaginationItem className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">2</PaginationItem>
            <PaginationItem className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">3</PaginationItem>
            <PaginationItem className="bg-neutral-800 border-neutral-700 text-white hover:bg-neutral-700">Next</PaginationItem>
          </Pagination>
        </div>
      </div>
    </div>
  );
}