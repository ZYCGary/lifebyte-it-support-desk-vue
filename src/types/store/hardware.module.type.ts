import { User } from '@/types/store/user.module.type'

export interface Hardware {
  id: number
  user: User
  name: string
  description: string
  type: string
  brand: string
  serial_number: string
  tag: string
  spec_os: string
  spec_cpu: string
  spec_memory: number | string
  spec_screen_size: number | string
  spec_ports: string[]
  spec_adapter_input: string
  spec_adapter_output: string[]
  spec_cable_length: number | string
  spec_others: string
  together: string[]
  note: string
  created_at: string
  updated_at: string
}

export interface HardwareFilter {
  page?: number | string
  name?: string
  type?: string
  brand?: string
  serial_number?: string
  tag?: string
  spec_os?: string
  spec_cpu?: string
  spec_memory?: number | string
  spec_screen_size?: number | string
  spec_ports?: string[]
  spec_adapter_input?: string
  spec_adapter_output?: string[]
  spec_cable_length?: number | string
}
