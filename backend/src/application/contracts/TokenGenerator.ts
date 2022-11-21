export interface TokenGenerator {
  generate: (payload: any) => Promise<string>
}
