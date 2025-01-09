'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Bell, Clock, Menu, Star, User, Plus, FileText, Check, X, HelpCircle } from 'lucide-react'

export default function DetallePago() {
    const [estadoPago, setEstadoPago] = useState('Draft')
    const [modalConfirmacionAbierto, setModalConfirmacionAbierto] = useState(false)

    const abrirModalConfirmacion = () => {
        setModalConfirmacionAbierto(true)
    }

    const confirmarPago = () => {
        setEstadoPago('Paid')
        setModalConfirmacionAbierto(false)
    }

    return (
        <div className="min-h-screen bg-white text-black">
        

            {/* Subencabezado */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[#4d619d] text-sm">S00022 / INV/2024/00005 / PAY00001</p>
                            <h1 className="text-2xl font-bold">Payment Details</h1>
                        </div>
                        <div className="flex space-x-2">
                            <Button className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
                                <Plus className="mr-2 h-4 w-4" /> New
                            </Button>
                            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white" onClick={abrirModalConfirmacion}>
                                Confirm
                            </Button>
                            <Button variant="outline">Cancel</Button>
                        </div>
                    </div>
                    <div className="mt-4">
                        <div className="flex space-x-2">
                            <Badge className={estadoPago === 'Draft' ? 'bg-[#f0627e] text-white' : 'bg-gray-200 text-gray-600'}>
                                Draft
                            </Badge>
                            <Badge className={estadoPago === 'In Process' ? 'bg-[#4d619d] text-white' : 'bg-gray-200 text-gray-600'}>
                                In Process
                            </Badge>
                            <Badge className={estadoPago === 'Paid' ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-600'}>
                                Paid
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contenido Principal */}
            <main className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Payment Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label>Payment Type</Label>
                                    <RadioGroup defaultValue="receive" className="flex space-x-4">
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="send" id="send" />
                                            <Label htmlFor="send">Send</Label>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <RadioGroupItem value="receive" id="receive" />
                                            <Label htmlFor="receive">Receive</Label>
                                        </div>
                                    </RadioGroup>
                                </div>
                                <div>
                                    <Label>Customer</Label>
                                    <Input value="Azure Interior" readOnly />
                                </div>
                                <div>
                                    <Label>Amount</Label>
                                    <Input value="$161.00" readOnly />
                                </div>
                                <div>
                                    <Label>Date</Label>
                                    <Input value="12/28/2024" readOnly />
                                </div>
                                <div>
                                    <Label>Memo</Label>
                                    <Input value="INV/2024/00005" readOnly />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Financial Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div>
                                    <Label>Journal</Label>
                                    <Input value="Bank" readOnly />
                                </div>
                                <div>
                                    <Label>Payment Method</Label>
                                    <Input value="Manual Payment" readOnly />
                                </div>
                                <div>
                                    <Label>Company Bank Account</Label>
                                    <Input value="BANK134567890 (untrusted)" readOnly />
                                </div>
                                <div>
                                    <Badge className="bg-[#4d619d] text-white">1 Invoice</Badge>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Modal de Confirmación */}
            <Dialog open={modalConfirmacionAbierto} onOpenChange={setModalConfirmacionAbierto}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirm Payment</DialogTitle>
                    </DialogHeader>
                    <p>Are you sure you want to confirm this payment?</p>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={() => setModalConfirmacionAbierto(false)}>
                            Cancel
                        </Button>
                        <Button className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white" onClick={confirmarPago}>
                            Confirm
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}