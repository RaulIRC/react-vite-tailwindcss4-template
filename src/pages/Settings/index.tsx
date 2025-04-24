import * as React from 'react'
import { useSettingsConfig, SettingsConfig } from '../../contexts/settingsContext/settingsContext';
// import { useAuthLogic } from '../../contexts/authContext';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';

export const Settings = () => {
  const [ monthlyBudget, setMonthlyBudget ] = React.useState<number>() // Default budget is 600
  const [ userName, setUserName ] = React.useState<string>("") // State for the username
  const [ currency, setCurrency ] = React.useState<string>("")
  const [ theme, setTheme ] = React.useState<string>("")

  // const { handleSettingsConfig } = useAuthLogic(); // Importing the settings context

  const [user] = useAuthState(auth);
  const userID = user?.uid || ""; // Get user ID from auth state, or set to empty string if not authenticated


  const adminMode: boolean = false;
  const { settingsConfig, updateConfig, createConfig } = useSettingsConfig();

  const newConfig: SettingsConfig = {
    userID: userID || "", // Default user ID is the current user's ID
    monthlyBudget: 600, // Default budget is 600
    userName: '', // Default username is empty
    currency: 'USD', // Default currency is USD
    theme: 'synthwave', // Default theme is synthwave
  };

  // Latest bug, username wasn't properly updating because when pressing the button i forgot the type="submit" and it was causing the form to refresh the page.
  // I also added a check to ensure that the username is not empty before updating it.



  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const id = settingsConfig?.[0]?._id ?? ''; // Ensure id is always a string
    const givenConfig = settingsConfig?.[0]; // Fallback to newConfig if settingsConfig is empty

    // update budget if it has changed
    if (monthlyBudget !== undefined && monthlyBudget !== givenConfig.monthlyBudget) {
      givenConfig.monthlyBudget = monthlyBudget;
    }
    // Update username if it has changed
    if (userName !== undefined && userName !== givenConfig.userName) {
      givenConfig.userName = userName;
    }

    // Update currency if it has been set
    if (currency !== settingsConfig?.[0]?.currency) {
      givenConfig.currency = currency;
    }

    // Update theme if it has been set
    if (theme !== settingsConfig?.[0]?.theme) {
      givenConfig.theme = theme;
    }

    if (Object.keys(givenConfig).length > 0 && id) {
      updateConfig(id, givenConfig); // Update the settings record
      setMonthlyBudget(0); // Reset the budget input field after submission (or maybe keep the value?)
      setUserName(''); // Reset the username input field after submission
      setCurrency('');
      setTheme('');
    } else if (!id) {
      console.error('No valid settingsConfig ID found.');
      console.log(settingsConfig);
    } else {
      console.log('No settings changes detected.');
    }
  }
  return (
    <div className="p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col gap-4">
        {adminMode && (
          <>
            {/* <button className="btn btn-primary" onClick={handleSettingsConfig}>
          Press here to run handle config.
            </button> */}
            <button className="btn btn-secondary" onClick={() => createConfig(newConfig)}>
          press here to create config.
            </button>
            <button className="btn btn-secondary" onClick={() => console.log(settingsConfig)}>
          Press here to log settings config.
            </button>
          </>
        )}
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Change Username</h2>
          <input
            type="text"
            placeholder={settingsConfig?.[0]?.userName.toString() || 'Enter username here.'}
            value={userName}
            onChange={(event) => setUserName(String(event.target.value))}
            className="input input-bordered w-full mb-4"
          />
          <button type="submit"
          className="btn btn-primary w-full"
          onClick={handleUpdate}>Save Username</button>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Monthly Budget</h2>
            <input
            type="number"
            min={0}
            value={monthlyBudget}
            onChange={(event) => setMonthlyBudget(Number(event.target.value))}
            placeholder={settingsConfig?.[0]?.monthlyBudget.toString() || 'Enter monthly budget here.'}
            className="input input-bordered w-full mb-4"
            />
            <button type="submit"
            className="btn btn-success w-full"
            onClick={handleUpdate}
            >
            Save Budget
            </button>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Reset Password</h2>
          <button className="btn btn-warning w-full">Reset Password</button>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Delete Account</h2>
          <p className="text-sm text-gray-600 mb-4">
            Request account deletion. This action is irreversible.
          </p>
          <button className="btn btn-error w-full">Request Deletion</button>
        </div>
      </div>
    </div>
  )
}

export default Settings
