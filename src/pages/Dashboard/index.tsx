import { auth } from "../../firebase/firebaseConfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect, useState } from 'react';
import { useNavigate } from "@tanstack/react-router";
import { FinancialRecordForm } from "../../components/financialrecord/financial-record-form"; // Financial Record Form Component
import PieChart from "../../components/PieChart";
import { ListComponent } from "../../components/list/ListComponent";
import { useFinancialRecords, useSettingsConfig } from "../../contexts/formContext/financial-record-context";

// Expense Tracker

export const Dashboard = () => {
    
    const [user, loading, error] = useAuthState(auth);

    const { settingsConfig } = useSettingsConfig();
    const { records } = useFinancialRecords();
    const [showForm, setShowForm] = useState(false);
    // Monthly budget state, default to 600
    const navigate = useNavigate();

    const monthlyBudget = settingsConfig?.[0]?.monthlyBudget || 600; // Default budget is 600 if not set
    // Function to calculate and display the total amount from records
    const getTotalAmount = () => {
      return records.reduce((sum, record) => sum + Number(record.amount || 0), 0).toFixed(2);
    };

    useEffect(() => {
        if (!loading && !user) {
            // Redirect to the login page if the user is not logged in
            navigate({
                to: '/auth', // Redirect to login page
                replace: true, // Replace the current entry in the history stack
            });
        }
    }, [user, loading, navigate]);

    if (loading) {

        return (
            <p>Loading...</p>
        );
    }

    if (error) {
        return (
            <p>Error: {error.message}</p>
        );
    }
    
    
    return (
        <div className="dashboard-container p-6 text-base-content bg-transparent shadow-2xl">
            <div className="card bg-base-200 shadow-xl">
            <div className="card-body">
                <h1 className="card-title text-2xl font-bold flex justify-center my-4">
                Welcome {user?.displayName}! Here Are Your Finances:
                </h1>
                {/* <PieChart /> */}
                <PieChart />
                <div className="flex justify-center my-4">
                <button 
                    className="btn btn-primary" 
                    onClick={() => setShowForm((prev) => !prev)}
                >
                    {showForm ? "Hide Form" : "Show Form"}
                </button>
                </div>
                {showForm && (
                <div className="flex justify-center my-4">
                    <FinancialRecordForm />
                </div>
                )}
                <div className="stats flex justify-center my-4">
                    {loading ? (
                        <div className="stat flex flex-col items-center">
                            <div className="stat-title skeleton skeleton-text w-32 h-4 mb-2"></div>
                            <div className="stat-value skeleton skeleton-text w-24 h-6 mb-4"></div>
                            <progress className="progress w-56"></progress>
                        </div>
                    ) : (
                        <div className="stat flex flex-col items-center">
                            <div className="stat-title">Current Total Spent:</div>
                            <div className="stat-value">${getTotalAmount()} of ${monthlyBudget}</div>
                            <progress className="progress progress-info w-56" value={getTotalAmount()} max={monthlyBudget}></progress>
                        </div>
                    )}
                </div>
            </div>
                <div className="overflow-x-auto my-4">
                {/* <FinancialRecordList /> */}
                <ListComponent description={""} amount={0} category={""} paymentMethod={""} date={""} />
                </div>
            </div>
        </div>
    );
};
