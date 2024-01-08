import { useMemo } from "react";
import { RelayEnvironmentProvider } from "react-relay";
import { Environment, Network, RecordSource, Store } from "relay-runtime";

import fetchFn from "@/mobile/utils/fetch";

function RelayProvider({ children }: { children: React.ReactNode }) {
  const environment = useMemo(() => {
    return new Environment({
      network: Network.create(fetchFn),
      store: new Store(new RecordSource()),
    });
  }, []);

  return (
    <RelayEnvironmentProvider environment={environment}>
      {children}
    </RelayEnvironmentProvider>
  );
}

export default RelayProvider;