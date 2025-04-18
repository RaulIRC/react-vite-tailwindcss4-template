import * as React from 'react'
import { useSettingsConfig } from '../../contexts/formContext/financial-record-context';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase/firebaseConfig';

export const Settings = () => {
  const [ newBudget, setNewBudget ] = React.useState<number>() // Default budget is 600
  const [ userName, setUserName ] = React.useState<string>("") // State for the username
  const { settingsConfig, updateSettingsConfig } = useSettingsConfig();
  const [ user ] = useAuthState(auth);

  // Handler for updating the settings configuration.
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    handleUpdateSettingsConfig();
  };

  const handleUpdateSettingsConfig = () => {
    const updateConfig = {
      userId: user?.uid ?? '',
      monthlyBudget: newBudget ?? 600, // Ensure monthlyBudget is always a number
      userName: userName || user?.displayName || '', // Ensure userName is always a string
    };

    const id = settingsConfig?.[0]?._id ?? ''; // Ensure id is always a string
    if (id) {
      updateSettingsConfig(id, updateConfig); // Update settings configuration with the correct arguments
      setNewBudget(0); // Reset the budget input field after submission
      setUserName(''); // Reset the username input field after submission
    } else {
      console.error('No valid settingsConfig ID found.');
    }
  };

  return (
    <div className="p-4 mt-16">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>
      <div className="flex flex-col gap-4">
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Change Username</h2>
          <input
            type="text"
            placeholder="Enter new username"
            className="input input-bordered w-full mb-4"
          />
          <button className="btn btn-primary w-full">Save Username</button>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Monthly Budget</h2>
            <input
            type="number"
            min={0}
            value={newBudget}
            onChange={(event) => setNewBudget(Number(event.target.value))}
            placeholder="Enter monthly budget"
            className="input input-bordered w-full mb-4"
            />
            <button type="submit"
            className="btn btn-success w-full"
            onClick={handleSubmit}
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
