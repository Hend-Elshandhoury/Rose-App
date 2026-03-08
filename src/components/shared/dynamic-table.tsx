"use client";

import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

import Actions from "./actions";

interface DynamicTableProps {
  data: any[];
  title: string;
  btnTitle?: string;
  showActions?: boolean;
  headerMap?: Record<string, string>;
  suffixMap?: Record<string, string>;
  editPath: string;
}

export default function DynamicTable({ data, title, btnTitle, showActions = true, headerMap, suffixMap, editPath }: DynamicTableProps) {
  console.log("datadata", data)


  const columnNames = data?.length > 0
    ? Object.keys(data[0]).filter(key =>
      key === "name" || key === "productsCount"
    )
    : [];

  return (
    <div>
      {!data || data.length === 0 ? (
        <div className="flex justify-center p-10 text-gray-500">No data available</div>
      ) : (
        <Table>
          {/* Header */}
          <TableHeader>
            <TableRow className="w-full ">

              {columnNames.map((col) => (
                <TableHead key={col}>
                  {headerMap && headerMap[col] || col}
                </TableHead>
              ))}
              {showActions && <TableHead className="text-right px-6"></TableHead>}
            </TableRow>
          </TableHeader>

          {/* BODY */}
          <TableBody>
            {data.map((item, index) => (
              <TableRow key={item._id || index} className="hover:bg-maroon-50 transition-colors">


                {/* show data*/}
                {columnNames.map((col) => (
                  <TableCell key={col} className="font-medium text-gray-800 ">
                    {item[col]}
                    {suffixMap && suffixMap[col] && ` ${suffixMap[col]}`}
                  </TableCell>
                ))}

                {/* ACTIONS */}
                <Actions editPath={`${editPath}/${item._id}`} id={item._id} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}