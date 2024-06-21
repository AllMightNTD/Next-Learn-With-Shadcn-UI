import ReactTable from '@/components/Table/ReactTable'
import { useHomeQuery } from '@/lib/hooks/Home/useHomeQuery'
import { ColumnDef } from '@tanstack/react-table'

export type Information = {
    user_id : number 
    sex:number
    birth_day : Date | null | undefined
    contact_phone : string
    address:string
  }
export type UserType = {
    id: number
    name: string
    email: string
    email_verified_at: string | null
    created_at: Date | string
    updated_at: Date | string,
    role:number
    information:Information
}
  
const HomeList = () => {
  const { tableData } = useHomeQuery()

  const columns: ColumnDef<UserType>[] = [
    {
      header: 'Name',
      accessorKey: 'name'
    },
    {
      header: 'Email',
      accessorKey: 'email'
    },
    {
      header: 'Role',
      accessorKey: 'role',
    },
  ]

  return (
    <>
      <ReactTable
        {...tableData}
        columns={columns}
      />
    </>
  )
}

export { HomeList }

