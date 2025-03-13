export type Any = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export interface IBase {
  [key: string]: Any;
}

export interface IRequestList extends IBase {
  limit?: number;
  offset?: number;
}
