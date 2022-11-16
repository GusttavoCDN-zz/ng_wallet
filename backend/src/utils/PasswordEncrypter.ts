export interface PasswordEncrypter {
  encrypt: (password: string) => Promise<string>
}
