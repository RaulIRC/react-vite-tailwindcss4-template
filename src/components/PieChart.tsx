/*
PieChart.tsx
Piechart component to show expense breakdown by category.
Data is set by using a listener to get logged in user data.
Called by pages.Dashboard.index
*/

import { useState, useEffect } from "react";
import {
    FinancialRecord,
    useFinancialRecords
} from "../contexts/formContext/financial-record-context";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend );

const ChartComponent = () => {
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

    // customize the legend
    const options = {
            plugins: {
                legend: {
                    display: true,
                    position: "right",
                    title: {
                        display: true,
                        text: "Costs by Category",
                        color: "rgb(230, 233, 242)",
                        font : {weight: "bold"},
                    },

                    // get the piechart data for the legend
                    labels: {
                        generateLabels: (chart) => {
                            const datasets = chart.data.datasets;
                            return datasets[0].data.map((data, i) => ({
                                text: `${chart.data.labels[i]} ${": $"} ${data}`,
                                fillStyle: datasets[0].backgroundColor[i],
                                index: i,
                                fontColor:"rgb(230, 233, 242)",
                            }))
                        },
                    }
                }
            }
    }

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
            ],
        });
    }, [records]); // chart does not constantly update and only when a change is made

    return (
        <>
        <div style={{ display: "flex", flexWrap:"wrap", justifyContent: "center", maxHeight: 500 }}>
            {/* check if there is data */}
            { data.datasets[0].data.every(item=>item===0) ? (
                <label>Add an expense using the form below to see your report!</label>
            ):(
                <Pie data={data} options={options}/> 
            )}
        </div>
        </>
    )
}
export default ChartComponent;