import React from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';


function ResultPointTable({ columns, data }) {

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
    width: 30%;
    margin: 50px auto;
    border-radius: 14px;
    // border-collapse: collapse;
    overflow: hidden;
`

const TableThead = styled.thead`
    background: #E5E5E5;
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

export default ResultPointTable;