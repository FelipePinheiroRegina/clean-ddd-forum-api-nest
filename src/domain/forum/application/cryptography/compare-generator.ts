export abstract class CompareGenerator {
  abstract compare(plain: string, hash: string): Promise<boolean>
}
