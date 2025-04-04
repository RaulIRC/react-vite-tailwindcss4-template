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
          className="financial-records-editable-cell-input"
        />
      ) : typeof value === "string" ? (
        value
      ) : value !== undefined ? (
        value.toString()
      ): (
        "N/A" // Placeholder text
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

  const columnHelper = createColumnHelper<FinancialRecord>()

  const columns = [
    columnHelper.accessor('description', {
      header: 'Description',
      cell: props => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('amount', {
      header: 'Amount',
      cell: props => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('category', {
      header: 'Category',
      cell: props => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('paymentMethod', {
      header: 'Payment Method',
      cell: props => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
      footer: info => info.column.id,
    }),
    columnHelper.accessor('date', {
      header: 'Date',
      cell: props => <EditableCell {...props} updateRecord={updateCellRecord} editable />,
      footer: info => info.column.id,
    }),
    columnHelper.display({
      id: 'delete',
      header: 'Delete',
      cell: ({ row }) => (
        <button
            onClick={() => deleteRecord(row.original._id ?? "")}
            className="financial-records-delete-button"
          >
            Delete
          </button>
      ),
      footer: info => info.column.id
    })

  ]

  const table = useReactTable({
      columns,
      data: records,
      getCoreRowModel: getCoreRowModel(),
    });

  console.log("From record list: ", table.getHeaderGroups());

  return (
    <>
      <div className="financial-records-table-container">
        <table className="financial-records-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th colSpan={header.colSpan} key={header.id}>
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
              );
            })}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};