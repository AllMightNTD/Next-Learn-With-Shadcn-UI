import { TableContextValue, useTableContext } from "@/lib/context/TableProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import * as yup from "yup";
import { PaginationParams } from "@/lib/types/pagination";
import { UserType } from "@/screens/HomeList";
import { axiosInstance } from "@/lib/axios";

const UserInputSchema = yup.object().shape({
  page: yup.number().optional(),
  per_page: yup.number().optional(),
  key_word: yup.string().optional(),
});
type TypeOf<T extends yup.AnySchema> = T extends yup.Schema<infer U>
  ? U
  : never;
type UserInputType = TypeOf<typeof UserInputSchema>;
type QueryInputListUser = {
  page?: number;
  per_page?: number;
  column?: string;
  id?: number | string;
  sortBy?: "asc" | "desc" | undefined;
};

export const getListUsers = async (params: QueryInputListUser) => {
  try {
    const response = await axiosInstance.get<UserType>(
      "/admin/users",
      {
        params: params,
      }
    );
    return response.data;
  } catch (error) {
    // Xử lý lỗi nếu có
    console.error("Error fetching list of users:", error);
    throw error; // Ném lỗi để component gọi hàm này xử lý
  }
};

export function useHomeQuery() {
  const { input, getTableData, sortOptions } = useTableContext() as TableContextValue<unknown, PaginationParams>
  const data = useQuery({
    queryKey: [input.page, input.per_page],
    queryFn: () =>
      getListUsers({
        ...input,
        ...sortOptions,
      }),
  });

  return {
    // @ts-ignore
    tableData: getTableData(data),
  };
}
