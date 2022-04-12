import React, {useLayoutEffect, useContext, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import IconButton from '../components/ui/IconButton';
import {GlobalStyles} from '../constants/styles';
import {ExpensesContext} from '../store/expenses-context';
import ExpenseForm from '../components/ManageExpense/ExpenseForm';
import {storeExpense} from '../util/http';
import {
  updateExpense as updateExpenseApi,
  deleteExpense as deleteExpenseApi,
} from '../util/http';
import LoadingOverlay from '../components/ui/LoadingOverlay';

export default function ({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;
  const {deleteExpense, addExpense, updateExpense, expenses} =
    useContext(ExpensesContext);
  const defaultValue = expenses.find(res => res.id === editedExpenseId);
  const [isFetching, setIsFetching] = useState(false);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: editedExpenseId ? 'Edit Expense' : 'Add Expense',
    });
  }, [editedExpenseId]);

  const deleteExpenseHandler = async () => {
    try {
      setIsFetching(true);
      await deleteExpenseApi(editedExpenseId);
      deleteExpense(editedExpenseId);
    } catch (error) {
      Alert.alert('An error occured', 'Cannot process delete expenses!', [
        {text: 'Ok'},
      ]);
    }

    setIsFetching(false);
    navigation.goBack();
  };
  const confirmHandler = async value => {
    setIsFetching(true);
    if (editedExpenseId) {
      try {
        await updateExpenseApi(editedExpenseId, value);
        updateExpense(editedExpenseId, {...value});
      } catch (error) {
        Alert.alert('An error occured', 'Cannot process edit expenses!', [
          {text: 'Ok'},
        ]);
      }
    } else {
      try {
        const response = await storeExpense(value);
        addExpense({...value, id: response});
      } catch (error) {
        Alert.alert('An error occured', 'Cannot process add expenses!', [
          {text: 'Ok'},
        ]);
      }
    }
    setIsFetching(false);
    navigation.goBack();
  };

  return isFetching ? (
    <LoadingOverlay />
  ) : (
    <View style={styles.container}>
      <ExpenseForm
        navigation={navigation}
        confirmHandler={confirmHandler}
        submittedButton={editedExpenseId ? 'Update' : 'Add'}
        defaultValue={defaultValue}
      />
      {editedExpenseId && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            size={36}
            color={GlobalStyles.colors.error500}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
