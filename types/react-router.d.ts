declare module 'react-router/lib/createMemoryHistory' {
  export default function createMemoryHistory(options?: HistoryModule.HistoryOptions): HistoryModule.History;
}

declare module 'react-router' {
  import createMemoryHistory from 'react-router/lib/createMemoryHistory';

  export { createMemoryHistory };
}
