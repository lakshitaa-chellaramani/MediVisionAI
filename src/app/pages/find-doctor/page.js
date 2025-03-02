"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Stethoscope, MapPin, DollarSign, Filter } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

export default function FindDoctorsPage() {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [patientEmail, setPatientEmail] = useState("");
 
  
  const [appointmentData, setAppointmentData] = useState({
    time: "",
    date: "",
    reason: "",
        mode: "offline", // Default to offline

  });
  
  // Filter states
  const [locations, setLocations] = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [filters, setFilters] = useState({
    location: "",
    specialization: "",
    onlyAvailable: false,
  });
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    async function fetchDoctors() {
      try {
        const response = await fetch("/api/getalldocs");
        const data = await response.json();
        if (data.success) {
          setDoctors(data.doctors);
          setFilteredDoctors(data.doctors);
          
          // Extract unique locations and specializations for filter options
          const uniqueLocations = [...new Set(data.doctors.map(doc => doc.clinicLocation))];
          const uniqueSpecializations = [...new Set(data.doctors.map(doc => doc.specialization))];
          
          setLocations(uniqueLocations);
          setSpecializations(uniqueSpecializations);
        }
      } catch (error) {
        console.error("Error fetching doctors:", error);
      } finally {
        setLoading(false);
      }
    }

    async function fetchPatientEmail() {
      try {
        const response = await fetch("/api/auth/user");
        const data = await response.json();
        if (data.user) {
          setPatientEmail(data.user.email);
        }
      } catch (error) {
        console.error("Error fetching patient email:", error);
      }
    }

    fetchDoctors();
    fetchPatientEmail();
  }, []);
  
  // Apply filters whenever filters state changes
  useEffect(() => {
    applyFilters();
  }, [filters, doctors]);
  
  const applyFilters = () => {
    let result = [...doctors];
    
    // Filter by location
    if (filters.location) {
      result = result.filter(doc => doc.clinicLocation === filters.location);
    }
    
    // Filter by specialization
    if (filters.specialization) {
      result = result.filter(doc => doc.specialization === filters.specialization);
    }
    
    // Filter by availability
    if (filters.onlyAvailable) {
      result = result.filter(doc => doc.availability);
    }
    
    setFilteredDoctors(result);
  };
  
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      location: "",
      specialization: "",
      onlyAvailable: false
    });
  };

  const handleBookAppointment = async () => {
    if (!appointmentData.date || !appointmentData.time || !appointmentData.reason || !selectedDoctor) {
      alert("Please fill all fields before booking.");
      return;
    }

    const newAppointment = {
      docEmail: selectedDoctor.email,
      patientEmail: patientEmail,
      time: appointmentData.time,
      date: appointmentData.date,
      reason: appointmentData.reason,
      approved: false,
      completed: false,
      doctorResponse: "",
    };

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAppointment),
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
        setIsBookingOpen(false);
        setAppointmentData({ time: "", date: "", reason: "" });
      } else {
        alert("Failed to book appointment. Try again.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  const getTodayDate = () => {
    return new Date().toISOString().split("T")[0]; // Gets today's date in YYYY-MM-DD format
  };

  return (
    <div className="bg-neutral-100 min-h-screen text-green-900 pt-20">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-green-400">Find Specialists</h1>
          
          {/* Filter Button */}
          <Dialog open={isFilterOpen} onOpenChange={setIsFilterOpen}>
            <DialogTrigger asChild>
              <Button className="bg-green-500 hover:bg-green-600 flex items-center gap-2">
                <Filter className="w-4 h-4" /> Filters
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-neutral-50 border border-white text-neutral-200 rounded-lg p-6">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-green-400">Filter Doctors</h3>
                
                {/* Location Filter */}
                <div>
                  <label className="text-neutral-900 block mb-1">Location</label>
                  <Select 
                    value={filters.location} 
                    onValueChange={(value) => handleFilterChange("location", value)}
                  >
                    <SelectTrigger className="w-full bg-white border border-green-50 text-neutral-200">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-green-50 text-neutral-200">
                      <SelectItem value="">All Locations</SelectItem>
                      {locations.map(location => (
                        <SelectItem key={location} value={location}>{location}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Specialization Filter */}
                <div>
                  <label className="text-neutral-900 block mb-1">Specialization</label>
                  <Select 
                    value={filters.specialization} 
                    onValueChange={(value) => handleFilterChange("specialization", value)}
                  >
                    <SelectTrigger className="w-full bg-white border border-green-50 text-neutral-200">
                      <SelectValue placeholder="Select specialization" />
                    </SelectTrigger>
                    <SelectContent className="bg-white border border-green-50 text-neutral-200">
                      <SelectItem value="">All Specializations</SelectItem>
                      {specializations.map(spec => (
                        <SelectItem key={spec} value={spec}>{spec}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Availability Filter */}
                <div className="flex items-center space-x-2">
                  <Checkbox 
                    id="available" 
                    checked={filters.onlyAvailable}
                    onCheckedChange={(checked) => handleFilterChange("onlyAvailable", checked)}
                    className="border-neutral-500"
                  />
                  <Label htmlFor="available" className="text-neutral-900">Show only available doctors</Label>
                </div>
                
                {/* Action Buttons */}
                <div className="flex justify-between gap-4 pt-2">
                  <Button 
                    onClick={resetFilters} 
                    className="bg-white hover:bg-green-50 text-neutral-200"
                  >
                    Reset Filters
                  </Button>
                  <Button 
                    onClick={() => setIsFilterOpen(false)} 
                    className="bg-green-500 hover:bg-green-600"
                  >
                    Apply Filters
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Active Filters Display */}
        {(filters.location || filters.specialization || filters.onlyAvailable) && (
          <div className="flex flex-wrap gap-2 mb-4">
            {filters.location && (
              <div className="bg-neutral-50 text-rose-300 text-sm px-3 py-1 rounded-full flex items-center">
                <MapPin className="w-3 h-3 mr-1" /> {filters.location}
                <button 
                  className="ml-2 text-neutral-400 hover:text-neutral-200"
                  onClick={() => handleFilterChange("location", "")}
                >
                  ✕
                </button>
              </div>
            )}
            {filters.specialization && (
              <div className="bg-neutral-50  text-green-300 text-sm px-3 py-1 rounded-full flex items-center">
                <Stethoscope className="w-3 h-3 mr-1" /> {filters.specialization}
                <button 
                  className="ml-2 text-neutral-400 hover:text-neutral-200"
                  onClick={() => handleFilterChange("specialization", "")}
                >
                  ✕
                </button>
              </div>
            )}
            {filters.onlyAvailable && (
              <div className="bg-neutral-50 text-green-300 text-sm px-3 py-1 rounded-full flex items-center">
                Available Only
                <button 
                  className="ml-2 text-neutral-400 hover:text-neutral-200"
                  onClick={() => handleFilterChange("onlyAvailable", false)}
                >
                  ✕
                </button>
              </div>
            )}
          </div>
        )}

        {/* Results Count */}
        <p className="text-neutral-900 mb-4">
          Showing {filteredDoctors.length} doctor{filteredDoctors.length !== 1 ? 's' : ''}
        </p>

        {/* Doctors Grid */}
        {loading ? (
          <p className="text-center text-green-400">Loading doctors...</p>
        ) : filteredDoctors.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-xl">
            <p className="text-neutral-900 mb-2">No doctors found matching your filters</p>
            <Button onClick={resetFilters} className="bg-green-500 hover:bg-green-600">
              Reset Filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 text-neutral-900">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor._id} className="bg-neutral-50 border-none overflow-hidden rounded-xl shadow-lg">
                <CardHeader className="p-4">
                  <h3 className="text-xl font-semibold text-green-400">{doctor.name || "No Name Provided"}</h3>
                  <p className="text-gray-900">
                    <Stethoscope className="w-4 h-4 inline-block  text-green-300" /> {doctor.specialization}
                  </p>
                  <p className="text-gray-900">
                    <MapPin className="w-4 h-4 inline-block text-green-300" /> {doctor.clinicLocation}
                  </p>
                  <p className="text-gray-900">
                    <DollarSign className="w-4 h-4 inline-block text-green-300" /> ${doctor.consultationFee}
                  </p>
                </CardHeader>
                <CardFooter className="p-4">
                  <Dialog open={isBookingOpen} onOpenChange={setIsBookingOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="w-full bg-green-500 hover:bg-green-600"
                        disabled={!doctor.availability}
                        onClick={() => setSelectedDoctor(doctor)}
                      >
                        {doctor.availability ? "Book Appointment" : "Not Available"}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-neutral-50 border border-white text-neutral-200 rounded-lg p-6">
                      <div className="space-y-4  text-neutral-900 block mb-1">
                        {/* Date Input */}
                        <div>
                          <label className="text-neutral-900 block mb-1">Select Date</label>
                          <Input
                            type="date"
                            min={getTodayDate()}
                            className="w-full bg-white border border-green-50 p-2 text-neutral-900"
                            onChange={(e) => setAppointmentData({ ...appointmentData, date: e.target.value })}
                          />
                        </div>

                        {/* Time Input */}
                        <div>
                          <label className="text-neutral-900 block mb-1">Select Time</label>
                          <Input
                            type="time"
                            className="w-full bg-white border border-green-50 p-2 text-neutral-900"
                            onChange={(e) => setAppointmentData({ ...appointmentData, time: e.target.value })}
                          />
                        </div>
                        <div>
  <label className="text-neutral-900 block mb-1">Select Mode</label>
  <select
    className="w-full bg-white border border-green-50 p-2 text-neutral-900"
    onChange={(e) => setAppointmentData({ ...appointmentData, mode: e.target.value })}
    value={appointmentData.mode}
  >
    <option value="online"  className="text-neutral-900 block mb-1">Online</option>
    <option value="offline"  className="text-neutral-900 block mb-1">Offline</option>
  </select>
</div>



                        {/* Reason Input */}
                        <div>
                          <label className="text-neutral-900 block mb-1">Reason for Visit</label>
                          <Input
                            type="text"
                            placeholder="Enter reason"
                            className="w-full  block mb-1 bg-white border border-green-50 p-2 text-neutral-900"
                            onChange={(e) => setAppointmentData({ ...appointmentData, reason: e.target.value })}
                          />
                        </div>

                        {/* Submit Button */}
                        <Button
                          onClick={handleBookAppointment}
                          className="bg-green-500 hover:bg-green-600 text-green-900 w-full"
                        >
                          Confirm Appointment
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}