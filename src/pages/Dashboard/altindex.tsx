import React from 'react'

const altDashboard = () => {
  return (
    <>
        <div className="mt-25 flex flex-col min-h-screen">
                    {/* Navbar */}
                    <nav className="navbar bg-base-100 shadow-md">
                        <div className="flex-1">
                            <a className="text-xl font-bold">Expense Tracker</a>
                        </div>
                        <div className="flex-none">
                            <ul className="menu menu-horizontal px-1">
                                <li><a>Dashboard</a></li>
                                <li><a>Add Expense</a></li>
                                <li><a>Reports</a></li>
                            </ul>
                        </div>
                    </nav>

                    {/* Main Content */}
                    <main className="flex-grow container mx-auto p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Expenses List */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">Expenses</h2>
                                <div className="overflow-x-auto">
                                    <table className="table w-full">
                                        <thead>
                                            <tr>
                                                <th>Date</th>
                                                <th>Description</th>
                                                <th>Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>2023-10-01</td>
                                                <td>Coffee</td>
                                                <td>$3.50</td>
                                            </tr>
                                            <tr>
                                                <td>2023-10-02</td>
                                                <td>Groceries</td>
                                                <td>$45.00</td>
                                            </tr>
                                            <tr>
                                                <td>2023-10-03</td>
                                                <td>Transport</td>
                                                <td>$15.00</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Expense Input Form */}
                        <div className="card bg-base-100 shadow-md">
                            <div className="card-body">
                                <h2 className="card-title">Add Expense</h2>
                                <form>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Date</span>
                                        </label>
                                        <input type="date" className="input input-bordered" />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Description</span>
                                        </label>
                                        <input type="text" placeholder="Enter description" className="input input-bordered" />
                                    </div>
                                    <div className="form-control mb-4">
                                        <label className="label">
                                            <span className="label-text">Amount</span>
                                        </label>
                                        <input type="number" step="0.01" placeholder="Enter amount" className="input input-bordered" />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-full">Add Expense</button>
                                </form>
                            </div>
                        </div>
                    </main>

                    {/* Footer */}
                    <footer className="footer footer-center p-4 bg-base-200 text-base-content">
                        <div>
                            <p>© 2023 Expense Tracker. All rights reserved.</p>
                        </div>
                    </footer>
                </div>        
    </>
  )
}

export default altDashboard