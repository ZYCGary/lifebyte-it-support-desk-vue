import { User } from '@/types/store/user.module.type'

export interface Hardware {
  id: number
  user: User
  name: string
  description: string
  type: string
  brand: string
  model: string
  serial_number: string
  tag: string
  spec_os: string | null
  spec_cpu: string | null
  spec_memory: number | null
  spec_storage: number | null
  spec_screen_size: number | null
  spec_others: string | null
  bundle_with: string[] | null
  note: string | null
  created_at?: string
  updated_at?: string
}

export interface HardwareFilter {
  page?: number | string
  name?: string
  type?: string
  brand?: string
  model?: string
  serial_number?: string
  tag?: string
  spec_os?: string
  spec_cpu?: string
  spec_memory?: number | string
  spec_storage?: number | string
  spec_screen_size?: number | string
}
