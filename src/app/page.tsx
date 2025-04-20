"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, User, FlaskRoundIcon as Flask, Shield } from "lucide-react"
import { HeartPulse, Stethoscope, TestTube } from "lucide-react";
import { motion, AnimatePresence, useInView } from "framer-motion"
import { useState, useEffect, useRef } from "react";
import CountUp from "react-countup"
import Logo from "@/app/logo1.svg"; // path may vary
export default function Home() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const testimonials = [
    {
      text: `"MediRecord helped me stay on top of my medical records easily."`,
      author: "— Sarah A., Patient",
    },
    {
      text: `"Accessing and updating patient records is now so seamless. A game changer."`,
      author: "— Dr. Jamal K., Cardiologist",
    },
    {
      text: `"Managing lab results has never been this simple. Truly revolutionary."`,
      author: "— Alex M., Lab Technician",
    },
    {
      text: `"Finally, a secure and user-friendly platform for all our healthcare needs."`,
      author: "— Layla T., General Practitioner",
    },
  ]
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length)
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
<header className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-blue-200 shadow-lg rounded-b-xl">
  <div className="container mx-auto px-6 py-4 flex justify-between items-center">
    <div className="flex items-center space-x-4">
      {/* Logo and brand name */}
      <img src="/logo1.svg" alt="Logo" className="h-10 w-10 animate-pulse" />
      <span className="text-3xl font-bold text-white">MediRecord</span>
    </div>
    <div className="space-x-4">
      {/* Login and Register buttons */}
      <Link href="/login">
  <Button
    className="bg-white text-blue-600 border border-blue-600 hover:bg-blue-100 transition duration-300 rounded-full px-6 py-2"
  >
    Login
  </Button>
</Link>
      <Link href="/register">
        <Button
          className="bg-white text-blue-600 hover:bg-blue-100 transition duration-300 rounded-full px-6 py-2"
        >
          Register
        </Button>
      </Link>
    </div>
  </div>
