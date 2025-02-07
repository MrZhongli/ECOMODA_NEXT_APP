'use client'

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

type FilterCardProps = {
  clients: string[]
  selectedClient: string
  onClientChange: (value: string) => void
  startDate: Date | undefined
  endDate: Date | undefined
  onStartDateChange: (date: Date | undefined) => void
  onEndDateChange: (date: Date | undefined) => void
}

const formatDate = (date: Date | undefined): string => {
  if (!date) return ''
  return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
}

export const FilterCard: React.FC<FilterCardProps> = ({
  clients,
  selectedClient,
  onClientChange,
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-[#4d619d]">Filtros</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Cliente</label>
          <Select onValueChange={onClientChange} defaultValue={selectedClient}>
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar cliente" />
            </SelectTrigger>
            <SelectContent>
              {clients.map(client => (
                <SelectItem key={client} value={client}>{client}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha inicial</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(startDate) || <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={startDate} onSelect={onStartDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">Fecha final</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formatDate(endDate) || <span>Seleccionar fecha</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar mode="single" selected={endDate} onSelect={onEndDateChange} initialFocus />
            </PopoverContent>
          </Popover>
        </div>
      </CardContent>
    </Card>
  )
}
