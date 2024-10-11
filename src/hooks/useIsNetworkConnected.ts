import NetInfo, { NetInfoState } from "@react-native-community/netinfo";
import { useState, useEffect } from "react";

const useIsNetworkConnected = () => {
  const [isConnected, setIsConnected] = useState<boolean | null>(false);
  useEffect(() => {
    function connectDevice(state: NetInfoState) {
      console.log("Connection type", state.type);
      console.log("Is connected?", state.isConnected);
      setIsConnected(state.isConnected);
    }

    const listen = NetInfo.addEventListener(connectDevice);

    return () => listen();
  }, []);

  return { isConnected };
};
export default useIsNetworkConnected;
