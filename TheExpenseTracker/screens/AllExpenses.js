import React, {useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import {ExpensesContext} from '../store/expenses-context';
import {fetchExpense} from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function ({}) {
  const expenseCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    async function firstload() {
      try {
        setIsFetching(true);
        const expenses = await fetchExpense();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setIsError('Cannot access all expenses');
      }

      setIsFetching(false);
    }

    firstload();
  }, []);

  return isFetching ? (
    <LoadingOverlay />
  ) : isError ? (
    <ErrorOverlay message={isError} />
  ) : (
    <ExpensesOutput
      expenses={expenseCtx.expenses}
      expensePeriod="Total"
      fallbackText="No registered expenses found"
    />
  );
}
