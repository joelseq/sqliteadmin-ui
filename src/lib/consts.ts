import type { Condition } from './types'

export const EMPTY_CONDITION: Condition = {
  cases: [],
  logicalOperator: 'and', // default to 'and'
}

export const DEFAULT_LIMIT = 50
