'use client'

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Bell, Clock, Menu, Star, User, Plus, FileText, Check, X, HelpCircle } from 'lucide-react'

export default function FacturaDetallada() {
    const [estadoFactura, setEstadoFactura] = useState('Draft')
    const [modalPagoAbierto, setModalPagoAbierto] = useState(false)

    const confirmarFactura = () => {
        setModalPagoAbierto(true)
    }

    const realizarPago = () => {
        setEstadoFactura('Pagando')
        setModalPagoAbierto(false)
    }

    return (
        <div className="min-h-screen bg-white text-black">
            
            {/* Subencabezado */}
            <div className="bg-white border-b border-gray-200 p-4">
                <div className="container mx-auto">
                    <div className="flex justify-between items-center">
                        <div>
                            <p className="text-[#4d619d] text-sm">Quotations / S00028</p>
                            <h1 className="text-2xl font-bold">Draft Invoice</h1>
                        </div>
                        <div className="flex space-x-2">
                            <Button className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white">
                                <Plus className="mr-2 h-4 w-4" /> New
                            </Button>
                            <Button className="bg-[#f0627e] hover:bg-[#e05270] text-white" onClick={confirmarFactura}>
                                Confirm
                            </Button>
                            <Button variant="outline">Cancel</Button>
                        </div>
                    </div>
                    <div className="mt-2">
                        <Badge className={
                            estadoFactura === 'Draft' ? 'bg-yellow-200 text-yellow-800' :
                                estadoFactura === 'Posted' ? 'bg-green-200 text-green-800' :
                                    'bg-blue-200 text-blue-800'
                        }>
                            {estadoFactura}
                        </Badge>
                    </div>
                </div>
            </div>

            {/* Cuerpo Principal */}
            <main className="container mx-auto p-4">
                <div className="grid grid-cols-2 gap-6 mb-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Customer Information</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <h3 className="font-bold">Deco Addict</h3>
                            <p>77 Santa Barbara Rd, Pleasant Hill CA 94523, United States</p>
                            <p>Tax ID: US12345673</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader>
                            <CardTitle>Invoice Details</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p><strong>Invoice Date:</strong> {new Date().toLocaleDateString()}</p>
                            <p><strong>Payment Terms:</strong> 30 days</p>
                            <p><strong>Journal:</strong> Customer Invoices</p>
                        </CardContent>
                    </Card>
                </div>

                <Tabs defaultValue="invoice-lines">
                    <TabsList className="mb-4">
                        <TabsTrigger value="invoice-lines">Invoice Lines</TabsTrigger>
                        <TabsTrigger value="journal-items">Journal Items</TabsTrigger>
                        <TabsTrigger value="other-info">Other Info</TabsTrigger>
                    </TabsList>
                    <TabsContent value="invoice-lines">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Product</TableHead>
                                    <TableHead>Account</TableHead>
                                    <TableHead>Quantity</TableHead>
                                    <TableHead>Price</TableHead>
                                    <TableHead>Tax</TableHead>
                                    <TableHead>Total</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                <TableRow>
                                    <TableCell>[FURN_5555] Cable Management Box</TableCell>
                                    <TableCell>400000 Product Sales</TableCell>
                                    <TableCell>1.00</TableCell>
                                    <TableCell>$100.00</TableCell>
                                    <TableCell>15%</TableCell>
                                    <TableCell>$115.00</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                        <div className="mt-4 space-x-2">
                            <Button variant="outline">Add a line</Button>
                            <Button variant="outline">Add a section</Button>
                            <Button variant="outline">Add a note</Button>
                            <Button variant="outline">Catalog</Button>
                        </div>
                    </TabsContent>
                    <TabsContent value="journal-items">
                        {/* Contenido para Journal Items */}
                    </TabsContent>
                    <TabsContent value="other-info">
                        {/* Contenido para Other Info */}
                    </TabsContent>
                </Tabs>

                <div className="mt-6 flex justify-between">
                    <Card className="w-1/2">
                        <CardHeader>
                            <CardTitle>Outstanding Credits</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell>RINV/2024/00004</TableCell>
                                        <TableCell>$48,012.50</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">Add</Button>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>RINV/2024/00005</TableCell>
                                        <TableCell>$22,137.50</TableCell>
                                        <TableCell>
                                            <Button variant="outline" size="sm">Add</Button>
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                    <Card className="w-1/3">
                        <CardHeader>
                            <CardTitle>Summary</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Untaxed Amount:</span>
                                    <span>$100.00</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Tax (15%):</span>
                                    <span>$15.00</span>
                                </div>
                                <div className="flex justify-between font-bold">
                                    <span>Total:</span>
                                    <span>$115.00</span>
                                </div>
                                <div className="flex justify-between text-[#4d619d] font-bold">
                                    <span>Amount Due:</span>
                                    <span>$115.00</span>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </main>

            {/* Modal de Pago */}
            <Dialog open={modalPagoAbierto} onOpenChange={setModalPagoAbierto}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-center">
                            <span>Pay</span>
                            <Button variant="ghost" size="sm" onClick={() => setModalPagoAbierto(false)}>
                                <X className="h-4 w-4" />
                            </Button>
                        </DialogTitle>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Journal</label>
                                <Select defaultValue="bank">
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select journal" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="bank">Bank</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Payment Method</label>
                                <div className="flex items-center">
                                    <span className="text-sm">Manual Payment</span>
                                    <HelpCircle className="h-4 w-4 ml-2 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Recipient Bank Account</label>
                                <p className="text-sm">BANK134567890 (untrusted)</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div>
                                <label className="text-sm font-medium">Amount</label>
                                <Input value="$ 115.00" readOnly />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Payment Date</label>
                                <Input value="12/26/2024" readOnly />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Memo</label>
                                <Input value="INV/2024/00009" readOnly />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                        <Button variant="outline" onClick={() => setModalPagoAbierto(false)}>
                            Discard
                        </Button>
                        <Button className="bg-[#4d619d] hover:bg-[#3d4f7d] text-white" onClick={realizarPago}>
                            Create Payment
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}