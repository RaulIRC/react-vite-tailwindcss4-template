import * as React from 'react'
import { useState, createContext, useContext } from 'react'

// Create a context for the monthly budget
export const MonthlyBudgetContext = createContext<{
  monthlyBudget: number
  setMonthlyBudget: React.Dispatch<React.SetStateAction<number>>
} | null>(null)

export const MonthlyBudgetProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(600) // Default budget is 600
  return (
    <MonthlyBudgetContext.Provider value={{ monthlyBudget, setMonthlyBudget }}>
      {children}
    </MonthlyBudgetContext.Provider>
  )
}


const Settings = () => {
  const budgetContext = useContext(MonthlyBudgetContext)

  if (!budgetContext) { 
    throw new Error('Settings must be used within a MonthlyBudgetProvider')
  }
  const { monthlyBudget, setMonthlyBudget } = budgetContext


  // Handler for updating monthly budget (could be used in a settings modal/page)
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setMonthlyBudget(value)

    }
  }

  return (
    <MonthlyBudgetContext.Provider value={{ monthlyBudget, setMonthlyBudget }}>
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
              value={monthlyBudget}
              onChange={handleBudgetChange}
              placeholder="Enter monthly budget"
              className="input input-bordered w-full mb-4"
            />
            <button
              className="btn btn-success w-full"
              onClick={() => alert(`Monthly budget set to $${monthlyBudget}`)}
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
    </MonthlyBudgetContext.Provider>
  )
}

export default Settings