// src/pages/index.jsx
"use client"
import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Brain, 
  LucideActivity, 
  ShieldCheck, 
  Users, 
  FileText, 
  Calendar, 
  Upload, 
  Search, 
  PieChart, 
  MessageSquare
} from 'lucide-react';
import ChatBox from "@/components/ChatBox";


export default function Home() {
  const [activeTab, setActiveTab] = useState('patients');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [stats, setStats] = useState({
    scansAnalyzed: 0,
    conditionsDetected: 0,
    doctorsAssisted: 0
  });

  // Animate stats when page loads
  useState(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        scansAnalyzed: prev.scansAnalyzed >= 138500 ? 138500 : prev.scansAnalyzed + 2500,
        conditionsDetected: prev.conditionsDetected >= 45200 ? 45200 : prev.conditionsDetected + 1000,
        doctorsAssisted: prev.doctorsAssisted >= 12800 ? 12800 : prev.doctorsAssisted + 300
      }));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-950 to-neutral-900 text-neutral-50">
      <Head>
        <title>MediVision AI | Medical Imaging Assistant</title>
        <meta name="description" content="AI-powered medical imaging for early detection & accurate diagnosis" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-800/30">
              <Brain className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold">MediVision<span className="text-rose-400">AI</span></span>
          </div>
          
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Features</a>
            <a href="#technology" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Technology</a>
            <a href="#testimonials" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Testimonials</a>
            <a href="#security" className="text-neutral-300 hover:text-white hover:underline decoration-rose-400 decoration-2 underline-offset-8 transition">Security</a>
          </nav>
          
          <div className="flex items-center gap-4">
            <Button variant="outline" className="hidden md:flex border-rose-500 text-rose-400 hover:bg-rose-950">Login</Button>
            <Button className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-md shadow-rose-900/40">Get Started</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 md:min-h-screen flex items-center overflow-hidden">
        {/* Animated particles background */}
        <div className="absolute inset-0 z-0 grid grid-cols-5 gap-4">
  {[...Array(25)].map((_, i) => (
    <motion.div
      key={i}
      className="w-8 h-8 bg-rose-400/30"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.2, 0.8, 0.2],
      }}
      transition={{
        duration: 10 + Math.random() * 20,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  ))}
