import { useEffect, useState } from "react";
import { useAuth } from "contexts/jwt-provider";
import {
  getTodosPercentages,
  getTodosDaysCount,
} from "services/dashboard.service";
import { TodosPercentages } from "types/Todo";

export const useAnalytics = (): TodosPercentages => {
  const [result, setResult] = useState<TodosPercentages>();

  const { getAccessTokenSilently } = useAuth();

  useEffect(() => {
    (async () => {
      const accessToken = await getAccessTokenSilently();
      const _result = (await getTodosPercentages({ accessToken }))
        ?.data as TodosPercentages;

      const days = await getTodosDaysCount({ accessToken });

      setResult({
        hundred: _result?.hundred,
        aboveFifty: _result?.aboveFifty,
        belowFifty: _result?.belowFifty,
        total:
          _result?.hundred + _result?.aboveFifty + _result?.belowFifty || 0,
        days,
      });
    })();
  }, [getAccessTokenSilently, setResult]);

  return (
    result ?? {
      hundred: 0,
      aboveFifty: 0,
      belowFifty: 0,
      total: 0,
      days: 0,
    }
  );
};
