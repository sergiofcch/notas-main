"use client"

import { Card, CardContent } from "@/components/ui/card"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { CalendarIcon, Clock } from "lucide-react"

export function DailyOverview() {
  const today = new Date()
  const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: es })
  const capitalizedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1)

  return (
    <Card className="bg-gradient-to-r from-violet-500 to-purple-500 text-white">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <CalendarIcon className="h-5 w-5" />
              <span className="text-lg font-medium">{capitalizedDate}</span>
            </div>
            <h2 className="text-2xl font-bold">¡Hoy es un buen día para ser productivo!</h2>
          </div>
          <div className="flex items-center gap-2 text-lg font-medium">
            <Clock className="h-5 w-5" />
            <CurrentTime />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function CurrentTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date())
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return <span>{format(time, "HH:mm:ss")}</span>
}

import { useState, useEffect } from "react"

