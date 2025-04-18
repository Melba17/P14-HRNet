/**
 * Configuration du store Redux pour l'application.
 *
 * - Initialise le store avec le reducer `employee`, qui gère la liste des employés.
 * - Utilise Redux Toolkit pour simplifier la configuration du store.
 */

import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './employeeSlice';

export const store = configureStore({
  reducer: {
    employee: employeeReducer,
  },
});
