import * as React from 'react'
import { useSettingsConfig, SettingsConfig } from '../../contexts/formContext/financial-record-context';

export const Settings = () => {
  const [ monthlyBudget, setMonthlyBudget ] = React.useState<number>() // Default budget is 600
  const [ userName, setUserName ] = React.useState<string>("") // State for the username
  const [ currency, setCurrency ] = React.useState<string>("")
  const [ theme, setTheme ] = React.useState<string>("")

  const { settingsConfig, updateSettingsConfig } = useSettingsConfig();

  const id = settingsConfig?.[0]?._id ?? ''; // Ensure id is always a string

  const handleUpdate = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const updateConfig: Partial<SettingsConfig> = {};

    // update budget if it has changed
    if (monthlyBudget !== undefined && monthlyBudget !== settingsConfig?.[0].monthlyBudget) {
      updateConfig.monthlyBudget = monthlyBudget;
    }
    // Update username if it has changed
    if (userName !== settingsConfig?.[0]?.userName && userName !== "") {
      updateConfig.userName = userName;
    }

    // Update currency if it has been set
    if (currency !== settingsConfig?.[0]?.currency) {
      updateConfig.currency = currency;
    }

    // Update theme if it has been set
    if (theme !== settingsConfig?.[0]?.theme) {
      updateConfig.theme = theme;
    }

    if (Object.keys(updateConfig).length > 0 && id) {
      updateSettingsConfig(id, updateConfig as SettingsConfig);
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
        <div className="card bg-base-100 shadow-md p-4">
          <h2 className="text-lg font-semibold mb-2">Change Username</h2>
          <input
            type="text"
            placeholder={settingsConfig?.[0]?.userName || 'Enter username here.'}
            value={userName}
            onChange={(event) => setUserName(String(event.target.value))}
            className="input input-bordered w-full mb-4"
          />
          <button className="btn btn-primary w-full"
          onClick={handleUpdate}>Save Username</button>
        </div>
        <div className="card bg-base-100 shadow-md p-4">
            <h2 className="text-lg font-semibold mb-2">Monthly Budget</h2>
            <input
            type="number"
            min={0}
            value={monthlyBudget}
            onChange={(event) => setMonthlyBudget(Number(event.target.value))}
            placeholder={settingsConfig?.[0]?.monthlyBudget.toString()}
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
