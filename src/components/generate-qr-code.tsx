"use client"

import { useState } from "react"
import { QRCodeSVG } from "qrcode.react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Printer } from "lucide-react"

interface GenerateQRCodeProps {
  type: "patient" | "prescription"
  id: string
  name: string
}

export default function GenerateQRCode({ type, id, name }: GenerateQRCodeProps) {
  const [showPrintView, setShowPrintView] = useState(false)

  // Create QR code data
  const qrData = JSON.stringify({ type, id })

  const handleDownload = () => {
    const canvas = document.getElementById("qr-code-canvas") as HTMLCanvasElement
    if (!canvas) return

    const url = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = url
    link.download = `${type}-${id}-qrcode.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    setShowPrintView(true)
    setTimeout(() => {
      window.print()
      setShowPrintView(false)
    }, 100)
  }

  if (showPrintView) {
    return (
      <div className="print-container p-8 flex flex-col items-center">
        <h2 className="text-xl font-bold mb-2">{type === "patient" ? "Patient ID" : "Prescription"}</h2>
        <p className="mb-4">{name}</p>
        <QRCodeSVG id="qr-code-canvas" value={qrData} size={200} level="H" includeMargin={true} />
        <p className="mt-4 text-sm text-gray-500">ID: {id}</p>
      </div>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{type === "patient" ? "Patient QR Code" : "Prescription QR Code"}</CardTitle>
        <CardDescription>
          Scan this code to quickly access {type === "patient" ? "patient information" : "prescription details"}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <QRCodeSVG id="qr-code-canvas" value={qrData} size={200} level="H" includeMargin={true} />
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" onClick={handleDownload}>
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
        <Button variant="outline" onClick={handlePrint}>
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </CardFooter>
    </Card>
  )
}
