import type { Branded } from './brand.ts'


export type UUID = Branded<string, 'UUID'>


export function createUUID (): UUID {
  const id = crypto.randomUUID()
  return markAsUUID(id)
}


export function markAsUUID (id: string): UUID {
  return id as UUID
}
