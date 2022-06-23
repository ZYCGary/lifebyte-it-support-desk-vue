// Base table props
import { ModelCollection } from '@/types/store/root.module.type'

export interface BaseTableProps {
  loading: boolean
  error: boolean
  collection: ModelCollection
}
