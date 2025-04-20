import { PDFDocument, rgb, StandardFonts } from "pdf-lib"
import JSZip from "jszip"
import { saveAs } from "file-saver"

// Types for patient data
export interface PatientData {
  personalInfo: PersonalInfo
  medicalRecords: MedicalRecord[]
  prescriptions: Prescription[]
  testResults: TestResult[]
  medicalImages: MedicalImage[]
  certificates: Certificate[]
}

export interface PersonalInfo {
  id: string
  name: string
  dateOfBirth: string
  gender: string
  bloodType: string
  allergies: string[]
  chronicConditions: string[]
  address: string
  phone: string
  email: string
  emergencyContact: string
}

export interface MedicalRecord {
  id: string
  title: string
  date: string
  doctor: string
  type: string
  content: string
  pdfUrl?: string
}

export interface Prescription {
  id: string
  title: string
  date: string
  doctor: string
  status: string
  details: string
  expiryDate: string
  pdfUrl: string
}

export interface TestResult {
  id: string
  title: string
  date: string
  type: string
  doctor: string
  results: string
  pdfUrl?: string
}

export interface MedicalImage {
  id: string
  title: string
  date: string
  type: string // MRI, X-ray, CT scan, etc.
  doctor: string
  imageUrl: string
  description: string
}

export interface Certificate {
  id: string
  title: string
  date: string
  doctor: string
  validUntil: string
  status: string
  type: string
  pdfUrl: string
}

// Main export function
export async function exportPatientData(patientData: PatientData): Promise<void> {
  try {
    // Create a new zip file
    const zip = new JSZip()

    // Add summary PDF to the zip
    const summaryPdfBytes = await createSummaryPdf(patientData)
    zip.file("patient_summary.pdf", summaryPdfBytes)

    // Add folder for prescriptions
    const prescriptionsFolder = zip.folder("prescriptions")
    for (const prescription of patientData.prescriptions) {
      try {
        const response = await fetch(prescription.pdfUrl)
        const pdfBlob = await response.blob()
        prescriptionsFolder?.file(`${prescription.id}.pdf`, pdfBlob)
      } catch (error) {
        console.error(`Failed to fetch prescription PDF: ${prescription.id}`, error)
      }
    }

    // Add folder for medical records
    const recordsFolder = zip.folder("medical_records")
    for (const record of patientData.medicalRecords) {
      if (record.pdfUrl) {
        try {
          const response = await fetch(record.pdfUrl)
          const pdfBlob = await response.blob()
          recordsFolder?.file(`${record.id}.pdf`, pdfBlob)
        } catch (error) {
          console.error(`Failed to fetch medical record PDF: ${record.id}`, error)
        }
      }
    }

    // Add folder for test results
    const testsFolder = zip.folder("test_results")
    for (const test of patientData.testResults) {
      if (test.pdfUrl) {
        try {
          const response = await fetch(test.pdfUrl)
          const pdfBlob = await response.blob()
          testsFolder?.file(`${test.id}.pdf`, pdfBlob)
        } catch (error) {
          console.error(`Failed to fetch test result PDF: ${test.id}`, error)
        }
      }
    }

    // Add folder for medical images
    const imagesFolder = zip.folder("medical_images")
    for (const image of patientData.medicalImages) {
      try {
        const response = await fetch(image.imageUrl)
        const imageBlob = await response.blob()
        imagesFolder?.file(`${image.id}${getFileExtension(image.imageUrl)}`, imageBlob)
      } catch (error) {
        console.error(`Failed to fetch medical image: ${image.id}`, error)
      }
    }

    // Add folder for certificates
    const certificatesFolder = zip.folder("certificates")
    for (const certificate of patientData.certificates) {
      try {
        const response = await fetch(certificate.pdfUrl)
        const pdfBlob = await response.blob()
        certificatesFolder?.file(`${certificate.id}.pdf`, pdfBlob)
      } catch (error) {
        console.error(`Failed to fetch certificate PDF: ${certificate.id}`, error)
      }
    }

    // Generate the zip file
    const zipBlob = await zip.generateAsync({ type: "blob" })

    // Save the zip file
    saveAs(zipBlob, `patient_data_${patientData.personalInfo.id}_${formatDate(new Date())}.zip`)
  } catch (error) {
    console.error("Failed to export patient data:", error)
    throw new Error("Failed to export patient data. Please try again later.")
  }
}

