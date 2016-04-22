declare namespace ReactRouter {
  import H = HistoryModule;
  function createMemoryHistory(options?: H.HistoryOptions): H.History;

  interface IRouterContextProps extends RouterState {
    history: H.History;
    router?: Router;
    createElement?: (component: RouteComponent, props: Object) => any;
    location: H.Location;
    routes: PlainRoute[];
    params: Params;
    components: RouteComponent[];
  }
}

declare module 'react-router/lib/createMemoryHistory' {
  export default ReactRouter.createMemoryHistory;
}

declare module 'react-router' {
  import createMemoryHistory from 'react-router/lib/createMemoryHistory';

  export { createMemoryHistory };
}
