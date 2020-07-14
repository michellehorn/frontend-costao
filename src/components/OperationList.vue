<template>
  <div class="attendance-list">
    <b-row class="pt-4 align-center col-md-12 text-center">
      <b-card class="p-4 pb-5 pt-5 text-navy m-auto">
        <h3 class="font-family-secondary">SENHA</h3>
        <h1 class="font-weight-bold">{{ currentPassword }}</h1>
      </b-card>
    </b-row>
    <b-row class="pt-5 align-center col-md-12 text-center">
      <div class="m-auto" v-if="!currentPassword || afterDone">
        <b-button @click="callNext" variant="outline-dark" class="p-3">
          CHAMAR PRÓXIMO
        </b-button>
      </div>
      <div class="d-flex m-auto pt-4" v-if="currentPassword && !afterDone">
        <b-button
          @click="callCurrent"
          v-if="!attending"
          variant="outline-dark"
          class="p-3"
        >
          CHAMAR NOVAMENTE
        </b-button>
        <b-button
          @click="startService"
          v-if="!attending"
          class="ml-3 p-3 bg-navy text-white"
        >
          INICIALIZAR ATENDIMENTO
        </b-button>
        <b-button
          @click="callNext"
          v-if="!attending"
          variant="outline-dark"
          class="ml-3 p-3"
        >
          CHAMAR PRÓXIMO
        </b-button>
      </div>
      <div class="d-flex m-auto pt-4" v-if="attending && !afterDone">
        <b-button @click="finishService" variant="outline-dark" class="p-3">
          FINALIZAR ATENDIMENTO
        </b-button>
        <b-button
          @click="
            finishService();
            callNext();
          "
          class="ml-3 p-3 bg-navy text-white"
        >
          FINALIZAR ATENDIMENTO E CHAMAR PRÓXIMO
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
import { operador } from "../api/api.js";
export default {
  name: "AttendanceList",
  data: () => ({
    hasPassword: false,
    attending: false,
    afterDone: false,
    currentPassword: null,
    tokenOperador: null,
    idUser: null,
    idArea: null,
    headers: null
  }),
  methods: {
    callNext() {
      operador
        .get(`queue/${this.idArea}`, {
          headers: this.headers,
          params: {
            op: 1
          }
        })
        .then(res => {
          this.hasPassword = true;
          this.currentPassword = res.data.senha;
          this.afterDone = false;
        })
        .catch(err => {
          if (err.response.status === 404) {
            alert("Fila vazia");
          }
          this.currentPassword = null;
        });
    },
    callCurrent() {
      operador
        .get(`queue/${this.idArea}`, {
          headers: this.headers,
          params: {
            op: 2
          }
        })
        .then(res => {
          this.hasPassword = true;
          this.currentPassword = res.data.senha;
          alert(`Senha ${this.currentPassword} chamada novamente.`);
        });
    },
    startService() {
      operador
        .get(`queue/${this.idArea}`, {
          headers: this.headers,
          params: {
            op: 3
          }
        })
        .then(() => {
          this.attending = true;
        });
    },
    finishService() {
      operador
        .get(`queue/${this.idArea}`, {
          headers: this.headers,
          params: {
            op: 4
          }
        })
        .then(() => {
          this.attending = false;
          this.afterDone = true;
        });
    }
  },
  mounted() {
    this.tokenOperador = localStorage.getItem("tokenOperador");
    this.idArea = localStorage.getItem("id_area");
    this.idUser = localStorage.getItem("userId");
    this.headers = {
      Authorization: `Bearer ${this.tokenOperador}`
    };
    if (!this.tokenOperador) {
      this.$router.push({ path: "login-operador" });
    }
  }
};
</script>

<style lang="scss" scoped>
.attendance-list {
  padding-top: 60px;
  width: 100%;
}
.card {
  width: 400px;
  h1 {
    font-size: 80px;
    font-weight: bolder;
  }
}
</style>
