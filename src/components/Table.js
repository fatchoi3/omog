import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';


function Table({ columns, data }) {

    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
        useTable({ columns, data });

    return (
        <TableSheet {...getTableProps()}>
            <TableThead>
                {headerGroups.map((headerGroup) => (
                    <HeadTr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <Th {...column.getHeaderProps()}>{column.render("Header")}</Th>
                        ))}
                    </HeadTr>
                ))}
            </TableThead>
            <TableTbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <BodyTr {...row.getRowProps()}>
                            {row.cells.map((cell) => (
                                <Td {...cell.getCellProps()}>{cell.render("Cell")}</Td>
                            ))}
                        </BodyTr>
                    );
                })}
            </TableTbody>
        </TableSheet>
    );
}

const TableSheet = styled.table`
    width: 40rem;
    margin: 50px auto;
    border-radius: 14px;
    border-collapse: collapse;
    overflow: hidden;
`

const TableThead = styled.thead`
    background: #94D7BB;
    height: 2rem;
    border-radius: 14px 14px 0 0;
`

const HeadTr = styled.tr`
    color: white;
`

const Th = styled.th`
    padding: 15px;
    font-size: 22px;
`

const TableTbody = styled.tbody`

`

const BodyTr = styled.tr`
    text-align: center;
    background: #E5E5E5;
`

const Td = styled.td`
    font-size: 18px;
    color: #979797;
    padding: 15px;
`

export default Table;