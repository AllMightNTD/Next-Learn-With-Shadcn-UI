import * as yup from 'yup'

const LinkData = yup.object().shape({
  url: yup.string().required(),
  label: yup.string().required(),
  active: yup.boolean().required()
})

export const PaginationSchema = yup.object().shape({
  current_page: yup.number().required(),
  first_page_url: yup.string().required(),
  from: yup.number().required(),
  last_page: yup.number().required(),
  last_page_url: yup.string().required(),
  links: yup.array().of(LinkData).required(),
  next_page_url: yup.string().required(),
  path: yup.string().required(),
  per_page: yup.number().required(),
  prev_page_url: yup.string().required(),
  to: yup.number().required(),
  total: yup.number().required()
})

export type PaginationParams = {
    page: number
    per_page: number
}
  
export type MakePaginationOptional<T> = Omit<
  Exclude<T, void>,
  'page' | 'limit'
> &
  Partial<PaginationParams>

export type PaginationProps = {
    pageCount?: number
    total?: number
    paginationParams?: PaginationParams
    handleChangePagination?: (paginationParams: Partial<PaginationParams>) => void
    manualPagination?: boolean
}

export type PaginationType = yup.InferType<typeof PaginationSchema>