</header>


      <main className="container mx-auto px-10 py-12">
        <section className="flex flex-col md:flex-row items-center justify-between text-center md:text-left mb-16">
          <div className="md:w-1/2">
            <h1 className="text-5xl md:text-5xl font-bold text-gray-900 mb-4">
              Secure Electronic Medical Records Management
            </h1>
            <p className="text-xl md:text-xl text-gray-500 max-w-xl">
              A comprehensive platform for patients, doctors, and clinicians to manage medical records securely and efficiently.
            </p>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-10">
            <img
              src="home_section.svg"
              alt="Medical files illustration"
              className="w-full h-auto max-w-[700px] mx-auto"
            />

          </div>
        </section>




        {/* Choose Your Role */}
        <section className="mb-16">
          <div className="text-center mb-5">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Choose Your Role</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Whether you're a patient, doctor, or clinician, our platform is tailored to meet your healthcare needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Patient Card */}
            <Card className="bg-blue-50">
              <CardHeader>
                <HeartPulse className="h-10 w-10 text-blue-600 mb-1" />
                <CardTitle className="text-xl font-bold text-gray-700 ">For Patients</CardTitle>
                <CardDescription>
                  Access your medical history, prescriptions, and test results anytime, anywhere.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-1">
                  <li>View your complete medical history</li>
                  <li>Download medical records</li>
                  <li>Manage personal information</li>
                  <li>Access prescriptions and certificates</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register?role=patient" className="w-full">
                  <Button className="w-full border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-200">
                    Register as Patient</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Doctor Card */}
            <Card className="bg-blue-50">
              <CardHeader>
                <Stethoscope className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-xl font-bold text-gray-700 ">For Doctors</CardTitle>
                <CardDescription>
                  Efficiently manage patient records, prescriptions, and medical notes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Access patient medical records</li>
                  <li>Create prescriptions and certificates</li>
                  <li>Add medical notes and observations</li>
                  <li>Scan QR codes for quick access</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register?role=doctor" className="w-full">
                  <Button className="w-full border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-200">
                    Register as Doctor</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Clinician Card */}
            <Card className="bg-blue-50">
              <CardHeader>
                <TestTube className="h-10 w-10 text-blue-600 mb-2" />
                <CardTitle className="text-xl font-bold text-gray-700 ">For Clinicians</CardTitle>
                <CardDescription>
                  Upload and manage test results and medical imaging data.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-gray-600 space-y-1 mb-5">
                  <li>Upload laboratory test results</li>
                  <li>Manage MRI and radiology images</li>
                  <li>Update patient medical records</li>
                  <li>Secure data transmission</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link href="/register?role=clinician" className="w-full">
                  <Button className="w-full border border-blue-600 text-blue-600 bg-blue-50 hover:bg-blue-200">
                    Register as Clinician</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Our Impact */}
        <section ref={ref} className="mb-20 mt-20 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Impact</h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-blue-700 font-semibold text-xl">
            {isInView && (
              <>
                <div>
                  <CountUp start={0} end={10000} duration={2} separator="," suffix="+" >
                    {({ countUpRef, start }) => {
                      useEffect(() => {
                        start();
                      }, []);
                      return <span ref={countUpRef} />;
                    }}
                  </CountUp>
                  <p className="text-sm text-gray-500">Users</p>
                </div>
                <div>
                  <CountUp start={0} end={500} duration={2} separator="," suffix="+" >
                    {({ countUpRef, start }) => {
                      useEffect(() => {
                        start();
                      }, []);
                      return <span ref={countUpRef} />;
                    }}
                  </CountUp>
                  <p className="text-sm text-gray-500">Doctors Onboarded</p>
                </div>
                <div>
                  <CountUp start={0} end={1000000} duration={2.5} separator="," suffix="+" >
                    {({ countUpRef, start }) => {
                      useEffect(() => {
                        start();
                      }, []);
                      return <span ref={countUpRef} />;
                    }}
                  </CountUp>
                  <p className="text-sm text-gray-500">Records Managed</p>
                </div>
                <div>
                  <CountUp start={0} end={100} duration={2} separator="," suffix="+" >
                    {({ countUpRef, start }) => {
                      useEffect(() => {
                        start();
                      }, []);
                      return <span ref={countUpRef} />;
                    }}
                  </CountUp>
                  <p className="text-sm text-gray-500">Clinics & Labs</p>
                </div>
              </>
            )}
          </div>
        </section>


        {/* 
Personalized Dashboard Access */}
        <section className="bg-gradient-to-r from-blue-100 via-blue-200 to-blue-300 py-16 rounded-lg mb-16">
          <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between">

            <div className="md:w-1/2 mb-10 md:mb-0">
              <img
                src="/dashboard.svg"
                alt="Dashboard preview"
                className="w-full h-auto max-w-[600px] mx-auto"
              />
            </div>


            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Personalized Dashboard Access
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                Once logged in, users are directed to a dedicated dashboard tailored to their role, with quick access to essential features:
              </p>
              <ul className="list-disc list-inside text-gray-800 space-y-2 text-left">
                <li>Visual overview of your medical history</li>
                <li>Quick access to documents, prescriptions, and certificates</li>
                <li>Real-time updates on results</li>
                <li>Custom features based on your user role (patient, doctor, clinician)</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <User className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>User Profiles</CardTitle>
                <CardDescription>Manage roles and user-specific data with secure access.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <Flask className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Lab Integration</CardTitle>
                <CardDescription>Connect with laboratories to sync test results in real time.</CardDescription>
              </CardHeader>
            </Card>
            <Card>
              <CardHeader>
                <FileText className="h-8 w-8 text-blue-600 mb-2" />
                <CardTitle>Documents Archive</CardTitle>
                <CardDescription>All your prescriptions, certificates, and records in one place.</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </section>

        <section className="mb-32 px-4">
  <h2 className="text-4xl font-extrabold text-center text-gray-900 mb-12">
    What Our Users Say
  </h2>

  <div className="relative w-full max-w-3xl mx-auto">
    <AnimatePresence mode="wait">
      <motion.blockquote
        key={activeIndex}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="bg-white rounded-3xl shadow-xl px-10 py-12 text-center border border-gray-100"
      >
        <p className="italic text-xl md:text-2xl text-gray-800 mb-6 leading-relaxed">
          “{testimonials[activeIndex].text}”
        </p>
        <footer className="text-blue-600 font-medium text-base">
          — {testimonials[activeIndex].author}
        </footer>
      </motion.blockquote>
    </AnimatePresence>
  </div>
</section>


        {/* Security & Compliance Section */}
        <section className="bg-white rounded-3xl shadow-md p-10 mb-20 border border-blue-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Data Security & Compliance</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                We prioritize the privacy and protection of your medical data. MediRecord is built with enterprise-grade security and complies with all healthcare data regulations, including GDPR and HIPAA standards.
              </p>
            </div>
            <div className="flex justify-center md:justify-end">
              <Shield className="h-28 w-28 text-blue-600" />
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-3xl text-white text-center py-16 px-8 shadow-lg mb-20">
          <h2 className="text-4xl font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-lg max-w-2xl mx-auto mb-8">
            Join thousands of users managing their health records effortlessly. Create an account now or reach out to learn more about MediRecord.
          </p>
          <Link href="/register">
            <Button className="px-8 py-4 text-lg font-semibold bg-white text-blue-600 hover:bg-blue-100 transition">
              Create an Account
            </Button>
          </Link>
        </section>


      </main>

      <footer className="bg-gray-900 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <FileText className="h-6 w-6" />
              <span className="text-xl font-bold">MediRecord</span>
            </div>
            <div className="text-gray-400 text-sm">© {new Date().getFullYear()} MediRecord. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  )
}
