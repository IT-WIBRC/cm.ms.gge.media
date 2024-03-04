export interface Repo<T> {
  save (t: T): Promise<T>;
}