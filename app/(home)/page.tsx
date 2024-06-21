'use client'
import ReactTable from "@/components/Table/ReactTable";
import { logout } from "@/lib/action";
import { TableProvider } from "@/lib/context/TableProvider";
import { HomeList } from "@/screens/HomeList";
import { ColumnDef } from "@tanstack/react-table";

type User = {
  firstName: string
  lastName: string
  age: number
  visits: number
  progress: number
  status: string
}
export default function Home() {
  const handleLogout = async () => {
    logout();
  }
  const data:User[] = [
    {
      "firstName": "Tanner",
      "lastName": "Linsley",
      "age": 33,
      "visits": 100,
      "progress": 50,
      "status": "Married"
    },
    {
      "firstName": "Kevin",
      "lastName": "Vandy",
      "age": 27,
      "visits": 200,
      "progress": 100,
      "status": "Single"
    },
    {
      "firstName": "Tanner3",
      "lastName": "Linsley",
      "age": 33,
      "visits": 100,
      "progress": 50,
      "status": "Married"
    },
    {
      "firstName": "Kevin4",
      "lastName": "Vandy",
      "age": 27,
      "visits": 200,
      "progress": 100,
      "status": "Single"
    },
    {
      "firstName": "Tanner5",
      "lastName": "Linsley",
      "age": 33,
      "visits": 100,
      "progress": 50,
      "status": "Married"
    },
    {
      "firstName": "Kevin6",
      "lastName": "Vandy",
      "age": 27,
      "visits": 200,
      "progress": 100,
      "status": "Single"
    },
    {
      "firstName": "Tanner7",
      "lastName": "Linsley",
      "age": 33,
      "visits": 100,
      "progress": 50,
      "status": "Married"
    },
    {
      "firstName": "Kevin8",
      "lastName": "Vandy",
      "age": 27,
      "visits": 200,
      "progress": 100,
      "status": "Single"
    },
    {
      "firstName": "Tanner9",
      "lastName": "Linsley",
      "age": 33,
      "visits": 100,
      "progress": 50,
      "status": "Married"
    },
    {
      "firstName": "Kevin10",
      "lastName": "Vandy",
      "age": 27,
      "visits": 200,
      "progress": 100,
      "status": "Single"
    },
    {
      "firstName": "Tanner11",
      "lastName": "Linsley",
      "age": 33,
      "visits": 100,
      "progress": 50,
      "status": "Married"
    },
    {
      "firstName": "Kevin12",
      "lastName": "Vandy",
      "age": 27,
      "visits": 200,
      "progress": 100,
      "status": "Single"
    }
  ]

  const columns: ColumnDef<User>[] = [
    {
      header: 'Họ',
      accessorKey: 'firstName'
    },
    {
      header: 'Tên',
      accessorKey: 'lastName'
    },
    {
      header: 'Tuổi',
      accessorKey: 'age'
    },
    {
      header: 'Visits',
      accessorKey: 'visits'
    },
    {
      header: 'progress',
      accessorKey: 'progress'
    },
    {
      header: 'Trạng thái',
      accessorKey: 'status'
    },
  ]

  const onRowClick = () => {
    console.log('123');
    
  }
  
  return (
    <TableProvider>
        trang chủ
        <button className="px-2 py-2 bg-red-300 text-white" onClick={handleLogout}>Log out</button>
       <HomeList/>
    </TableProvider>
  );
}
