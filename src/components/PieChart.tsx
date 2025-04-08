import { useState, useEffect } from "react";
import {
    FinancialRecord,
    useFinancialRecords
} from "../contexts/formContext/financial-record-context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent: React.FC = () => {
    const { records } = useFinancialRecords();
    const [data, setData] = useState({
        labels: [] as string[],
        datasets: [
            {
                data: [] as number[],
            }
        ]
    });

    useEffect(() => {
        const categoryMap: Record<string, number> = {};
        records.forEach((record: FinancialRecord) => {
            const category = record.category || "Unknown";
            if (categoryMap[category]) {
                categoryMap[category] += record.amount || 0;
            } else {
                categoryMap[category] = record.amount || 0;
            }
        });

        setData({
            labels: Object.keys(categoryMap),
            datasets: [
                {
                    data: Object.values(categoryMap),
                }
            ]
        });
    }, [records]);

    return (
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", maxHeight: 400}}>
            <Pie data={data} />
        </div>
    )
}
export default ChartComponent;