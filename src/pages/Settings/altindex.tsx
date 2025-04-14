import React from 'react';

const AltSettings = () => {
    return (
        <>
        <div className="p-6 mt-25 font-sans bg-gray-100 text-gray-800">
            <h1 className="text-center text-3xl font-bold text-teal-600 mb-6">Settings</h1>

            {/* Account Management */}
            <div className="mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Account Management</h2>
                <button className="btn btn-primary w-full mb-2">Change Password</button>
                <button className="btn btn-primary w-full mb-2">Update Username</button>
                <button className="btn btn-primary w-full mb-2">Change Email</button>
                <button className="btn btn-error w-full">Logout</button>
            </div>

            {/* Currency Preferences */}
            <div className="mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Currency Preferences</h2>
                <label className="block mb-4">
                    <span className="label-text">Preferred Currency:</span>
                    <select className="select select-bordered w-full mt-1">
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                    </select>
                </label>
                <label className="block">
                    <span className="label-text">Default Exchange Rate:</span>
                    <input type="number" className="input input-bordered w-full mt-1" />
                </label>
            </div>

            {/* Expense Categories Customization */}
            <div className="mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Expense Categories Customization</h2>
                <button className="btn btn-success w-full mb-2">Add Category</button>
                <button className="btn btn-primary w-full mb-2">Edit Category</button>
                <button className="btn btn-error w-full">Delete Category</button>
            </div>

            {/* Notification Settings */}
            <div className="mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Notification Settings</h2>
                <label className="flex items-center mb-2">
                    <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                    <span className="label-text">Enable Weekly Summaries</span>
                </label>
                <label className="flex items-center">
                    <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                    <span className="label-text">Enable Spending Alerts</span>
                </label>
            </div>

            {/* Theme & Appearance */}
            <div className="mb-6 border-b border-gray-300 pb-4">
                <h2 className="text-xl font-semibold text-teal-600 mb-4">Theme & Appearance</h2>
                <label className="flex items-center mb-2">
                    <input type="checkbox" className="checkbox checkbox-primary mr-2" />
                    <span className="label-text">Dark Mode</span>
                </label>
                <label className="block">
                    <span className="label-text">Font Size:</span>
                    <select className="select select-bordered w-full mt-1">
                        <option>Small</option>
                        <option>Medium</option>
                        <option>Large</option>
                    </select>
                </label>
            </div>
        </div>
        </>
    );
};

export default AltSettings;