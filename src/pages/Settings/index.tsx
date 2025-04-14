import * as React from 'react'
import { useState } from 'react'

const Settings = () => {
  const [monthlyBudget, setMonthlyBudget] = useState<number>(0)

  // Handler for updating monthly budget (could be used in a settings modal/page)
  const handleBudgetChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value)
    if (!isNaN(value) && value >= 0) {
      setMonthlyBudget(value)
      // Here you can also call a function to update the dashboard or persist the value
      // For example: updateDashboardBudget(value)
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
          <button className="btn btn-success w-full">Save Budget</button>
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