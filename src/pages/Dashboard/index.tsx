import { auth } from "../../firebase/firebaseConfig";
import { useAuthState } from 'react-firebase-hooks/auth';
import { useEffect } from 'react';
import { useNavigate } from "@tanstack/react-router";
import { FinancialRecordForm } from "../../components/financialrecord/financial-record-form"; // Financial Record Form Component
import { FinancialRecordList } from "../../components/financialrecord/financial-record-list";

// Expense Tracker

export const Dashboard = () => {

    const [user, loading, error] = useAuthState(auth);
    //const { records } = useFinancialRecords();
    const totalMonthly = 100;
    const navigate = useNavigate();

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
        <div className="dashboard-container">
            <h1> Welcome {user?.displayName}! Here Are Your Finances:</h1>
            {/* <PieChart /> */}
            <div className="self-center flex justify-center my-4">
                <FinancialRecordForm />
            </div>
                <div>Total Monthly: ${totalMonthly}</div>
            <div className="overflow-x-auto my-4">
                <FinancialRecordList />
            </div>
        </div>
    );
};