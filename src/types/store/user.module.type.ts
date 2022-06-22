export interface User {
  id: number
  name: string
  email: string
  department: string | null
  job_title: string | null
  location_office: string
  location_position: string
  state: number
  is_admin: boolean
}
