'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectContent, SelectTrigger } from '@/components/ui/select';
import { Pagination, PaginationItem } from '@/components/ui/pagination';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Filter, UserCheck } from 'lucide-react';

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
    <div className="bg-neutral-900 min-h-screen text-white p-6">
      <div className="flex items-center gap-4 mb-6">
        <Select defaultValue="all" onValueChange={(value) => handleFilterChange('specialty', value)}>
          <SelectTrigger className="bg-neutral-800 text-white">Specialty</SelectTrigger>
          <SelectContent className="bg-neutral-800 text-white">
            <SelectItem value="all">All Specialties</SelectItem>
            <SelectItem value="Cardiologist">Cardiologist</SelectItem>
            <SelectItem value="Neurologist">Neurologist</SelectItem>
            <SelectItem value="Orthopedic">Orthopedic</SelectItem>
            <SelectItem value="Radiologist">Radiologist</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all" onValueChange={(value) => handleFilterChange('location', value)}>
          <SelectTrigger className="bg-neutral-800 text-white">Location</SelectTrigger>
          <SelectContent className="bg-neutral-800 text-white">
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="Mumbai">Mumbai</SelectItem>
            <SelectItem value="Delhi">Delhi</SelectItem>
            <SelectItem value="Bangalore">Bangalore</SelectItem>
            <SelectItem value="Chennai">Chennai</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue="all" onValueChange={(value) => handleFilterChange('available', value)}>
          <SelectTrigger className="bg-neutral-800 text-white">Availability</SelectTrigger>
          <SelectContent className="bg-neutral-800 text-white">
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="true">Available</SelectItem>
            <SelectItem value="false">Unavailable</SelectItem>
          </SelectContent>
        </Select>
        <Button className="bg-rose-500 text-white flex items-center gap-2"><Filter className="w-4 h-4" /> Apply Filters</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
        {filteredDoctors.map((doctor) => (
          <Card key={doctor.id} className="bg-neutral-800 p-4 rounded-xl shadow-md flex items-center w-full max-w-xl mx-auto">
            <div className="flex-1 p-4">
              <CardHeader className="text-lg font-semibold text-rose-500">{doctor.name}</CardHeader>
              <CardContent>
                <p className="text-gray-300">{doctor.specialty}</p>
                <p className="text-gray-400">{doctor.location}</p>
                <p className={`text-sm ${doctor.available ? 'text-green-400' : 'text-red-400'}`}>
                  {doctor.available ? 'Available' : 'Unavailable'}
                </p>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-rose-500 text-white" onClick={() => setSelectedDoctor(doctor)} disabled={!doctor.available}>
                      Book Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-neutral-900 border-neutral-700 text-white">
                    <DialogHeader>
                      <DialogTitle>Book Appointment with {selectedDoctor?.name}</DialogTitle>
                    </DialogHeader>
                    <Input
                      placeholder="Short description of your issue..."
                      className="bg-neutral-800 text-white border-neutral-700"
                      onChange={(e) => setAppointmentDetails({ ...appointmentDetails, description: e.target.value })}
                    />
                    <Select onValueChange={(value) => setAppointmentDetails({ ...appointmentDetails, appointmentType: value })}>
                      <SelectTrigger className="bg-neutral-800 text-white">Appointment Type</SelectTrigger>
                      <SelectContent className="bg-neutral-800 text-white">
                        <SelectItem value="Virtual">Virtual Consultation</SelectItem>
                        <SelectItem value="In-Person">In-Person Visit</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button className="bg-rose-500 text-white">Confirm Appointment</Button>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </div>
            <img src={doctor.image} alt={doctor.name} className="w-40 h-40 object-cover rounded-lg" />
          </Card>
        ))}
      </div>

      <div className="mt-6 flex justify-center">
        <Pagination>
          <PaginationItem>Previous</PaginationItem>
          <PaginationItem>1</PaginationItem>
          <PaginationItem>2</PaginationItem>
          <PaginationItem>3</PaginationItem>
          <PaginationItem>Next</PaginationItem>
        </Pagination>
      </div>
    </div>
  );
}
