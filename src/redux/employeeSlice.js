import { createSlice } from '@reduxjs/toolkit';

// Récupère les employés depuis localStorage 
const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    list: savedEmployees,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      localStorage.setItem('employees', JSON.stringify(state.list));
    },
  },
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
