import { useState } from "react";
import {
  FinancialRecord,
  useFinancialRecords,
} from "../../contexts/formContext/financial-record-context";
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

export const FinancialRecordList = () => {
  const { records, updateRecord, deleteRecord } = useFinancialRecords();

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
          Delete
        </button>
      ),
      footer: (info) => info.column.id,
    }),
  ];

  const table = useReactTable({
    columns,
    data: records,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-base-100 text-base-content">
      <table className="table table-zebra w-full">
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
  );
};