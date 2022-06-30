export interface Hardware {
  id: number
  user_id: number
  name: string
  description: string
  type: string
  brand: string
  serial_number: string
  tag: string
  spec_os: string
  spec_cpu: string
  spec_memory: number
  spec_screen_size: number
  spec_ports: string[]
  spec_adapter_input: string
  spec_adapter_output: string[]
  spec_cable_length: number
  spec_others: string
  together: string[]
  note: string
  created_at: string
  updated_at: string
}
