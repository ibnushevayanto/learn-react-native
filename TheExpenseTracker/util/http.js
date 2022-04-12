import axios from 'axios';

const BASE_URL =
  'https://learn-react-native-1aa99-default-rtdb.firebaseioas.com/';

export async function storeExpense(expensesData) {
  const response = await axios.post(BASE_URL + 'expenses.json', expensesData);
  const id = response.data.name;
  return id;
}

export async function fetchExpense() {
  const {data} = await axios.get(BASE_URL + 'expenses.json');
  return Object.keys(data).map(res => ({
    ...data[res],
    id: res,
    date: new Date(data[res].date),
  }));
}

export function updateExpense(id, expensesData) {
  return axios.put(BASE_URL + `expenses/${id}.json`, expensesData);
}

export function deleteExpense(id) {
  return axios.delete(BASE_URL + `/expenses/${id}.json`);
}
