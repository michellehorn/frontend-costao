import axios from "axios";

// Operador

export const operador = axios.create({
  baseURL: `http://192.168.0.20:3003`,
  headers: {
    "Content-Type": "application/json"
  }
});

// Monitor

export const monitor = axios.create({
  baseURL: `http://192.168.0.20:3004`,
  headers: {
    "Content-Type": "application/json"
  }
});

// Atendimento

export const atendimento = axios.create({
  baseURL: `http://192.168.0.20:3002`,
  headers: {
    "Content-Type": "application/json"
  }
});
