<template>
  <div class="attendance-list">
    <b-row class="pt-4 align-center col-md-12 text-center">
      <b-button @click="finishLine" variant="outline-danger" class="p-2 m-auto">
        FINALIZAR FILA
      </b-button>
    </b-row>

    <b-row class="pt-4 align-center col-md-12 text-center">
      <b-card class="p-4 pb-5 pt-5 text-navy m-auto">
        <h3 class="font-family-secondary">SENHA</h3>
        <h1 class="font-weight-bold" v-if="!afterDone && currentPassword">
          {{ currentPassword }}
        </h1>
      </b-card>
    </b-row>
    <b-row class="pt-5 align-center col-md-12 text-center">
      <div class="m-auto" v-if="(!currentPassword || afterDone) && !attending">
        <b-button @click="callNext" variant="outline-dark" class="p-3">
          CHAMAR PRÓXIMO
        </b-button>
      </div>
      <div
        class="d-flex m-auto pt-4"
        v-if="currentPassword && !afterDone && !attending"
      >
        <b-button @click="callCurrent" variant="outline-dark" class="p-3">
          CHAMAR NOVAMENTE
        </b-button>
        <b-button @click="startService" class="ml-3 p-3 bg-navy text-white">
          INICIALIZAR ATENDIMENTO
        </b-button>
        <b-button @click="callNext" variant="outline-dark" class="ml-3 p-3">
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
    idPosto: null,
    headers: null,
    toasterPlace: "b-toaster-bottom-right",
    toasterTime: 3000
  }),
  methods: {
    callNext() {
      operador
        .get(`queue/${this.idPosto}`, {
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
            this.$bvToast.toast(`Fila vazia`, {
              title: "Erro",
              autoHideDelay: 5000,
              toaster: this.toasterPlace,
              solid: true,
              headerClass: "bg-danger text-white"
            });
          }
          this.currentPassword = null;
        });
    },
    callCurrent() {
      this.afterDone = false;
      operador
        .get(`queue/${this.idPosto}`, {
          headers: this.headers,
          params: {
            op: 2
          }
        })
        .then(res => {
          this.hasPassword = true;
          this.currentPassword = res.data.senha;
          this.$bvToast.toast(
            `Senha ${this.currentPassword} chamada novamente.`,
            {
              title: "Sucesso",
              autoHideDelay: this.toasterTime,
              toaster: this.toasterPlace,
              solid: true,
              headerClass: "bg-success text-white"
            }
          );
        });
    },
    startService() {
      operador
        .get(`queue/${this.idPosto}`, {
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
        .get(`queue/${this.idPosto}`, {
          headers: this.headers,
          params: {
            op: 4
          }
        })
        .then(() => {
          this.attending = false;
          this.afterDone = true;
        });
    },
    finishLine() {
      operador
        .delete(`queue/${this.idPosto}`, {
          headers: this.headers
        })
        .then(() => {
          this.$bvToast.toast(`Fila finalizada`, {
            title: "Sucesso",
            autoHideDelay: this.toasterTime,
            toaster: this.toasterPlace,
            solid: true,
            headerClass: "bg-success text-white"
          });
          this.currentPassword = null;
        })
        .catch(() => {
          this.$bvToast.toast(`Fila não pode ser finalizada`, {
            title: "Erro",
            autoHideDelay: this.toasterTime,
            toaster: this.toasterPlace,
            solid: true,
            headerClass: "bg-danger text-white"
          });
        });
    }
  },
  mounted() {
    this.tokenOperador = localStorage.getItem("tokenOperador");
    this.idPosto = localStorage.getItem("id_posto");
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
