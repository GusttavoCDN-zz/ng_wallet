export interface PasswordCompare {
  compare: (password: string, hash: string) => Promise<boolean>
}
