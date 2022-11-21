export type Payload = {
  id: number
  username: string
  account: string
};

export interface TokenGenerator {
  generate: (payload: Payload) => Promise<string>
}
