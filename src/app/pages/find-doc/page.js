'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectItem, SelectContent, SelectTrigger } from '@/components/ui/select';
import { Pagination, PaginationItem } from '@/components/ui/pagination';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Calendar, Clock, Filter, UserCheck, MapPin, Stethoscope, CheckCircle } from 'lucide-react';

// Fallback data in case the API call fails
const fallbackDoctors = [
  { id: 1, name: 'Dr. Aisha Kapoor', specialty: 'Cardiologist', location: 'Mumbai', available: true, image: '/assets/doctor1.png' },
  { id: 2, name: 'Dr. Rajesh Malhotra', specialty: 'Neurologist', location: 'Delhi', available: false, image: '/assets/doctor2.png' },
  { id: 3, name: 'Dr. Ananya Sharma', specialty: 'Orthopedic', location: 'Bangalore', available: true, image: '/assets/doctor3.png' },
  { id: 4, name: 'Dr. Vikram Sinha', specialty: 'Radiologist', location: 'Chennai', available: true, image: '/assets/doctor4.png' },
];

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({ specialty: 'all', location: 'all', available: 'all' });
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDetails, setAppointmentDetails] = useState({ description: '', appointmentType: '' });
  const [bookingStatus, setBookingStatus] = useState({ loading: false, success: false, error: null });

  // Fetch doctors when component mounts
  useEffect(() => {
     
  

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/getalldocs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }
      
      const data = await response.json();
      
      // Ensure data is an array
      if (Array.isArray(data)) {
        setDoctors(data);
      } else if (data && data.doctors && Array.isArray(data.doctors)) {
        // If API returns an object with a doctors array property
        setDoctors(data.doctors);
      } else {
        // If data is not in expected format
        console.error('Data from API is not an array:', data);
        setError('Invalid data format from API. Using fallback data.');
        setDoctors(fallbackDoctors);
      }
    } catch (err) {
      console.error('Error fetching doctors:', err);
      setError('Failed to load doctors. Using fallback data.');
      setDoctors(fallbackDoctors);
    } finally {
      setLoading(false);
    }
  };
  fetchDoctors();
}, []);

  const handleFilterChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const bookAppointment = async () => {
    setBookingStatus({ loading: true, success: false, error: null });
    
    try {
      // Create appointment payload
      const appointmentPayload = {
        doctorId: selectedDoctor.id,
        description: appointmentDetails.description,
        appointmentType: appointmentDetails.appointmentType,
        // You can add more fields as needed
        date: new Date().toISOString(),
      };
      
      const response = await fetch('/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentPayload),
      });
      
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      
      setBookingStatus({ loading: false, success: true, error: null });
      // Reset form after successful booking
      setAppointmentDetails({ description: '', appointmentType: '' });
    } catch (err) {
      console.error('Error booking appointment:', err);
      setBookingStatus({ 
        loading: false, 
        success: false, 
        error: 'Failed to book appointment. Please try again.' 
      });
    }
  };

  // Ensure doctors is always an array before filtering
  const doctorsArray = Array.isArray(doctors) ? doctors : [];
  
  const filteredDoctors = doctorsArray.filter((doctor) => {
    return (
      (filters.specialty === 'all' || doctor.specialty === filters.specialty) &&
      (filters.location === 'all' || doctor.location === filters.location) &&
      (filters.available === 'all' || doctor.available === (filters.available === 'true'))
    );
  });

  return (
    <div className="bg-neutral-100 min-h-screen text-green-900 pt-16">
      {/* Header and Filters Section */}
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-2xl font-bold mb-8 text-green-400">Find Specialists</h1>
        
        <div className="bg-neutral-50 p-6 rounded-xl mb-8 shadow-lg">
          <h2 className="text-lg font-medium mb-4 text-green-300">Filter Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm text-gray-400 mb-1 block">Specialty</label>
              <Select defaultValue="all" onValueChange={(value) => handleFilterChange('specialty', value)}>
                <SelectTrigger className="bg-white border-green-50 text-green-900 w-full">
                  <div className="flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-green-400" />
                    <span>{filters.specialty === 'all' ? 'All Specialties' : filters.specialty}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-50 border-white text-green-900">
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
                <SelectTrigger className="bg-white border-green-50 text-green-900 w-full">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-green-400" />
                    <span>{filters.location === 'all' ? 'All Locations' : filters.location}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-50 border-white text-green-900">
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
                <SelectTrigger className="bg-white border-green-50 text-green-900 w-full">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span>{filters.available === 'all' ? 'All' : filters.available === 'true' ? 'Available' : 'Unavailable'}</span>
                  </div>
                </SelectTrigger>
                <SelectContent className="bg-neutral-50 border-white text-green-900">
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="true">Available</SelectItem>
                  <SelectItem value="false">Unavailable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button className="bg-green-500 hover:bg-green-600 text-green-900 mt-4 w-full md:w-auto">
            <Filter className="w-4 h-4 mr-2" /> Apply Filters
          </Button>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin w-8 h-8 border-4 border-green-400 border-t-transparent rounded-full mx-auto mb-4"></div>
            <p className="text-gray-400">Loading doctors...</p>
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="bg-red-900/20 border border-red-900 text-red-400 rounded-lg p-4 mb-6">
            <p>{error}</p>
          </div>
        )}

        {/* Doctors Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="bg-neutral-50 border-none overflow-hidden rounded-xl shadow-lg hover:shadow-green-900/20 transition-all duration-300">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/3 p-4 flex justify-center items-center bg-white">
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
                            className={`w-full ${doctor.available ? 'bg-green-500 hover:bg-green-600' : 'bg-white cursor-not-allowed'}`} 
                            onClick={() => setSelectedDoctor(doctor)} 
                            disabled={!doctor.available}
                          >
                            {doctor.available ? 'Book Appointment' : 'Not Available'}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="bg-neutral-100 border-white text-green-900">
                          <DialogHeader>
                            <DialogTitle className="text-green-400">Book Appointment with {selectedDoctor?.name}</DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4 py-4">
                            <div>
                              <label className="text-sm text-gray-400 mb-1 block">Description</label>
                              <Input
                                placeholder="Short description of your issue..."
                                className="bg-neutral-50 text-green-900 border-white"
                                value={appointmentDetails.description}
                                onChange={(e) => setAppointmentDetails({ ...appointmentDetails, description: e.target.value })}
                              />
                            </div>
                            
                            <div>
                              <label className="text-sm text-gray-400 mb-1 block">Appointment Type</label>
                              <Select onValueChange={(value) => setAppointmentDetails({ ...appointmentDetails, appointmentType: value })}>
                                <SelectTrigger className="bg-neutral-50 text-green-900 border-white">
                                  Appointment Type
                                </SelectTrigger>
                                <SelectContent className="bg-neutral-50 text-green-900 border-white">
                                  <SelectItem value="Virtual">Virtual Consultation</SelectItem>
                                  <SelectItem value="In-Person">In-Person Visit</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            {/* Booking status messages */}
                            {bookingStatus.error && (
                              <div className="bg-red-900/20 text-red-400 rounded p-2 text-sm">
                                {bookingStatus.error}
                              </div>
                            )}
                            
                            {bookingStatus.success && (
                              <div className="bg-green-900/20 text-green-400 rounded p-2 text-sm">
                                Appointment booked successfully!
                              </div>
                            )}
                            
                            <Button 
                              className="bg-green-500 hover:bg-green-600 text-green-900 w-full mt-4"
                              onClick={bookAppointment}
                              disabled={bookingStatus.loading || !appointmentDetails.description || !appointmentDetails.appointmentType}
                            >
                              {bookingStatus.loading ? (
                                <>
                                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                  Processing...
                                </>
                              ) : (
                                'Confirm Appointment'
                              )}
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
        )}

        {/* Empty State */}
        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-12 bg-neutral-50 rounded-xl">
            <UserCheck className="w-12 h-12 text-green-400 mx-auto mb-4 opacity-50" />
            <h3 className="text-xl font-medium text-gray-300 mb-2">No doctors found</h3>
            <p className="text-gray-400 mb-4">Try adjusting your filters to see more results</p>
            <Button 
              className="bg-green-500 hover:bg-green-600"
              onClick={() => setFilters({ specialty: 'all', location: 'all', available: 'all' })}
            >
              Reset Filters
            </Button>
          </div>
        )}

        {/* Pagination */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="flex justify-center">
            <Pagination>
              <PaginationItem className="bg-neutral-50 border-white text-green-900 hover:bg-white">Previous</PaginationItem>
              <PaginationItem className="bg-green-500 text-green-900">1</PaginationItem>
              <PaginationItem className="bg-neutral-50 border-white text-green-900 hover:bg-white">2</PaginationItem>
              <PaginationItem className="bg-neutral-50 border-white text-green-900 hover:bg-white">3</PaginationItem>
              <PaginationItem className="bg-neutral-50 border-white text-green-900 hover:bg-white">Next</PaginationItem>
            </Pagination>
          </div>
        )}
      </div>
    </div>
  );
}