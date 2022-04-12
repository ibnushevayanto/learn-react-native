import React, {useContext, useEffect, useState} from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import LoadingOverlay from '../components/ui/LoadingOverlay';
import {ExpensesContext} from '../store/expenses-context';
import {getDateMinusDays} from '../util/date';
import {fetchExpense} from '../util/http';
import ErrorOverlay from '../components/ui/ErrorOverlay';

export default function ({}) {
  const expenseCtx = useContext(ExpensesContext);
  const [isFetching, setIsFetching] = useState(false);
  const [isError, setIsError] = useState('');

  useEffect(() => {
    async function firstLoad() {
      try {
        setIsFetching(true);
        const expenses = await fetchExpense();
        expenseCtx.setExpenses(expenses);
      } catch (error) {
        setIsError('Cannot access recent expenses');
      }
      setIsFetching(false);
    }
    firstLoad();
  }, []);

  const recentExpenses = expenseCtx.expenses.filter(expense => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);
    return expense.date >= date7DaysAgo && expense.date <= today;
  });

  return isFetching ? (
    <LoadingOverlay />
  ) : isError ? (
    <ErrorOverlay message={isError} />
  ) : (
    <ExpensesOutput
      fallbackText="No expenses registered for the last 7 days"
      expenses={recentExpenses}
      expensePeriod="Last 7 Days"
    />
  );
}
