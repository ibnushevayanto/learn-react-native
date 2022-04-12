import React, {createContext, useReducer} from 'react';

export const ExpensesContext = createContext({
  expenses: [],
  setExpenses: expenses => {},
  addExpense: ({description, amount, date}) => {},
  deleteExpense: id => {},
  updateExpense: (id, {description, amount, date}) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      return state.concat(action.payload);
    case 'SET':
      return action.payload.reverse();
    case 'UPDATE':
      const dataIndex = state.findIndex(res => res.id === action.payload.id);
      const data = state[dataIndex];
      const updatedItem = {...data, ...action.payload.data};
      const updatedExpense = [...state];
      updatedExpense[dataIndex] = updatedItem;
      return updatedExpense;
    case 'DELETE':
      return state.filter(res => res.id !== action.payload);
    default:
      return state;
  }
}

export default function ({children}) {
  const [expensesState, dispatchExpenses] = useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatchExpenses({type: 'ADD', payload: expenseData});
  }

  function deleteExpense(id) {
    dispatchExpenses({type: 'DELETE', payload: id});
  }

  function updateExpense(id, expenseData) {
    dispatchExpenses({type: 'UPDATE', payload: {id, data: expenseData}});
  }

  function setExpenses(expenses) {
    dispatchExpenses({type: 'SET', payload: expenses});
  }

  const value = {
    expenses: expensesState,
    addExpense,
    setExpenses,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}
