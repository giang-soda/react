export type AppStructure =
  | React.ReactNode
  | React.ReactNode[]
  | Record<string, React.ReactNode>
  | AppStructure[]
  | { [key: string]: AppStructure };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TAny = any;
