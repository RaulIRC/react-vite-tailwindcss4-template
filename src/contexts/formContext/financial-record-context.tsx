import { addDoc, 
    collection, 
    serverTimestamp, 
    query, 
    where, 
    getDocs, 
    updateDoc, 
    doc, 
    deleteDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebaseConfig"; // Firebase auth and db configuration file
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useGetUserInfo } from "../../hooks/useGetUserInfo";// Custom hook to get user info, this should return the userID based on the auth state.

// We are getting the db information from this tsx class.

// Todo: Simplify the overly complicated mess I made. - @RaulIRC

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
    monthlyBudget?: number; // Monthly budget amount
  }

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
    monthlyBudget: number; // Monthly budget amount
    setMonthlyBudget: (value: number) => void; // Function to set the monthly budget
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
  >(undefined);


export const FinancialRecordsProvider = ({children, }: {children: React.ReactNode;}) => {

    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const [user] = useAuthState(auth);
    const { userID } = useGetUserInfo();
    const financialRecordCollectionRef = collection(db, "FinancialRecord");
    
    const [monthlyBudget, setMonthlyBudget] = useState<number>(() => {
        const savedBudget = userID ? localStorage.getItem(`monthlyBudget_${userID}`) : null;
        return savedBudget ? parseInt(savedBudget) : 600;
    }); // Default budget is 600

    // Set the monthly budget in local storage
    const setMonthlyBudgetHandler = async (value: number) => {
        if (!userID) return;
        try {
            await addDoc(financialRecordCollectionRef, {
                userID,
                monthlyBudget: record.monthlyBudget,
    
            });
            fetchRecords(); // Refresh records after adding
            alert("Data Successfully Submitted");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error adding financial record");
        }
    };


    const fetchRecords = async () => {
        if (!userID) return;
        try {
            // Create a query to fetch the records by userId.
            const response = query(financialRecordCollectionRef, where("userID", "==", userID));

            // Get documents from Firestore
            const querySnapshot = await getDocs(response);

            const fetchedRecords: FinancialRecord[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    _id: doc.id,
                    userId: data.userID,
                    date: (data.date?.toDate() || new Date()), // Convert Firestore timestamp to date
                    description: data.description,
                    amount: data.amount,
                    category: data.category,
                    paymentMethod: data.paymentMethod,
                    monthlyBudget: data.monthlyBudget, // Monthly budget amount
                }
            });

            // Set the records in state
            setRecords(fetchedRecords);
        } catch (error) {
            console.error("Error fetching records: ", error);
        }
    };

    useEffect(() => {
        fetchRecords();
    }, [userID]); // Refetch when userID changes

    const addFinancialRecord = async (record: FinancialRecord) => {
        if (!userID) {
            console.error("User ID is not available, cannot add financial record.");
            alert("User not authenticated. Please log in.");
            return;
        }

        try {
            await addDoc(financialRecordCollectionRef, {
                userID,
                date: serverTimestamp(),
                description: record.description,
                amount: record.amount,
                category: record.category,
                paymentMethod: record.paymentMethod,
                monthlyBudget: record.monthlyBudget,
    
            });
            fetchRecords(); // Refresh records after adding
            alert("Data Successfully Submitted");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error adding financial record");
        }
    };

    const updateFinancialRecord = async (id: string, newRecord: FinancialRecord) => {
        if (!user) return;

        try {
            // Reference to the document to be updated
            const recordRef = doc(financialRecordCollectionRef, id);

            // Update the document with new data
            await updateDoc(recordRef, {
                description: newRecord.description,
                amount: newRecord.amount,
                category: newRecord.category,
                paymentMethod: newRecord.paymentMethod,
                monthlyBudget: newRecord.monthlyBudget,
                // If needed, update other fields, like date, based on your requirements
            });
            fetchRecords(); // Refresh records after updating
            alert("Financial record updated successfully");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error updating financial record");
        }
    }

    const deleteFinancialRecord = async(id: string) => {
        if (!user) return;

        try {
            // Reference to the document to be deleted
            const recordRef = doc(financialRecordCollectionRef, id);

            // Delete the document
            await deleteDoc(recordRef);
            
            // Update the state to remove the deleted record from the list
            fetchRecords();
            alert("Financial record deleted successfully");
        } catch (error) {
            console.error("Error deleting document: ", error);
            alert("Error deleting financial record");
        }
    };

    return (
        <FinancialRecordsContext.Provider 
          value={{ 
            records, 
            addRecord: addFinancialRecord, 
            updateRecord: updateFinancialRecord, 
            deleteRecord: deleteFinancialRecord,
            monthlyBudget,
            setMonthlyBudget: setMonthlyBudgetHandler, // Pass the handler to the context
            }}
        >
            {children}
        </FinancialRecordsContext.Provider>
    );
};


export const useFinancialRecords = () => {
    const context = useContext<FinancialRecordsContextType | undefined>(FinancialRecordsContext);

    if (!context) {
        throw new Error(
            "useFinancialRecords must be used within a FinancialRecordsProvider"
        );
    }
    return context;
}