// Helper function to create a summary PDF
async function createSummaryPdf(patientData: PatientData): Promise<Uint8Array> {
  const pdfDoc = await PDFDocument.create()
  const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
  const helveticaBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold)

  // Add cover page
  let page = pdfDoc.addPage()
  const { width, height } = page.getSize()

  // Title
  page.drawText("PATIENT MEDICAL RECORDS", {
    x: 50,
    y: height - 100,
    size: 24,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  // Patient info
  page.drawText(`Patient: ${patientData.personalInfo.name}`, {
    x: 50,
    y: height - 150,
    size: 14,
    font: helveticaFont,
  })

  page.drawText(`ID: ${patientData.personalInfo.id}`, {
    x: 50,
    y: height - 170,
    size: 14,
    font: helveticaFont,
  })

  page.drawText(`Date of Birth: ${patientData.personalInfo.dateOfBirth}`, {
    x: 50,
    y: height - 190,
    size: 14,
    font: helveticaFont,
  })

  page.drawText(`Generated on: ${formatDate(new Date())}`, {
    x: 50,
    y: height - 210,
    size: 14,
    font: helveticaFont,
  })

  // Add personal information page
  page = pdfDoc.addPage()

  page.drawText("PERSONAL INFORMATION", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  let yPosition = height - 80

  // Personal details
  const personalDetails = [
    { label: "Name", value: patientData.personalInfo.name },
    { label: "Date of Birth", value: patientData.personalInfo.dateOfBirth },
    { label: "Gender", value: patientData.personalInfo.gender },
    { label: "Blood Type", value: patientData.personalInfo.bloodType },
    { label: "Address", value: patientData.personalInfo.address },
    { label: "Phone", value: patientData.personalInfo.phone },
    { label: "Email", value: patientData.personalInfo.email },
    { label: "Emergency Contact", value: patientData.personalInfo.emergencyContact },
  ]

  for (const detail of personalDetails) {
    page.drawText(`${detail.label}: ${detail.value}`, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    })
    yPosition -= 20
  }

  // Allergies
  yPosition -= 20
  page.drawText("Allergies:", {
    x: 50,
    y: yPosition,
    size: 12,
    font: helveticaBold,
  })

  yPosition -= 20
  for (const allergy of patientData.personalInfo.allergies) {
    page.drawText(`• ${allergy}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    })
    yPosition -= 20
  }

  // Chronic conditions
  yPosition -= 20
  page.drawText("Chronic Conditions:", {
    x: 50,
    y: yPosition,
    size: 12,
    font: helveticaBold,
  })

  yPosition -= 20
  for (const condition of patientData.personalInfo.chronicConditions) {
    page.drawText(`• ${condition}`, {
      x: 70,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    })
    yPosition -= 20
  }

  // Add medical records summary page
  page = pdfDoc.addPage()

  page.drawText("MEDICAL RECORDS SUMMARY", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  yPosition = height - 80

  for (const record of patientData.medicalRecords) {
    if (yPosition < 100) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(record.title, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaBold,
    })

    yPosition -= 20

    page.drawText(`Date: ${record.date} | Doctor: ${record.doctor}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 30
  }

  // Add prescriptions summary page
  page = pdfDoc.addPage()

  page.drawText("PRESCRIPTIONS SUMMARY", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  yPosition = height - 80

  for (const prescription of patientData.prescriptions) {
    if (yPosition < 100) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(prescription.title, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaBold,
    })

    yPosition -= 20

    page.drawText(`Date: ${prescription.date} | Status: ${prescription.status} | Doctor: ${prescription.doctor}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 20

    page.drawText(`Details: ${prescription.details}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 30
  }

  // Add test results summary page
  page = pdfDoc.addPage()

  page.drawText("TEST RESULTS SUMMARY", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  yPosition = height - 80

  for (const test of patientData.testResults) {
    if (yPosition < 100) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(test.title, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaBold,
    })

    yPosition -= 20

    page.drawText(`Date: ${test.date} | Type: ${test.type} | Doctor: ${test.doctor}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 30
  }

  // Add medical images summary page
  page = pdfDoc.addPage()

  page.drawText("MEDICAL IMAGES SUMMARY", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  yPosition = height - 80

  for (const image of patientData.medicalImages) {
    if (yPosition < 100) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(image.title, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaBold,
    })

    yPosition -= 20

    page.drawText(`Date: ${image.date} | Type: ${image.type} | Doctor: ${image.doctor}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 20

    page.drawText(`Description: ${image.description}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 30
  }

  // Add certificates summary page
  page = pdfDoc.addPage()

  page.drawText("CERTIFICATES SUMMARY", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  yPosition = height - 80

  for (const certificate of patientData.certificates) {
    if (yPosition < 100) {
      page = pdfDoc.addPage()
      yPosition = height - 50
    }

    page.drawText(certificate.title, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaBold,
    })

    yPosition -= 20

    page.drawText(
      `Date: ${certificate.date} | Valid Until: ${certificate.validUntil} | Status: ${certificate.status}`,
      {
        x: 50,
        y: yPosition,
        size: 10,
        font: helveticaFont,
      },
    )

    yPosition -= 20

    page.drawText(`Doctor: ${certificate.doctor}`, {
      x: 50,
      y: yPosition,
      size: 10,
      font: helveticaFont,
    })

    yPosition -= 30
  }

  // Add final page with disclaimer
  page = pdfDoc.addPage()

  page.drawText("DISCLAIMER", {
    x: 50,
    y: height - 50,
    size: 16,
    font: helveticaBold,
    color: rgb(0, 0, 0.7),
  })

  const disclaimer = [
    "This document contains confidential medical information.",
    "It is intended for personal use only and should be kept secure.",
    "Please consult with your healthcare provider before making any medical decisions based on this information.",
    "MediRecord is not responsible for any actions taken based on the information contained in this document.",
    "",
    `Generated on: ${formatDate(new Date())}`,
    `Patient ID: ${patientData.personalInfo.id}`,
  ]

  yPosition = height - 80

  for (const line of disclaimer) {
    page.drawText(line, {
      x: 50,
      y: yPosition,
      size: 12,
      font: helveticaFont,
    })
    yPosition -= 20
  }

  return pdfDoc.save()
}

// Helper function to format date
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0]
}

// Helper function to get file extension from URL
function getFileExtension(url: string): string {
  const extension = url.split(".").pop()?.toLowerCase()
  if (!extension) return ".jpg"

  return extension.includes("?") ? `.${extension.split("?")[0]}` : `.${extension}`
}
