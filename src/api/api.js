import axios from "axios";

// Operador

export const operador = axios.create({
  baseURL: process.env.VUE_APP_OPERADOR_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Monitor

export const monitor = axios.create({
  baseURL: process.env.VUE_APP_MONITOR_API,
  headers: {
    "Content-Type": "application/json",
  },
});

// Atendimento

export const atendimento = axios.create({
  baseURL: process.env.VUE_APP_ATENDIMENTO_API,
  headers: {
    "Content-Type": "application/json",
  },
});
