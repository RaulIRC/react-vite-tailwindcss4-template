import { collection, query, where, getDocs, addDoc, doc, updateDoc } from "firebase/firestore";
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../../firebase/firebaseConfig";
// import { settings } from "firebase/analytics";

export interface SettingsConfig {
    _id?: string;
    userID?: string;
    monthlyBudget: number; // Monthly budget amount
    userName: string; // User's name or nickname
    currency: string; // Currency type, e.g., USD, EUR
    theme: string; // Theme preference, e.g., light, dark
  }

// export const defaultSettingsConfig: SettingsConfig = {
//     userId: auth.currentUser?.uid || "", // Default user ID is the current user's ID
//     monthlyBudget: 600, // Default budget is 600
//     userName: "", // Default username is empty
//     currency: "USD", // Default currency is USD
//     theme: "synthwave", // Default theme is synthwave
//   };

interface SettingsContextType {
    settingsConfig: SettingsConfig[]; // Settings record for the user
    createConfig: (settings: SettingsConfig) => void; // Function to update the settings record
    updateConfig: (id: string, newSettings: SettingsConfig) => void; // Function to update the settings record
}

export const SettingsContext = createContext<
    SettingsContextType | undefined
>(undefined);


export const SettingsProvider = ({children, }: {children: React.ReactNode;}) => {

    const [settingsConfig, setSettingsConfig] = useState<SettingsConfig[]>([]);
    const [user] = useAuthState(auth);
    const userID = user?.uid || ""; // Get user ID from auth state, or set to empty string if not authenticated
    const settingsConfigRef = collection(db, "Settings");

    const newConfig: SettingsConfig = {
        userID: userID || "", // Default user ID is the current user's ID
        monthlyBudget: 600, // Default budget is 600
        userName: '', // Default username is empty
        currency: 'USD', // Default currency is USD
        theme: 'synthwave', // Default theme is synthwave
      };

    const fetchSettingsConfig = async () => {
        if (!userID) return;
        // Check if there is already a settings config for the current user
        // console.log("Fetching settings config for user: ", userID);
        try {
            // Bug Fixed: The query was not fetching the settings config correctly.
            // It seems like the query fetch was coming back empty so I changed the where from userId to userID
            // Create a query to fetch the settings config by userId.
            const response = query(settingsConfigRef, where("userID", "==", userID));
            
            const querySnapshot = await getDocs(response);

            const fetchedSettings: SettingsConfig[] = querySnapshot.docs.map((doc) => {
                const data = doc.data();
                return {
                    _id: doc.id,
                    userID: data.userID,
                    monthlyBudget: data.monthlyBudget,
                    userName: data.userName,
                    currency: data.currency,
                    theme: data.theme,
                };
            });

            if (fetchedSettings[0]?.userID !== userID) {
                console.log("No settings config found for user:", userID);
                // Create a new settings config if it doesn't exist
                await addDoc(settingsConfigRef, newConfig);
                console.log("New settings config created for user:", userID);
            }
            setSettingsConfig(fetchedSettings);
            // console.log("Config has been Fetched!", fetchedSettings)
        } catch (error) {
            console.error("Error fetching settings: ", error);
            alert("Error fetching settings. Please try again later.");
        }
    };

    useEffect(() => {
        fetchSettingsConfig();
    }, [userID]); // Refetch when userID changes

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
                currency: settingsConfig.currency,
                theme: settingsConfig.theme,
            });
            fetchSettingsConfig(); // Refresh records after adding
            alert("Settings Config Successfully Created");
        } catch (error) {
            console.error("Error creating settings config: ", error);
            alert("Error creating config");
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
                currency: newSettings.currency, // If you have a currency field
                theme: newSettings.theme, // If you have a theme field
            });
            fetchSettingsConfig(); // Refresh records after updating
            alert("Settings updated successfully");
        } catch (error) {
            console.error("Error updating document: ", error);
            alert("Error updating settings config");
        }
    };

    return (
        <SettingsContext.Provider 
          value={{
            settingsConfig,
            createConfig: createSettingsConfig,
            updateConfig: updateSettingsConfig,
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