</div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                  AI-Powered Medical Imaging for <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400">Early Detection & Accurate Diagnosis</span>
                </h1>
                <p className="text-lg text-neutral-300 mb-8 max-w-2xl">
                  Harness the power of artificial intelligence to revolutionize medical imaging. Our cutting-edge platform helps healthcare professionals detect conditions earlier and with greater precision.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Button size="lg" className="bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-900/30">
                    <Upload className="mr-2 h-5 w-5" /> Upload Scan
                  </Button>
                  <Button size="lg" variant="outline" className="border-rose-500 text-rose-400 hover:bg-rose-950">
                    <Search className="mr-2 h-5 w-5" /> Analyze Reports
                  </Button>
                </div>
              </motion.div>
            </div>

            <div className="lg:w-1/2 relative h-64 md:h-96 lg:h-auto">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative w-full h-full"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-64 h-64 md:w-80 md:h-80 rounded-full bg-rose-900/20 backdrop-blur-xl flex items-center justify-center shadow-2xl shadow-rose-900/30 border border-rose-800/50">
                    <div className="w-48 h-48 md:w-64 md:h-64 rounded-full bg-rose-800/10 backdrop-blur-xl flex items-center justify-center border border-rose-700/30">
                      <div className="relative w-40 h-40 md:w-48 md:h-48">
                        <Image 
                          src="/assets/img4.png" 
                          alt="AI Brain Scan Visualization" 
                          layout="fill"
                          className="object-contain"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-neutral-900/50 border-y border-neutral-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-rose-800 transition-all">
              <CardContent className="p-8 text-center">
                <LucideActivity className="w-12 h-12 mx-auto mb-4 text-rose-400" />
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 mb-2">
                  {stats.scansAnalyzed.toLocaleString()}+
                </h3>
                <p className="text-neutral-300">Scans Analyzed</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-rose-800 transition-all">
              <CardContent className="p-8 text-center">
                <PieChart className="w-12 h-12 mx-auto mb-4 text-rose-400" />
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 mb-2">
                  {stats.conditionsDetected.toLocaleString()}+
                </h3>
                <p className="text-neutral-300">Conditions Detected</p>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/50 backdrop-blur-xl border-neutral-800 hover:border-rose-800 transition-all">
              <CardContent className="p-8 text-center">
                <Users className="w-12 h-12 mx-auto mb-4 text-rose-400" />
                <h3 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-cyan-400 mb-2">
                  {stats.doctorsAssisted.toLocaleString()}+
                </h3>
                <p className="text-neutral-300">Doctors Assisted</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="border-rose-500 text-rose-400 px-4 py-1 text-sm mb-6">Features</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Powerful Analysis for Everyone</h2>
            <p className="text-neutral-300 text-lg">
              Our platform delivers cutting-edge medical imaging analysis tailored for both patients and healthcare professionals.
            </p>
          </div>

          <Tabs
            defaultValue="patients"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-4xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-neutral-900 border border-neutral-800 p-1">
                <TabsTrigger 
                  value="patients"
                  className="data-[state=active]:bg-rose-950 data-[state=active]:text-rose-400 data-[state=active]:shadow-md px-8"
                >
                  For Patients
                </TabsTrigger>
                <TabsTrigger 
                  value="doctors"
                  className="data-[state=active]:bg-rose-950 data-[state=active]:text-rose-400 data-[state=active]:shadow-md px-8"
                >
                  For Doctors
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="patients" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 hover:-tranneutral-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-rose-900/50 flex items-center justify-center mb-4">
                      <LucideActivity className="w-6 h-6 text-rose-400" />
                    </div>
                    <CardTitle>Symptom Checking</CardTitle>
                    <CardDescription className="text-neutral-400">
                      Understand your symptoms through AI analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300">
                      Our AI analyzes your symptoms in correlation with scan results to provide a comprehensive understanding of potential conditions.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-rose-400 p-0">Learn more &rarr;</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 hover:-tranneutral-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-rose-900/50 flex items-center justify-center mb-4">
                      <Search className="w-6 h-6 text-rose-400" />
                    </div>
                    <CardTitle>Scan Analysis</CardTitle>
                    <CardDescription className="text-neutral-400">
                      Get plain-language explanations of your medical scans
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300">
                      Upload your scan and receive an easy-to-understand explanation of the findings, with visual highlights of key areas.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-rose-400 p-0">Learn more &rarr;</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 hover:-tranneutral-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-rose-900/50 flex items-center justify-center mb-4">
                      <Calendar className="w-6 h-6 text-rose-400" />
                    </div>
                    <CardTitle>Doctor Referrals</CardTitle>
                    <CardDescription className="text-neutral-400">
                      Connect with specialists based on your scan results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300">
                      Based on AI analysis of your scans, we can recommend and connect you with appropriate specialists in your area.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-rose-400 p-0">Learn more &rarr;</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="doctors" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 hover:-tranneutral-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-rose-900/50 flex items-center justify-center mb-4">
                      <Brain className="w-6 h-6 text-rose-400" />
                    </div>
                    <CardTitle>AI-Assisted Diagnosis</CardTitle>
                    <CardDescription className="text-neutral-400">
                      Enhance diagnostic accuracy with AI insights
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300">
                      Our AI algorithms analyze scans to highlight anomalies, potential conditions, and suggest diagnostic pathways.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-rose-400 p-0">Learn more &rarr;</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 hover:-tranneutral-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-rose-900/50 flex items-center justify-center mb-4">
                      <FileText className="w-6 h-6 text-rose-400" />
                    </div>
                    <CardTitle>Automated Reporting</CardTitle>
                    <CardDescription className="text-neutral-400">
                      Generate comprehensive reports in seconds
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300">
                      Save hours with AI-generated reports that compile findings, highlight key areas, and suggest potential next steps.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-rose-400 p-0">Learn more &rarr;</Button>
                  </CardFooter>
                </Card>

                <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 hover:-tranneutral-y-1 transition-all duration-300">
                  <CardHeader>
                    <div className="w-12 h-12 rounded-lg bg-rose-900/50 flex items-center justify-center mb-4">
                      <PieChart className="w-6 h-6 text-rose-400" />
                    </div>
                    <CardTitle>Scan Comparison</CardTitle>
                    <CardDescription className="text-neutral-400">
                      Compare scans over time to track progress
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-neutral-300">
                      Easily compare multiple scans to identify changes, monitor treatment effectiveness, and visualize patient progress.
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button variant="link" className="text-rose-400 p-0">Learn more &rarr;</Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Tech Behind It Section */}
      <section id="technology" className="py-24 bg-neutral-900/50 border-y border-neutral-800 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="border-rose-500 text-rose-400 px-4 py-1 text-sm mb-6">Technology</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">The Tech Behind Our AI</h2>
            <p className="text-neutral-300 text-lg">
              Our platform leverages cutting-edge AI technologies to deliver accurate and reliable medical imaging analysis.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-neutral-900 to-neutral-800 pb-6">
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="text-rose-400" /> How Our AI Works
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <ul className="space-y-6">
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-rose-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-rose-400 font-bold">1</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1">Deep Learning Networks</h4>
                        <p className="text-neutral-300">
                          Our AI utilizes convolutional neural networks trained on millions of anonymized medical images to identify patterns invisible to the human eye.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-rose-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-rose-400 font-bold">2</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1">Anomaly Detection</h4>
                        <p className="text-neutral-300">
                          Our system flags abnormalities in scans with 99.2% accuracy, highlighting areas that require attention even in early stages.
                        </p>
                      </div>
                    </li>
                    <li className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-rose-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-rose-400 font-bold">3</span>
                      </div>
                      <div>
                        <h4 className="text-lg font-medium mb-1">Real-time Analysis</h4>
                        <p className="text-neutral-300">
                          Results delivered in seconds with enterprise-grade cloud infrastructure designed for maximum reliability and speed.
                        </p>
                      </div>
                    </li>
                  </ul>
                </CardContent>
                <CardFooter className="border-t border-neutral-800 pt-6">
                  <Button className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-md shadow-rose-900/20">
                    Explain My Scan
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="relative h-64 md:h-96 lg:h-full">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                className="w-full h-full"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-full h-full max-w-md mx-auto">
                    <Image 
                      src="/assets/img5.png" 
                      alt="AI Scan Analysis Visualization" 
                      layout="fill"
                      className="object-contain"
                    />
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-neutral-900 to-transparent p-6">
                      <Button className="mt-auto mb-6 bg-rose-600 hover:bg-rose-500 gap-2">
                        <Upload className="w-4 h-4" /> 
                        Try the AI Demo
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-24 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="border-rose-500 text-rose-400 px-4 py-1 text-sm mb-6">Testimonials</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Trusted by Healthcare Professionals</h2>
            <p className="text-neutral-300 text-lg">
              See what doctors and patients are saying about our AI-powered medical imaging platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 transition-all">
              <CardContent className="pt-6">
                <div className="text-rose-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block mr-1">★</span>
                  ))}
                </div>
                <p className="text-neutral-300 mb-6">
                  "As a radiologist with 20 years of experience, I'm impressed with the accuracy of MediVision AI. It has become an invaluable second opinion that helps me catch details I might otherwise miss."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-900/50 flex items-center justify-center">
                    <span className="text-rose-400 font-bold">DR</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Dr. Rachel Chen</h4>
                    <p className="text-neutral-400 text-sm">Chief Radiologist</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 transition-all">
              <CardContent className="pt-6">
                <div className="text-rose-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block mr-1">★</span>
                  ))}
                </div>
                <p className="text-neutral-300 mb-6">
                  "The patient-friendly explanations have transformed how I communicate findings with my patients. They leave appointments with a much clearer understanding of their condition."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-900/50 flex items-center justify-center">
                    <span className="text-rose-400 font-bold">JT</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Dr. James Thompson</h4>
                    <p className="text-neutral-400 text-sm">Neurologist</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 hover:border-rose-800 transition-all">
              <CardContent className="pt-6">
                <div className="text-rose-400 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="inline-block mr-1">★</span>
                  ))}
                </div>
                <p className="text-neutral-300 mb-6">
                  "After receiving my MRI results, I was so grateful for the clear explanations provided. It helped me understand my condition and made the treatment plan much less intimidating."
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-rose-900/50 flex items-center justify-center">
                    <span className="text-rose-400 font-bold">SP</span>
                  </div>
                  <div>
                    <h4 className="font-medium">Sarah Parker</h4>
                    <p className="text-neutral-400 text-sm">Patient</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section id="security" className="py-24 bg-neutral-900/50 border-y border-neutral-800 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <Badge variant="outline" className="border-rose-500 text-rose-400 px-4 py-1 text-sm mb-6">Security & Privacy</Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Your Data, Protected</h2>
            <p className="text-neutral-300 text-lg">
              We prioritize your privacy with industry-leading security measures and full compliance with medical data regulations.
            </p>
          </div>

          <Card className="bg-neutral-900/80 backdrop-blur-md border-neutral-800 max-w-4xl mx-auto">
            <CardContent className="p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div>
                  <div className="flex justify-center mb-8">
                    <ShieldCheck className="w-16 h-16 text-rose-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">Compliance & Protection</h3>
                  <div className="flex flex-wrap justify-center gap-4 mb-6">
                    <Badge className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 px-3 py-1">HIPAA Compliant</Badge>
                    <Badge className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 px-3 py-1">GDPR Compliant</Badge>
                    <Badge className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 px-3 py-1">ISO 27001</Badge>
                    <Badge className="bg-neutral-800 text-neutral-200 hover:bg-neutral-700 px-3 py-1">256-bit Encryption</Badge>
                  </div>
                  <ul className="space-y-3 text-neutral-300">
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-rose-400 text-xs">✓</span>
                      </div>
                      <p>End-to-end encryption for all data transmission and storage</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-rose-400 text-xs">✓</span>
                      </div>
                      <p>Regular third-party security audits and penetration testing</p>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-rose-900/50 flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-rose-400 text-xs">✓</span>
                      </div>
                      <p>Data anonymization protocols for AI training</p>
                    </li>
                  </ul>
                </div>

                <div>
                  <div className="flex justify-center mb-8">
                    <MessageSquare className="w-16 h-16 text-rose-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-center">AI Ethics & Transparency</h3>
                  <p className="text-neutral-300 mb-6">
                    We believe in responsible AI that prioritizes human wellbeing above all. Our commitment to transparency means you always understand how your data is used.
                  </p>
                  <div className="bg-neutral-800/50 border border-neutral-700 rounded-lg p-4">
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Users className="w-4 h-4 text-rose-400" /> Human-in-the-Loop
                    </h4>
                    <p className="text-neutral-400 text-sm">
                      While our AI is highly accurate, medical professionals always review critical findings before they reach patients. We believe technology should augment—not replace—human expertise.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer with Contact Form */}
      <footer className="py-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-2 mb-8">
                <div className="w-10 h-10 rounded-lg bg-rose-600 flex items-center justify-center shadow-lg shadow-rose-800/30">
                  <Brain className="w-6 h-6 text-white" />
                </div>
                <span className="text-xl font-bold">MediVision<span className="text-rose-400">AI</span></span>
              </div>
              
              <h3 className="text-2xl font-bold mb-6">Schedule a Consultation</h3>
              <p className="text-neutral-300 mb-8">
                Interested in learning how MediVisionAI can transform your healthcare practice? Request a personalized demo with our specialists.
              </p>
              
              <Card className="bg-neutral-900/50 border-neutral-800">
                <CardContent className="p-6">
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label htmlFor="name" className="block text-sm font-medium text-neutral-300">Full Name</label>
                        <input
                          type="text"
                          id="name"
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2.5 text-neutral-200 focus:border-rose-500 focus:ring focus:ring-rose-500/20 transition"
                          placeholder="Dr. Jane Smith"
                        />
                      </div>
                      <div className="space-y-2">
                        <label htmlFor="email" className="block text-sm font-medium text-neutral-300">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2.5 text-neutral-200 focus:border-rose-500 focus:ring focus:ring-rose-500/20 transition"
                          placeholder="jane.smith@hospital.org"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="facility" className="block text-sm font-medium text-neutral-300">Facility Type</label>
                      <select
                        id="facility"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2.5 text-neutral-200 focus:border-rose-500 focus:ring focus:ring-rose-500/20 transition"
                      >
                        <option value="">Select facility type</option>
                        <option value="hospital">Hospital</option>
                        <option value="clinic">Private Clinic</option>
                        <option value="imaging">Imaging Center</option>
                        <option value="research">Research Institution</option>
                      </select>
                    </div>
                    
                    <div className="space-y-2">
                      <label htmlFor="message" className="block text-sm font-medium text-neutral-300">Message</label>
                      <textarea
                        id="message"
                        rows="4"
                        className="w-full bg-neutral-800 border border-neutral-700 rounded-md p-2.5 text-neutral-200 focus:border-rose-500 focus:ring focus:ring-rose-500/20 transition"
                        placeholder="Tell us about your needs and how we can help..."
                      ></textarea>
                    </div>
                    
                    <Button className="w-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-md shadow-rose-900/20">
                      Request Consultation
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
            
            <div className="space-y-12">
              <div>
                <h3 className="text-2xl font-bold mb-6">Resources</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="bg-neutral-900/50 border-neutral-800 hover:border-rose-800 transition-all">
                    <CardContent className="p-5">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <FileText className="w-5 h-5 text-rose-400" /> Blog & Research
                      </h4>
                      <p className="text-neutral-400 text-sm mb-4">
                        Stay updated with the latest in medical imaging AI research and real-world applications.
                      </p>
                      <Button variant="outline" className="w-full border-rose-500 text-rose-400 hover:bg-rose-950">
                        View Articles
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-neutral-900/50 border-neutral-800 hover:border-rose-800 transition-all">
                    <CardContent className="p-5">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Users className="w-5 h-5 text-rose-400" /> Community Forum
                      </h4>
                      <p className="text-neutral-400 text-sm mb-4">
                        Connect with other healthcare professionals using AI to enhance patient care.
                      </p>
                      <Button variant="outline" className="w-full border-rose-500 text-rose-400 hover:bg-rose-950">
                        Join Discussion
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-neutral-900/50 border-neutral-800 hover:border-rose-800 transition-all">
                    <CardContent className="p-5">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <Calendar className="w-5 h-5 text-rose-400" /> Webinars & Events
                      </h4>
                      <p className="text-neutral-400 text-sm mb-4">
                        Attend virtual events and learn from experts in radiology and AI.
                      </p>
                      <Button variant="outline" className="w-full border-rose-500 text-rose-400 hover:bg-rose-950">
                        View Schedule
                      </Button>
                    </CardContent>
                  </Card>
                  
                  <Card className="bg-neutral-900/50 border-neutral-800 hover:border-rose-800 transition-all">
                    <CardContent className="p-5">
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-rose-400" /> Case Studies
                      </h4>
                      <p className="text-neutral-400 text-sm mb-4">
                        Explore real-world examples of how our AI has improved diagnostic outcomes.
                      </p>
                      <Button variant="outline" className="w-full border-rose-500 text-rose-400 hover:bg-rose-950">
                        Read Case Studies
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <h4 className="font-bold mb-4">Company</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">About Us</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Careers</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Partners</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Contact</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4">Support</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Help Center</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Documentation</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">API Reference</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Status</a></li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4">Legal</h4>
                  <ul className="space-y-2">
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Privacy Policy</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Terms of Service</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">HIPAA Compliance</a></li>
                    <li><a href="#" className="text-neutral-300 hover:text-rose-400 transition">Data Processing</a></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-neutral-800 mt-16 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-neutral-400 text-sm">
              © {new Date().getFullYear()} MediVisionAI. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-neutral-400 hover:text-rose-400 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-rose-400 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-rose-400 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-rose-400 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-neutral-400 hover:text-rose-400 transition">
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Floating Chat Widget */}
        <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsChatOpen(true)}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-rose-600 to-rose-500 hover:from-rose-500 hover:to-rose-400 shadow-lg shadow-rose-900/40 flex items-center justify-center"
        >
          <MessageSquare className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* ChatBox Component */}
      {isChatOpen && <ChatBox onClose={() => setIsChatOpen(false)} />}
      </footer>
    </div>
  );
}