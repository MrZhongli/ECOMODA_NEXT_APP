import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

interface SummaryCardProps {
    title: string
    amount: number
    trend: number
    icon: React.ReactNode
}

export const SummaryCard: React.FC<SummaryCardProps> = ({ title, amount, trend, icon }) => (
    <Card className="flex flex-col h-full">
        <CardHeader>
            <CardTitle className="flex items-center justify-between text-[#4d619d]">
                <span className="flex items-center">
                    {icon}
                    <span className="ml-2">{title}</span>
                </span>
                {trend > 0 ? (
                    <ArrowUpRight className="h-4 w-4 text-green-500" />
                ) : (
                    <ArrowDownRight className="h-4 w-4 text-red-500" />
                )}
            </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-2xl font-bold">${amount.toLocaleString()}</p>
            <p className={`text-sm ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? '+' : ''}{trend}% vs mes anterior
            </p>
        </CardContent>
    </Card>
)