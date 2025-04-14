import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebaseConfig"; // Firebase auth configuration file
import { useFinancialRecords } from "../../contexts/formContext/financial-record-context"; // Financial record context to manage state

// Similar to create post file

export const FinancialRecordForm = () => {
    const [description, setDescription] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    const [category, setCategory] = useState<string>("");
    const [paymentMethod, setPaymentMethod] = useState<string>("");
    const { addRecord } = useFinancialRecords();

    const [user, loading, error] = useAuthState(auth);

    // handleSubmit is the equivalent to schema
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const newRecord = {
        userId: user?.uid ?? "",
        date: new Date(),
        description: description,
        amount: Math.abs(parseFloat(amount)),
        category: category,
        paymentMethod: paymentMethod,
      };

      addRecord(newRecord);
      setDescription("");
      setAmount("");
      setCategory("");
      setPaymentMethod("");
    };

    return (
    <div className="form-container p-4 bg-base-100 shadow-md rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-field">
        <label className="label">
        <span className="label-text">Description:</span>
        </label>
        <input
        type="text"
        required
        className="input input-bordered w-full"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label className="label">
        <span className="label-text">Amount:</span>
        </label>
        <input
        type="number"
        required
        className="input input-bordered w-full"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <div className="form-field">
        <label className="label">
        <span className="label-text">Category:</span>
        </label>
        <select
        required
        className="select select-bordered w-full"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        >
        <option value="">Select a Category</option>
        <option value="Food">Food</option>
        <option value="Rent">Rent</option>
        <option value="Salary">Salary</option>
        <option value="Utilities">Utilities</option>
        <option value="Entertainment">Entertainment</option>
        <option value="Other">Other</option>
        </select>
      </div>
      <div className="form-field">
        <label className="label">
        <span className="label-text">Payment Method:</span>
        </label>
        <select
        required
        className="select select-bordered w-full"
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
        >
        <option value="">Select a Payment Method</option>
        <option value="Credit Card">Credit Card</option>
        <option value="Cash">Cash</option>
        <option value="Bank Transfer">Bank Transfer</option>
        </select>
      </div>
      <button type="submit" className="btn btn-primary w-full">
        Add Record
      </button>
      </form>
    </div>
    );
}