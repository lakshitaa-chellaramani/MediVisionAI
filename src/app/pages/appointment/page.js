"use client";


import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Calendar, Video, User } from 'lucide-react';

const doctors = [
  { id: 1, name: 'Dr. Emily Carter', specialty: 'Cardiologist' },
  { id: 2, name: 'Dr. Daniel Lee', specialty: 'Neurologist' },
  { id: 3, name: 'Dr. Sophia Patel', specialty: 'Orthopedic' },
  { id: 4, name: 'Dr. James Kim', specialty: 'Dermatologist' },
];

const timeSlots = ['10:00 AM', '11:30 AM', '2:00 PM', '4:00 PM'];

export default function AppointmentBooking() {
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [appointmentType, setAppointmentType] = useState('video');

  return (
    <div className="min-h-screen p-8 bg-neutral-900 text-white flex flex-col items-center">
      <Card className="w-full max-w-lg p-6 shadow-lg border rounded-xl bg-neutral-800">
        <CardHeader className="text-lg font-semibold text-green-500 flex gap-2 items-center">
          <Calendar className="w-5 h-5 text-green-500" /> Book an Appointment
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Select onValueChange={(value) => setSelectedDoctor(value)}>
            <SelectTrigger className="bg-neutral-700 text-white border-neutral-600">
              {selectedDoctor || 'Select a Doctor'}
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              {doctors.map((doc) => (
                <SelectItem key={doc.id} value={doc.name}>{`${doc.name} - ${doc.specialty}`}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(value) => setSelectedTime(value)}>
            <SelectTrigger className="bg-neutral-700 text-white border-neutral-600">
              {selectedTime || 'Select a Time Slot'}
            </SelectTrigger>
            <SelectContent className="bg-neutral-800 border-neutral-700 text-white">
              {timeSlots.map((time, index) => (
                <SelectItem key={index} value={time}>{time}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Tabs value={appointmentType} onValueChange={setAppointmentType} className="w-full">
            <TabsList className="flex gap-2 bg-neutral-700 p-1 rounded-lg">
              <TabsTrigger value="video" className="flex gap-2 items-center">
                <Video className="w-4 h-4" /> Video Consultation
              </TabsTrigger>
              <TabsTrigger value="in-person" className="flex gap-2 items-center">
                <User className="w-4 h-4" /> In-Person Visit
              </TabsTrigger>
            </TabsList>
          </Tabs>

          <Button className="bg-green-500 hover:bg-green-400 text-white w-full mt-2">
            Confirm Appointment
          </Button>
        </CardContent>
      </Card>

      {/* Appointment History Tab */}
      <div className="mt-8 w-full max-w-lg">
        <h2 className="text-lg font-semibold text-green-500">Past Appointments</h2>
        <div className="mt-4 space-y-2">
          <div className="p-3 bg-neutral-800 rounded-lg flex justify-between">
            <span>Dr. Emily Carter - Video Consultation</span>
            <span className="text-neutral-400">Jan 10, 2024</span>
          </div>
          <div className="p-3 bg-neutral-800 rounded-lg flex justify-between">
            <span>Dr. Daniel Lee - In-Person</span>
            <span className="text-neutral-400">Dec 22, 2023</span>
          </div>
        </div>
      </div>
    </div>
  );
}
