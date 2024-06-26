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
  const handleLogout = () => {
    logout();
  }
  
  return (
    <TableProvider>
        trang chủ
        <button className="px-2 py-2 bg-red-300 text-white" onClick={handleLogout}>Log out</button>
       <HomeList/>
    </TableProvider>
  );
}
