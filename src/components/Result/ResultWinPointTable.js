import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';


function ResultWinPointTable({ columns, data }) {

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
            <tbody {...getTableBodyProps()}>
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
            </tbody>
        </TableSheet>
    );
}

const TableSheet = styled.table`
    width: 30%;
    margin: 50px auto;
    border-radius: 14px;
    overflow: hidden;
`

const TableThead = styled.thead`
    background: white;
    height: 2rem;
    border-radius: 14px 14px 0 0;
`

const HeadTr = styled.tr`
    color: #94D7BB;
`

const Th = styled.th`
    padding: 15px;
    font-size: 22px;
`

const BodyTr = styled.tr`
    text-align: center;
    background: white;
`

const Td = styled.td`
    font-size: 18px;
    height: 2rem;
    color: #979797;
    padding: 15px;
`

export default ResultWinPointTable;