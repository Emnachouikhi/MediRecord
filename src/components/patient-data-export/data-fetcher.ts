import type {
  PatientData,
  PersonalInfo,
  MedicalRecord,
  Prescription,
  TestResult,
  MedicalImage,
  Certificate,
} from "./data-export-service"

// Mock data for testing - in a real app, this would fetch from an API
export async function fetchPatientData(patientId: string): Promise<PatientData> {
  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock personal info
  const personalInfo: PersonalInfo = {
    id: patientId,
    name: "John Doe",
    dateOfBirth: "1980-05-15",
    gender: "Male",
    bloodType: "O+",
    allergies: ["Penicillin", "Peanuts"],
    chronicConditions: ["Hypertension", "Type 2 Diabetes"],
    address: "123 Main Street, Anytown, CA 12345",
    phone: "+1 (555) 123-4567",
    email: "john.doe@example.com",
    emergencyContact: "Jane Doe (Wife) - +1 (555) 987-6543",
  }

  // Mock medical records
  const medicalRecords: MedicalRecord[] = [
    {
      id: "rec-001",
      title: "General Check-up Report",
      date: "April 15, 2023",
      doctor: "Dr. Sarah Johnson",
      type: "consultation",
      content:
        "Patient is in good health overall. Blood pressure is slightly elevated at 130/85 mmHg. Recommended continued monitoring and medication.",
      pdfUrl: "/sample-pdfs/general-checkup.pdf",
    },
    {
      id: "rec-002",
      title: "Cardiology Consultation",
      date: "March 25, 2023",
      doctor: "Dr. Emily Rodriguez",
      type: "consultation",
      content: "Cardiac examination normal. EKG shows normal sinus rhythm. No evidence of ischemia or arrhythmia.",
      pdfUrl: "/sample-pdfs/cardiology.pdf",
    },
    {
      id: "rec-003",
      title: "Annual Physical Examination",
      date: "December 5, 2022",
      doctor: "Dr. Sarah Johnson",
      type: "consultation",
      content:
        "Complete physical examination performed. Patient is maintaining good health with controlled chronic conditions.",
      pdfUrl: "/sample-pdfs/annual-physical.pdf",
    },
  ]

  // Mock prescriptions
  const prescriptions: Prescription[] = [
    {
      id: "presc-001",
      title: "Lisinopril 10mg",
      date: "April 10, 2023",
      doctor: "Dr. Sarah Johnson",
      status: "active",
      details: "Take one tablet by mouth once daily. Take with or without food.",
      expiryDate: "October 10, 2023",
      pdfUrl: "/sample-pdfs/prescription-lisinopril.pdf",
    },
    {
      id: "presc-002",
      title: "Metformin 500mg",
      date: "March 15, 2023",
      doctor: "Dr. Michael Chen",
      status: "active",
      details: "Take one tablet by mouth twice daily with meals.",
      expiryDate: "September 15, 2023",
      pdfUrl: "/sample-pdfs/prescription-metformin.pdf",
    },
    {
      id: "presc-003",
      title: "Atorvastatin 20mg",
      date: "February 20, 2023",
      doctor: "Dr. Sarah Johnson",
      status: "active",
      details: "Take one tablet by mouth once daily at bedtime.",
      expiryDate: "August 20, 2023",
      pdfUrl: "/sample-pdfs/prescription-atorvastatin.pdf",
    },
    {
      id: "presc-004",
      title: "Amoxicillin 500mg",
      date: "December 15, 2022",
      doctor: "Dr. Sarah Johnson",
      status: "completed",
      details: "Take one capsule by mouth three times daily for 10 days.",
      expiryDate: "December 25, 2022",
      pdfUrl: "/sample-pdfs/prescription-amoxicillin.pdf",
    },
  ]

  // Mock test results
  const testResults: TestResult[] = [
    {
      id: "test-001",
      title: "Blood Test Results",
      date: "April 10, 2023",
      type: "blood",
      doctor: "Dr. Michael Chen",
      results:
        "Complete Blood Count (CBC) and Comprehensive Metabolic Panel (CMP) within normal ranges. HbA1c slightly elevated at 6.2%.",
      pdfUrl: "/sample-pdfs/blood-test.pdf",
    },
    {
      id: "test-002",
      title: "Lipid Panel Results",
      date: "February 28, 2023",
      type: "blood",
      doctor: "Dr. Michael Chen",
      results:
        "Total Cholesterol: 195 mg/dL, LDL: 110 mg/dL, HDL: 45 mg/dL, Triglycerides: 150 mg/dL. Overall results are within target range.",
      pdfUrl: "/sample-pdfs/lipid-panel.pdf",
    },
    {
      id: "test-003",
      title: "Chest X-Ray Results",
      date: "March 15, 2023",
      type: "imaging",
      doctor: "Dr. Sarah Johnson",
      results:
        "No acute cardiopulmonary process. Heart size and pulmonary vascularity appear normal. No pleural effusion or pneumothorax.",
      pdfUrl: "/sample-pdfs/chest-xray.pdf",
    },
    {
      id: "test-004",
      title: "Abdominal Ultrasound",
      date: "December 10, 2022",
      type: "imaging",
      doctor: "Dr. Emily Rodriguez",
      results:
        "Liver, gallbladder, pancreas, and spleen appear normal. No evidence of gallstones or biliary obstruction. Kidneys show normal size and echogenicity.",
      pdfUrl: "/sample-pdfs/abdominal-ultrasound.pdf",
    },
  ]

  // Mock medical images
  const medicalImages: MedicalImage[] = [
    {
      id: "img-001",
      title: "Chest X-Ray",
      date: "March 15, 2023",
      type: "X-ray",
      doctor: "Dr. Sarah Johnson",
      imageUrl: "/sample-images/chest-x-ray.jpg",
      description: "Frontal and lateral views of the chest. No acute cardiopulmonary process observed.",
    },
    {
      id: "img-002",
      title: "Abdominal Ultrasound",
      date: "December 10, 2022",
      type: "Ultrasound",
      doctor: "Dr. Emily Rodriguez",
      imageUrl: "/sample-images/Liver-Ultrasound-Normal-Labeled.png",
      description: "Ultrasound of the abdomen showing liver, gallbladder, pancreas, and spleen.",
    },
    {
      id: "img-003",
      title: "Right Knee MRI",
      date: "February 10, 2023",
      type: "MRI",
      doctor: "Dr. Emily Rodriguez",
      imageUrl: "/sample-images/images.jpg",
      description: "MRI of the right knee showing normal ligaments and menisci. No evidence of tear or injury.",
    },
  ]

  // Mock certificates
  const certificates: Certificate[] = [
    {
      id: "cert-001",
      title: "Medical Fitness Certificate",
      date: "March 10, 2023",
      doctor: "Dr. Sarah Johnson",
      validUntil: "March 10, 2024",
      status: "valid",
      type: "fitness",
      pdfUrl: "/sample-pdfs/medical-fitness.pdf",
    },
    {
      id: "cert-002",
      title: "Vaccination Certificate - COVID-19",
      date: "January 15, 2023",
      doctor: "Dr. Michael Chen",
      validUntil: "Permanent",
      status: "valid",
      type: "vaccination",
      pdfUrl: "/sample-pdfs/vaccination.pdf",
    },
    {
      id: "cert-003",
      title: "Sick Leave Certificate",
      date: "April 5, 2023",
      doctor: "Dr. Sarah Johnson",
      validUntil: "April 12, 2023",
      status: "expired",
      type: "sickLeave",
      pdfUrl: "/sample-pdfs/sick-leave.pdf",
    },
  ]

  // Return complete patient data
  return {
    personalInfo,
    medicalRecords,
    prescriptions,
    testResults,
    medicalImages,
    certificates,
  }
}
