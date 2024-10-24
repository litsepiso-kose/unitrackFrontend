import { useState } from 'react';
import Table from '@mui/joy/Table';
import { Input } from '@mui/joy';
import { SearchOutlined } from '@mui/icons-material';

export type BasicTableProps = {
    data: { [key: string]: any }[],
    onRowClick?: (id: any) => void
};

export default function BasicTable({ data, onRowClick }: BasicTableProps) {
    const [searchQuery, setSearchQuery] = useState('');

    if (data.length === 0) {
        return <div>No data available</div>;
    }

    const columns = Object.keys(data[0]).filter(column => column !== 'id');

    // Function to check if a value is a valid date string
    const isValidDate = (dateString: string) => {
        const date = Date.parse(dateString);
        return !isNaN(date);
    };

    // Function to format date string to local locale
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString(); // or use `format` from date-fns for more control
    };

    // Filter the data based on the search query
    const filteredData = data.filter(row =>
        columns.some(column =>
            typeof row[column] === 'string' && row[column].toLowerCase().includes(searchQuery.toLowerCase())
        )
    );

    return (
        <div>
            <Input
                // variant='soft'
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ marginBottom: '10px', width: '50%' }}
                startDecorator={<SearchOutlined />}
            />

            <Table aria-label="generic table">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, rowIndex) => (
                        <tr key={rowIndex} onClick={() => onRowClick && onRowClick(row.id)} style={{ cursor: "pointer" }}>
                            {columns.map((column) => {
                                const cellValue = row[column];
                                return (
                                    <td key={column}>
                                        {typeof cellValue === 'string' && isValidDate(cellValue)
                                            ? formatDate(cellValue)
                                            : cellValue}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
