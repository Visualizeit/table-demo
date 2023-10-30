export interface User {
  firstName: string
  lastName: string
  age: number
  visits: number
  status: string
  progress: number
}

const users: User[] = Array.from({ length: 30 }, (_, index) => ({
  firstName: `Hello${index}`,
  lastName: `World${index}`,
  age: 24,
  visits: 100,
  status: 'In Relationship',
  progress: 50
}))

export default users
