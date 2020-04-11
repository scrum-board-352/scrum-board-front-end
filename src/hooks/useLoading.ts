import { useCallback, useState } from "react";

type AwaitReturnType<T> = T extends (...args: any[]) => Promise<infer V> ? V : T;

type OpFunc = (...args: any[]) => any;

export default function useLoading(): [boolean, typeof loadingOps] {
  const [loading, setLoading] = useState(false);
  const loadingOps = useCallback(
    async <T extends OpFunc>(f: T, ...args: Parameters<T>): Promise<AwaitReturnType<T>> => {
      setLoading(true);
      try {
        return await f(...args);
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  return [loading, loadingOps];
}

type LoaingMap = {
  [key: string]: boolean;
};

export function useLoadingGroup(): [typeof loading, typeof loadingOps] {
  const [loadingMap, setLoadingMap] = useState<LoaingMap>({});

  const loading = useCallback(
    (id: string) => {
      return loadingMap[id] ?? false;
    },
    [loadingMap]
  );

  const loadingOps = useCallback(
    async <T extends OpFunc>(
      id: string,
      f: T,
      ...args: Parameters<T>
    ): Promise<AwaitReturnType<T>> => {
      setLoadingMap({ ...loadingMap, [id]: true });
      try {
        return await f(...args);
      } finally {
        setLoadingMap({ ...loadingMap, [id]: false });
      }
    },
    [loadingMap]
  );

  return [loading, loadingOps];
}
