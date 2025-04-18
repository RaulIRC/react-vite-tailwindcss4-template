import * as React from 'react'
import { auth } from '../../firebase/firebaseConfig'
import { collection } from 'firebase/firestore'

export const Settings = () => {
  const [user] = auth.currentUser // Get the current user from Firebase authentication
  const settingsCollectionRef = collection(user, 'settings') // Reference to the settings collection in Firestore
  const [ originalBudget, setOriginalBudget ] = React.useState<number>(600) // Default budget is 600
  
  const [nickname, setNickname] = React.useState<string>('') // State for nickname
  const [monthlyBudget, setMonthlyBudget] = React.useState<number>(0) // State for monthly budget
  const [currency, setCurrency] = React.useState<string>('') // State for currency
  const [theme, setTheme] = React.useState<string>('') // State for theme

  const createSettingsCollection = async () => {
    
  }
  // Handler for updating monthly budget
  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()

    
  }

  React.useEffect(() => {
    const savedBudget = localStorage.getItem('monthlyBudget') // Retrieve the budget from local storage
    if (savedBudget) {
      setOriginalBudget(parseInt(savedBudget)) // Set the original budget state from local storage
    }
  }, [])  // Set the original budget state from local storage on component mount

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
            value={originalBudget}
            onChange={(e) => setOriginalBudget(Number(e.target.value))}
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
