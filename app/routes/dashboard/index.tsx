import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~/components/ui/table";

export function meta() {
  return [
    { title: 'Dashboard' },
    { name: 'description', content: 'Dashboard' },
  ]
}

export default function Dashboard() {
  return (
    <div>
      <div className='mb-2 flex items-center justify-between space-y-2'>
        <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>City</TableHead>
            <TableHead>State</TableHead>
            
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 100 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>{index}</TableCell>
              <TableCell>John Doe</TableCell>
              <TableCell>john.doe@example.com</TableCell>
              <TableCell>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</TableCell>
              <TableCell>1234567890</TableCell>
              <TableCell>12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890</TableCell>
              <TableCell>1234567890</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
