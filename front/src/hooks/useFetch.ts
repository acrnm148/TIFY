// useFetch.js
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

function useFetch(page:number) {
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [list, setList] = useState<Array<any>>([]);
  const [hasMore, setHasMore] = useState(false);
  const sendQuery = useCallback(async () => {
    const URL = '' // gifthub 요청 URL
    try {
      await setLoading(true);
      await setError(false);
      const res = await axios.get(URL);
      await setList((list) => [...new Set([...list, ...res.data])])
      await setHasMore(res.data.docs.length > 0);
      setLoading(false)
    } catch (err) {
      // setError(err);
    }
  }, [page]);

  useEffect(() => {
    sendQuery();
  }, [ sendQuery, page]);

  return { isLoading, error, list, hasMore  };
}

export default useFetch;