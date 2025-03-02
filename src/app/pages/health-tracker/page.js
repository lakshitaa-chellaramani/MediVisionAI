"use client"
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calendar, Clock, FileText, AlertTriangle, Activity, PlusCircle } from 'lucide-react';

const HealthTrackerDashboard = () => {
  // Sample data - in a real app, this would come from your existing health history
  const [healthData, setHealthData] = useState({
    symptoms: [
      { date: '2025-01-05', symptom: 'Headache', severity: 7, notes: 'Lasted 4 hours, pain medication helped' },
      { date: '2025-01-12', symptom: 'Headache', severity: 5, notes: 'Mild, went away after rest' },
      { date: '2025-01-20', symptom: 'Nausea', severity: 6, notes: 'After lunch, lasted 2 hours' },
      { date: '2025-01-25', symptom: 'Headache', severity: 8, notes: 'Severe, needed to lie down' },
      { date: '2025-02-03', symptom: 'Joint Pain', severity: 4, notes: 'Right knee, after walking' },
      { date: '2025-02-10', symptom: 'Headache', severity: 6, notes: 'With sensitivity to light' },
      { date: '2025-02-18', symptom: 'Joint Pain', severity: 5, notes: 'Right knee again, worse in morning' },
    ],
    medications: [
      { date: '2025-01-05', name: 'Ibuprofen', dosage: '400mg', frequency: 'As needed' },
      { date: '2025-01-25', name: 'Ibuprofen', dosage: '600mg', frequency: 'As needed' },
      { date: '2025-02-15', name: 'Acetaminophen', dosage: '500mg', frequency: 'Twice daily' },
    ],
    upcomingAppointments: [
      { date: '2025-03-15', doctor: 'Dr. Smith', specialty: 'Neurology', time: '10:00 AM' },
    ]
  });

  // Track new symptoms
  const [newSymptom, setNewSymptom] = useState({
    symptom: '',
    severity: 5,
    notes: ''
  });

  // Organize symptom data for trend analysis
  const generateTrendData = () => {
    const symptoms = {};
    
    healthData.symptoms.forEach(entry => {
      if (!symptoms[entry.symptom]) {
        symptoms[entry.symptom] = [];
      }
      
      // Format date for chart
      const date = new Date(entry.date);
      const formattedDate = `${date.getMonth() + 1}/${date.getDate()}`;
      
      symptoms[entry.symptom].push({
        date: formattedDate,
        fullDate: entry.date,
        severity: entry.severity,
        notes: entry.notes
      });
    });
    
    return symptoms;
  };

  const symptomTrends = generateTrendData();
  
  // Get unique symptom types
  const symptomTypes = [...new Set(healthData.symptoms.map(item => item.symptom))];
  
  // Find patterns and correlations
  const findPatterns = () => {
    const patterns = [];
    
    // Check for frequent symptoms (3+ occurrences)
    symptomTypes.forEach(symptom => {
      const count = healthData.symptoms.filter(s => s.symptom === symptom).length;
      if (count >= 3) {
        patterns.push(`You've experienced ${symptom} ${count} times in the past two months.`);
      }
    });
    
    // Check for increasing severity
    symptomTypes.forEach(symptom => {
      const instances = healthData.symptoms
        .filter(s => s.symptom === symptom)
        .sort((a, b) => new Date(a.date) - new Date(b.date));
      
      if (instances.length >= 2) {
        const first = instances[0].severity;
        const last = instances[instances.length - 1].severity;
        
        if (last > first) {
          patterns.push(`Your ${symptom} severity has increased from ${first} to ${last}.`);
        }
      }
    });
    
    return patterns.length > 0 ? patterns : ["No significant patterns detected yet. Keep tracking your symptoms."];
  };

  // Calculate days since most recent symptom
  const daysSinceLastSymptom = () => {
    if (healthData.symptoms.length === 0) return null;
    
    const dates = healthData.symptoms.map(s => new Date(s.date));
    const mostRecent = new Date(Math.max(...dates));
    const today = new Date();
    const diffTime = today - mostRecent;
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  return (
    <div className="min-h-screen bg-green-50 text-green-900 p-6 pt-16">
      <h1 className="text-3xl font-bold text-green-800 text-center mb-8">Health Tracker Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="border-green-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 bg-green-100 border-b border-green-200">
            <CardTitle className="flex items-center text-lg font-medium text-green-800">
              <Activity className="mr-2 h-5 w-5 text-green-600" />
              Symptom Summary
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-sm">
              <p className="flex justify-between py-1 border-b border-green-100">
                <span className="font-medium text-green-700">Total tracked:</span> 
                <span className="bg-green-100 px-2 py-1 rounded-md">{healthData.symptoms.length} symptoms</span>
              </p>
              <p className="flex justify-between py-1 border-b border-green-100">
                <span className="font-medium text-green-700">Most common:</span> 
                <span className="bg-green-100 px-2 py-1 rounded-md">{
                  symptomTypes.length > 0 ? 
                    symptomTypes.sort((a, b) => 
                      healthData.symptoms.filter(s => s.symptom === b).length - 
                      healthData.symptoms.filter(s => s.symptom === a).length
                    )[0] : 
                    'None'
                }</span>
              </p>
              <p className="flex justify-between py-1">
                <span className="font-medium text-green-700">Days since last:</span> 
                <span className="bg-green-100 px-2 py-1 rounded-md">{daysSinceLastSymptom()}</span>
              </p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 bg-green-100 border-b border-green-200">
            <CardTitle className="flex items-center text-lg font-medium text-green-800">
              <AlertTriangle className="mr-2 h-5 w-5 text-amber-500" />
              Patterns Detected
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <ul className="text-sm space-y-2">
              {findPatterns().map((pattern, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block h-2 w-2 mt-1.5 mr-2 rounded-full bg-green-500"></span>
                  {pattern}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        
        <Card className="border-green-200 bg-white shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2 bg-green-100 border-b border-green-200">
            <CardTitle className="flex items-center text-lg font-medium text-green-800">
              <Calendar className="mr-2 h-5 w-5 text-green-600" />
              Upcoming Appointment
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            {healthData.upcomingAppointments.length > 0 ? (
              <div className="text-sm bg-green-50 p-3 rounded-md border border-green-100">
                <p className="flex justify-between py-1 border-b border-green-100">
                  <span className="font-medium text-green-700">Date:</span> 
                  <span>{healthData.upcomingAppointments[0].date}</span>
                </p>
                <p className="flex justify-between py-1 border-b border-green-100">
                  <span className="font-medium text-green-700">Doctor:</span> 
                  <span>{healthData.upcomingAppointments[0].doctor}</span>
                </p>
                <p className="flex justify-between py-1 border-b border-green-100">
                  <span className="font-medium text-green-700">Specialty:</span> 
                  <span>{healthData.upcomingAppointments[0].specialty}</span>
                </p>
                <p className="flex justify-between py-1">
                  <span className="font-medium text-green-700">Time:</span> 
                  <span>{healthData.upcomingAppointments[0].time}</span>
                </p>
                <p className="mt-2 text-xs text-green-700 bg-green-100 p-2 rounded font-medium">
                  Remember to bring your symptom history!
                </p>
              </div>
            ) : (
              <p className="text-sm">No upcoming appointments scheduled.</p>
            )}
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="trends" className="w-full">
        <TabsList className="w-full mb-6 bg-green-100 p-1 rounded-xl">
          <TabsTrigger value="trends" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 rounded-lg">
            Symptom Trends
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 rounded-lg">
            Symptom History
          </TabsTrigger>
          <TabsTrigger value="track" className="data-[state=active]:bg-green-600 data-[state=active]:text-white text-green-700 rounded-lg">
            Track New Symptom
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends">
          <Card className="border-green-200 bg-white shadow-md">
            <CardHeader className="pb-2 bg-green-100 border-b border-green-200">
              <CardTitle className="text-xl font-medium text-green-800">Symptom Severity Trends</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="h-80 p-4 bg-green-50 rounded-lg">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                    <XAxis dataKey="date" stroke="#047857" />
                    <YAxis domain={[0, 10]} label={{ value: 'Severity', angle: -90, position: 'insideLeft', style: { fill: '#047857' } }} stroke="#047857" />
                    <Tooltip contentStyle={{ backgroundColor: '#f0fdf4', borderColor: '#10b981' }} />
                    {Object.entries(symptomTrends).map(([symptom, data], index) => (
                      <Line 
                        key={symptom}
                        data={data}
                        type="monotone"
                        dataKey="severity"
                        name={symptom}
                        stroke={
                          index === 0 ? '#059669' : 
                          index === 1 ? '#047857' : 
                          index === 2 ? '#065f46' : 
                          '#064e3b'
                        }
                        strokeWidth={3}
                        activeDot={{ r: 8, fill: '#10b981' }}
                        dot={{ fill: '#10b981', stroke: '#047857', strokeWidth: 2, r: 4 }}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </div>
              
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(symptomTrends).map(([symptom, data]) => (
                  <Card key={symptom} className="overflow-hidden border-green-200">
                    <CardHeader className="bg-green-100 py-2 px-4 border-b border-green-200">
                      <CardTitle className="text-md text-green-800">{symptom} Details</CardTitle>
                    </CardHeader>
                    <CardContent className="p-0">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-green-100 bg-green-50">
                            <th className="py-2 px-4 text-left text-green-800">Date</th>
                            <th className="py-2 px-4 text-left text-green-800">Severity</th>
                            <th className="py-2 px-4 text-left text-green-800">Notes</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((entry, i) => (
                            <tr key={i} className="border-b border-green-100 hover:bg-green-50">
                              <td className="py-2 px-4">{entry.fullDate}</td>
                              <td className="py-2 px-4">
                                <span className="inline-block px-2 py-0.5 rounded-full bg-green-100 text-green-800 font-medium">
                                  {entry.severity}/10
                                </span>
                              </td>
                              <td className="py-2 px-4 truncate max-w-xs">{entry.notes}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="history">
          <Card className="border-green-200 bg-white shadow-md">
            <CardHeader className="pb-2 bg-green-100 border-b border-green-200">
              <CardTitle className="text-xl font-medium text-green-800">Complete Symptom History</CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="bg-green-50 rounded-lg p-1">
                <table className="w-full text-sm bg-white rounded-lg overflow-hidden">
                  <thead>
                    <tr className="border-b border-green-100 bg-green-100">
                      <th className="py-3 px-4 text-left text-green-800">Date</th>
                      <th className="py-3 px-4 text-left text-green-800">Symptom</th>
                      <th className="py-3 px-4 text-left text-green-800">Severity</th>
                      <th className="py-3 px-4 text-left text-green-800">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {healthData.symptoms
                      .sort((a, b) => new Date(b.date) - new Date(a.date))
                      .map((symptom, i) => (
                      <tr key={i} className="border-b border-green-100 hover:bg-green-50">
                        <td className="py-3 px-4">{symptom.date}</td>
                        <td className="py-3 px-4 font-medium text-green-800">{symptom.symptom}</td>
                        <td className="py-3 px-4">
                          <span className={`inline-block px-2 py-0.5 rounded-full font-medium
                            ${symptom.severity > 7 ? 'bg-red-100 text-red-800' : 
                              symptom.severity > 4 ? 'bg-amber-100 text-amber-800' : 
                              'bg-green-100 text-green-800'}`}>
                            {symptom.severity}/10
                          </span>
                        </td>
                        <td className="py-3 px-4">{symptom.notes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="track">
          <Card className="border-green-200 bg-white shadow-md">
            <CardHeader className="pb-2 bg-green-100 border-b border-green-200">
              <CardTitle className="text-xl font-medium text-green-800">Record New Symptom</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="space-y-4 bg-green-50 p-6 rounded-lg">
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">Symptom</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Headache, Nausea, Joint Pain" 
                    className="w-full p-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">Severity (1-10)</label>
                  <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    className="w-full accent-green-600"
                    value="5"
                  />
                  <div className="flex justify-between text-xs text-green-700">
                    <span>Mild (1)</span>
                    <span>Moderate (5)</span>
                    <span>Severe (10)</span>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">Date</label>
                  <input 
                    type="date" 
                    className="w-full p-2 border border-green-200 rounded-md focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-green-800 mb-1">Notes</label>
                  <textarea 
                    placeholder="Add details about duration, triggers, relief factors, etc."
                    className="w-full p-2 border border-green-200 rounded-md h-24 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none"
                  ></textarea>
                </div>
                
                <button className="flex items-center justify-center w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-md font-medium transition-colors">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Save Symptom
                </button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HealthTrackerDashboard;