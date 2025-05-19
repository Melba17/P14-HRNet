/**
 * Slice Redux pour la gestion des employés.
 *
 * - Initialise la liste des employés à partir du `localStorage`.
 * - Fournit l'action `addEmployee` pour ajouter un nouvel employé à la liste.
 *   Cette action met également à jour le `localStorage` avec les données modifiées.
 *
 * @param {object} state - L'état Redux actuel.
 * @param {object} action - Action contenant l'employé à ajouter (`action.payload`).
 */

import { createSlice } from '@reduxjs/toolkit';

// Récupère les employés depuis localStorage 
// "JSON.parse" convertit une chaîne de caractères JSON en objet JS manipulable
const savedEmployees = JSON.parse(localStorage.getItem('employees')) || [];

const employeeSlice = createSlice({
  name: 'employee',
  initialState: {
    list: savedEmployees,
  },
  reducers: {
    addEmployee: (state, action) => {
      state.list.push(action.payload);
      // "JSON.stringify" => action inverse, on convertit un objet JS en chaîne JSON pour pouvoir le stocker dans localStorage
      localStorage.setItem('employees', JSON.stringify(state.list));
    },
  },
});

export const { addEmployee } = employeeSlice.actions;

export default employeeSlice.reducer;
