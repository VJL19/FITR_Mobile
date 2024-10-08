import { useEffect, useState } from "react";
import { InteractionManager } from "react-native";

const useIsReady = () => {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    InteractionManager.runAfterInteractions(() => {
      setIsReady(true);
    });
  }, []);

  return { isReady };
};

export default useIsReady;
