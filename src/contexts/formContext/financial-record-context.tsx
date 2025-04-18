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
import { createContext, useState, useEffect, useContext, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

// We are getting the db information from this tsx class.


// SettingsRecord interface to define the structure of settings data

export interface SettingsConfig {
    _id?: string;
    userId: string;
    monthlyBudget: number; // Monthly budget amount
    userName: string; // User's name or nickname
  }

export  const defaultSettingsConfig: SettingsConfig = {
    _id: "",
    userId: "",
    monthlyBudget: 600, // Default budget is 600
    userName: "", // Default username is empty
  };

interface SettingsContextType {
    settingsConfig: SettingsConfig[]; // Settings record for the user
    createSettingsConfig: (settings: SettingsConfig) => void; // Function to update the settings record
    updateSettingsConfig: (id: string, newSettings: SettingsConfig) => void; // Function to update the settings record
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);


export const SettingsProvider = ({children, }: {children: React.ReactNode;}) => {
    const [settings, setSettings] = useState<SettingsConfig[]>([]);
    const [user] = useAuthState(auth);
    //const { userID } = useGetUserInfo();
    const userID = user?.uid || ""; // Get user ID from auth state, or set to empty string if not authenticated
    const settingsConfigRef = collection(db, "Settings");

    const fetchSettingsConfig =  useCallback(async () => {
        if (!user?.uid) return;
        try {
            const reConfig = query(settingsConfigRef);
            const querySnapshot = await getDocs(reConfig);
            const fetchedSettings: SettingsConfig[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    _id: doc.id,
                    userId: data.userID,
                    monthlyBudget: data.monthlyBudget,
                    userName: data.userName,
                };
            });
            setSettings(fetchedSettings);
        } catch (error) {
            console.error("Error fetching settings: ", error);
            alert("Error fetching settings. Please try again later.");
        }
    }, [settingsConfigRef, user?.uid]);

    const createSettingsConfig = async (settingsConfig: SettingsConfig) => {
        if (!userID) {
            console.error("User ID is not available, cannot apply settings.");
            alert("User not authenticated. Please log in.");
            return;
        }
        try {
            await addDoc(settingsConfigRef, {
                userID,
                monthlyBudget: settingsConfig.monthlyBudget,
                userName: settingsConfig.userName,
            });
            fetchSettingsConfig(); // Refresh records after adding
            alert("Data Successfully Submitted");
        } catch (error) {
            console.error("Error adding document: ", error);
            alert("Error adding financial record");
        }
    };

    const updateSettingsConfig = async (id: string, newSettings: SettingsConfig) => {
        if (!userID) return;
        try {
            // Reference to the document to be updated
            const settingsRef = doc(settingsConfigRef, id);
            // Update the document with new data
            await updateDoc(settingsRef, {
                userName: newSettings.userName,
                monthlyBudget: newSettings.monthlyBudget,
            });
            fetchSettingsConfig(); // Refresh records after updating
            alert("Settings updated successfully");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error updating settings config");
        }
    }
    
    useEffect(() => {
        fetchSettingsConfig();
    }, [fetchSettingsConfig, userID]); // Refetch when userID changes

    return (
        <SettingsContext.Provider 
          value={{ 
            settingsConfig: settings, // Settings record for the user
            createSettingsConfig: createSettingsConfig, // Function to create the settings record
            updateSettingsConfig: updateSettingsConfig, // Function to update the settings record
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
}

export const useSettingsConfig = () => {
    const context = useContext<SettingsContextType | undefined>(SettingsContext);

    if (!context) {
        throw new Error(
            "useSettingsConfig must be used within a SettingsProvider"
        );
    }
    return context;
}

// This is the start of the Financial Records Context
// Todo: Simplify the overly complicated mess I made. - @RaulIRC

export interface FinancialRecord {
    _id?: string;
    userId: string;
    date: Date;
    description: string;
    amount: number;
    category: string;
    paymentMethod: string;
  }

interface FinancialRecordsContextType {
    records: FinancialRecord[];
    addRecord: (record: FinancialRecord) => void;
    updateRecord: (id: string, newRecord: FinancialRecord) => void;
    deleteRecord: (id: string) => void;
}

export const FinancialRecordsContext = createContext<
  FinancialRecordsContextType | undefined
  >(undefined);

export const FinancialRecordsProvider = ({children, }: {children: React.ReactNode;}) => {

    const [records, setRecords] = useState<FinancialRecord[]>([]);
    const [user] = useAuthState(auth);
    //const { userID } = useGetUserInfo();
    const userID = user?.uid || ""; // Get user ID from auth state, or set to empty string if not authenticated
    const financialRecordCollectionRef = collection(db, "FinancialRecord");
    
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