import React, { useState } from "react";
import { FinancialRecord, useFinancialRecords } from "../../contexts/formContext/financial-record-context";
import { useReactTable, getCoreRowModel, CellContext, flexRender, createColumnHelper } from "@tanstack/react-table";

interface EditableCellProps extends CellContext<FinancialRecord, any> {
  updateRecord: (rowIndex: number, columnId: string, value: any) => void;
  editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({
  getValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(getValue());

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      style={{ cursor: editable ? "pointer" : "default" }}
      className="financial-records-editable-cell"
    >
      {isEditing ? (
        <input
          value={value as string}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          style={{ width: "100%" }}
          className="input input-bordered input-sm"
        />
      ) : typeof value === "string" ? (
        value
      ) : value !== undefined ? (
        value.toString()
      ) : (
        <span className="text-gray-400">N/A</span> // Placeholder text
      )}
    </div>
  );
};

export const ListComponent: React.FC = () => {
    const { records, updateRecord, deleteRecord } = useFinancialRecords();
    const [isEditMode, setIsEditMode] = useState(false);

    const sortedRecords = [...records].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const updateCellRecord = (rowIndex: number, columnId: string, value: any) => {
      const id = records[rowIndex]?._id;
      updateRecord(id ?? "", { ...records[rowIndex], [columnId]: value });
    };

    const columnHelper = createColumnHelper<FinancialRecord>();

    const columns = [
        columnHelper.accessor("description", {
          header: "Description",
          cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("amount", {
          header: "Amount",
          cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("category", {
          header: "Category",
          cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("paymentMethod", {
          header: "Payment Method",
          cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
          footer: (info) => info.column.id,
        }),
        columnHelper.accessor("date", {
          header: "Date",
          cell: (props) => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
          footer: (info) => info.column.id,
        }),
        columnHelper.display({
          id: "delete",
          header: "Delete",
          cell: ({ row }) => (
            <button
              onClick={() => deleteRecord(row.original._id ?? "")}
              className="btn btn-error btn-sm"
            >
              <span role="img" aria-label="trash">🗑️</span>
            </button>
          ),
          footer: (info) => info.column.id,
        }),
      ];

    const paymentMethodIcons: Record<string, string> = {
        Cash: "💵",
        CreditCard: "💳",
        BankTransfer: "🏦",
        PayPal: "🅿️",
        Other: "❓",
    };

    const normalizeKey = (key: string) => key.replace(/\s+/g, "");

    const table = useReactTable({
      columns,
      data: records,
      getCoreRowModel: getCoreRowModel(),
    });

    return (
        <>
        {/* <ul className="menu bg-base-100 rounded-box shadow-md">
            <li className="menu-title p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
            <span>Financial Records</span>
            <button
                className="btn btn-sm btn-primary"
                onClick={() => setIsEditMode(!isEditMode)}
            >
                {isEditMode ? "Done" : "Edit"}
            </button>
            </li>
            <li>
            <div className="overflow-x-auto bg-base-100 rounded-box shadow-md">
                <table className="table w-full">
                <thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                        {headerGroup.headers.map((header) => (
                        <th key={header.id} className="text-xs sm:text-sm">
                            {flexRender(header.column.columnDef.header, header.getContext())}
                        </th>
                        ))}
                    </tr>
                    ))}
                </thead>
                <tbody>
                    {records.length > 0 ? (
                    table.getRowModel().rows.map((row) => (
                        <tr key={row.id}>
                        {row.getVisibleCells().map((cell) => (
                            <td key={cell.id} className="text-xs sm:text-sm">
                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </td>
                        ))}
                        </tr>
                    ))
                    ) : (
                    // Placeholder skeleton rows
                    Array.from({ length: 5 }).map((_, index) => (
                        <tr key={index}>
                        {Array.from({ length: columns.length }).map((_, cellIndex) => (
                            <td key={cellIndex}>
                            <div className="skeleton h-4 w-full"></div>
                            </td>
                        ))}
                        </tr>
                    ))
                    )}
                </tbody>
                </table>
            </div>
            </li>
        </ul> */}
        <ul className="list bg-base-100 rounded-box shadow-primary-content">
            <li className="p-4 pb-2 text-xs opacity-60 tracking-wide flex justify-between items-center">
          <span>Recent Activity</span>
          <button
              className="btn btn-sm btn-primary"
              onClick={() => setIsEditMode(!isEditMode)}
          >
              {isEditMode ? "Done" : "Edit"}
          </button>
            </li>
            {sortedRecords.length > 0 ? (
          sortedRecords.map((record, index) => (
              <li key={index} className="list-row">
            <div>
                <div
                  className={`text-4xl font-thin tabular-nums fixed-width-amount list-decimal text-red-500`}
                >
                  -{Math.abs(record.amount)}
                </div>
            </div>
            <div>
              <div className="text-xs uppercase font-semibold opacity-60">
                {record.category} - {record.date.toLocaleDateString()} - {paymentMethodIcons[normalizeKey(record.paymentMethod)] || "❓"} {record.paymentMethod}
              </div>
              {!isEditMode && (
                <div className="list-col-wrap flex flex-col gap-1 shadow-sm p-2">
                  <span className="text-base font-medium opacity-90">{record.description}</span>
                </div>
              )}
            </div>
            {isEditMode && (
                <>
              <button className="btn btn-square btn-ghost">
                  <span role="img" aria-label="play">▶️</span>
              </button>
              <button
                  className="btn btn-square btn-ghost"
                  onClick={() => {
                deleteRecord(record._id ?? "");
                  }}
              >
                  <span role="img" aria-label="trash">🗑️</span>
              </button>
                </>
            )}
              </li>
          ))
            ) : (
            <li className="text-center text-gray-400 flex justify-center pb-8">No records available.</li>
            )}
        </ul>
        </>
    );
};
