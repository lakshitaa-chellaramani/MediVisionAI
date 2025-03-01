'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Download, Filter } from 'lucide-react';

const reports = [
  { id: 1, type: 'X-ray', date: '2024-02-15', status: 'AI Analyzed', link: '#' },
  { id: 2, type: 'MRI', date: '2024-02-10', status: 'Doctor Verified', link: '#' },
  { id: 3, type: 'CT Scan', date: '2024-01-25', status: 'AI Analyzed', link: '#' },
];

export default function MedicalReports() {
  const [filter, setFilter] = useState('all');
  const filteredReports = filter === 'all' ? reports : reports.filter((r) => r.type === filter);

  return (
    <div className="bg-neutral-900 min-h-screen text-white"> 
    <div className="max-w-4xl mx-auto py-10 ">
      <Card className="bg-neutral-900 text-white p-6 shadow-lg">
        <CardHeader className="text-xl font-semibold text-green-500">Medical Reports 📑</CardHeader>
        <CardContent>
          <div className="flex justify-between mb-4">
            <Select onValueChange={(value) => setFilter(value)}>
              <SelectTrigger className="bg-neutral-800 text-white border-neutral-700">
                <SelectValue placeholder="Filter by scan type" />
              </SelectTrigger>
              <SelectContent className="bg-neutral-800 text-white border-neutral-700">
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="X-ray">X-ray</SelectItem>
                <SelectItem value="MRI">MRI</SelectItem>
                <SelectItem value="CT Scan">CT Scan</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-green-500 text-white"><Filter className="h-4 w-4 mr-2" />Sort by Date</Button>
          </div>
          <Tabs defaultValue="ai">
            <TabsList className="bg-neutral-800 text-white">
              <TabsTrigger value="ai">AI Analyzed</TabsTrigger>
              <TabsTrigger value="doctor">Doctor Verified</TabsTrigger>
            </TabsList>
            <TabsContent value="ai">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scan Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter((r) => r.status === 'AI Analyzed')
                    .map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-green-500 text-white"><Download className="h-4 w-4" />Download</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="doctor">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Scan Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredReports
                    .filter((r) => r.status === 'Doctor Verified')
                    .map((report) => (
                      <TableRow key={report.id}>
                        <TableCell>{report.type}</TableCell>
                        <TableCell>{report.date}</TableCell>
                        <TableCell>{report.status}</TableCell>
                        <TableCell>
                          <Button size="sm" className="bg-green-500 text-white"><Download className="h-4 w-4" />Download</Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
    </div>
  );
}
