/*
PieChart.tsx
Piechart component to show expense breakdown by category.
Does not show positive records or "income".
Data is set by using a listener to get logged in user data.
*/

import { useState, useEffect } from "react";
import {
    FinancialRecord,
    useFinancialRecords
} from "../contexts/formContext/financial-record-context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartComponent: React.FC = () => {
    // chart component initialized types, separate default data and setData
    const { records } = useFinancialRecords();
    const [data, setData] = useState({
        labels: [] as string[],
        datasets: [
            {
                data: [] as number[],
                backgroundColor: [] as string[],
                borderWidth: 0,
            }
        ],
    });

    // listener to get saved data
    useEffect(() => {
        const categoryMap: Record<string, number> = {};
        records.forEach((record: FinancialRecord) => {

            // either a saved category or "Other" catch all
            const category = record.category || "Other";

            // add the amount to the category
            if (categoryMap[category]) {
                categoryMap[category] += record.amount || 0;
            } else {
                categoryMap[category] = record.amount || 0;
            }
        });

        // change data in piechart
        setData({
            labels: Object.keys(categoryMap),
            datasets: [
                {
                    data: Object.values(categoryMap),
                    backgroundColor: [
                        "rgb(67, 123, 255)",
                        "rgb(111, 0, 152)",
                        "rgb(13, 32, 119)",
                        "rgb(107, 1, 182)",
                        "rgb(94, 111, 223)",
                        "rgb(187, 0, 255)"
                    ],
                    borderWidth:1
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