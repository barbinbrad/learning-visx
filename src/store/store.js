/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  createContext, useContext, useEffect, useMemo, useState,
} from 'react';

import bitcoinService from '../services/crypto/bitcoin';

const Store = createContext();

// eslint-disable-next-line react/prop-types
export function StoreProvider({ children }) {
  const [bitcoinData, setBitcoinData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getBitcoinPrices();
  }, []);

  function getBitcoinPrices() {
    setLoading(true);
    bitcoinService
      .getPrices()
      .then((resp) => {
        setBitcoinData(resp);
      })
      .catch((err) => setError(err.toString()))
      .finally(() => setLoading(false));
  }

  // useMemo is used to reduce re-rendering
  const publicInterface = useMemo(
    // this is an global state object than any component can access
    // through the useStore method
    () => ({
      // getters
      bitcoinData,
      error,
      loading,
      // setters
    }),
    // this is a list of getters that cause re-rendering of dependents on change
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [bitcoinData, error, loading],
  );

  return <Store.Provider value={publicInterface}>{children}</Store.Provider>;
}

export default function useStore() {
  const context = useContext(Store);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}
