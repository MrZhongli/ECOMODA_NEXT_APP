import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table";

// Definición del tipo genérico para las columnas de la tabla
type TableColumn<T> = {
    key: keyof T; // `key` debe ser una clave válida de `T`
    header: string;
    // Un formateador opcional para la celda
    formatter?: (value: any) => React.ReactNode;
};

// Props para el componente `GenericTable`
type GenericTableProps<T> = {
    data: T[]; // Los datos que se mostrarán en la tabla
    columns: TableColumn<T>[]; // Las columnas de la tabla
    onRowClick?: (item: T) => void; // Función opcional cuando se hace clic en una fila
    rowClassName?: (item: T) => string; // Clase opcional para las filas
};

function GenericTable<T extends { id: number }>({
    data,
    columns,
    onRowClick,
    rowClassName
}: GenericTableProps<T>) {
    return (
        <Table className="min-w-full table-auto bg-white shadow-md rounded-lg overflow-hidden">
            <TableHeader className="bg-pink-100">
                <TableRow>
                    {columns.map((column) => (
                        <TableHead key={String(column.key)} className="text-left text-sm font-medium text-gray-600 py-2 px-4">
                            {column.header}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item) => (
                    <TableRow
                        key={item.id}
                        className={`
                            ${onRowClick ? 'cursor-pointer' : ''}
                            ${rowClassName ? rowClassName(item) : ''}
                            hover:bg-pink-50
                            transition duration-200
                        `}
                        onClick={() => onRowClick && onRowClick(item)}
                    >
                        {columns.map((column) => (
                            <TableCell key={String(column.key)} className="text-sm text-gray-700 py-3 px-4">
                                {column.formatter
                                    ? column.formatter(item[column.key])
                                    : String(item[column.key])}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}

export default GenericTable;
