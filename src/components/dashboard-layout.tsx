import type { ReactNode } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FileText, User, Users, Settings, LogOut, Bell, Menu } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface DashboardLayoutProps {
  children: ReactNode
  role: "patient" | "doctor" | "clinician"
  userName?: string
}

export default function DashboardLayout({ children, role, userName = "User Name" }: DashboardLayoutProps) {
  const getNavItems = () => {
    const baseItems = [
      {
        name: "Dashboard",
        href: `/dashboard/${role}`,
        icon: <FileText className="h-5 w-5" />,
      },
      {
        name: "Profile",
        href: `/dashboard/${role}/profile`,
        icon: <User className="h-5 w-5" />,
      },
  
    ]

    if (role === "patient") {
      return [
        ...baseItems,
        {
          name: "Medical Records",
          href: `/dashboard/${role}/records`,
          icon: <FileText className="h-5 w-5" />,
        },
      ]
    }

    if (role === "doctor") {
      return [
        ...baseItems,
        {
          name: "Patients",
          href: `/dashboard/${role}/patients`,
          icon: <Users className="h-5 w-5" />,
        },
        {
          name: "Prescriptions",
          href: `/dashboard/${role}/prescriptions`,
          icon: <FileText className="h-5 w-5" />,
        },
      ]
    }

    if (role === "clinician") {
      return [
        ...baseItems,
        {
          name: "Test Results",
          href: `/dashboard/${role}/results`,
          icon: <FileText className="h-5 w-5" />,
        },
      ]
    }

    return baseItems
  }

  const navItems = getNavItems()
  const roleTitle = role.charAt(0).toUpperCase() + role.slice(1)

  return (
    <div className="flex min-h-screen flex-col bg-blue-50">
      <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-500 to-blue-200 shadow-lg rounded-b-xl  ">
        <div className="container px-6 flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2 md:gap-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <div className="flex items-center gap-2 pb-4 pt-2">
                  <FileText className="h-6 w-6 text-blue-600" />
                  <span className="text-lg font-semibold">MediRecord</span>
                </div>
                <nav className="grid gap-2 py-4">
                  {navItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                    >
                      {item.icon}
                      <span>{item.name}</span>
                    </Link>
                  ))}
                  <Link
                    href="/"
                    className="flex items-center gap-2 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                  >
                    <LogOut className="h-5 w-5" />
                    <span>Logout</span>
                  </Link>
                </nav>
              </SheetContent>
            </Sheet>
            <Link href={`/dashboard/${role}`} className="flex items-center gap-2">
            <img src="/logo1.svg" alt="Logo" className="h-10 w-10 animate-pulse" />
            <span className="text-lg font-semibold hidden md:inline-block">MediRecord</span>
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-600" />
              <span className="sr-only">Notifications</span>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                  <Avatar className="h-9 w-9">
                    <AvatarImage src="/placeholder-user.jpg" alt={userName} />
                    <AvatarFallback>{userName.charAt(0)}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{userName}</DropdownMenuLabel>
                <DropdownMenuLabel className="text-xs font-normal text-gray-500">{roleTitle}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={`/dashboard/${role}/profile`} className="flex w-full items-center">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={`/dashboard/${role}/settings`} className="flex w-full items-center">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href="/" className="flex w-full items-center">
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="hidden w-64 border-r bg-gray-50/50 md:block">
          <div className="flex h-full flex-col gap-2 p-4">
            <div className="py-2">
              <div className="px-3 py-2">
                <h2 className="text-lg font-semibold">{roleTitle} Dashboard</h2>
                <p className="text-sm text-gray-500">Manage your medical records</p>
              </div>
            </div>
            <nav className="grid gap-1 px-2 py-4">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
            <div className="mt-auto">
              <Link
                href="/"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-gray-500 transition-all hover:text-gray-900 hover:bg-gray-100"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </aside>
        <main className="flex-1 overflow-auto p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
