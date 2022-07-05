export interface BasePaginationProps {
  links: {
    first: string | null
    last: string | null
    next: string | null
    prev: string | null
  }
  meta: {
    current_page: number
    per_page: number
    last_page: number
    total: number
    from: number
    to: number
    links: {
      url: string | null
      label: string
      active: boolean
    }[]
  }
}
