<template>
  <div>
    <div class="d-flex">
      <div class="col-md-6 container-form ">
        <div class="text-center">
          <img
            style="width: 300px"
            :src="require('../assets/logo.png')"
            alt=""
          />
        </div>
        <div class="font-family-primary mt-5 pt-5">
          <h2 class="text-navy">Caro(a) hóspede,</h2>
          <h3 class="text-danger">seja muito bem vindo ao nosso Resort!</h3>
          <div class="pt-4">
            <h5 class="text-navy font-weight-light">
              Para melhor atendê-lo, orientamos que retire uma senha e aguarde o
              atendimento na recepção.
            </h5>
          </div>
        </div>
        <div class="d-flex pt-5 mt-4">
          <b-button
            :disabled="buttonsStatus"
            class="btn-attendance mr-3"
            @click="generatePassword(1)"
            >NORMAL</b-button
          >
          <b-button
            :disabled="buttonsStatus"
            class="btn-attendance"
            @click="generatePassword(2)"
            >PREFERENCIAL</b-button
          >
        </div>
      </div>
      <div class="col-md-6 img-cover">
        <b-img fluid :src="require('../assets/front-desk.jpg')" alt="" />
      </div>
      <div class="btn-logout">
        <b-button small class="bg-dark" @click="finishLine"
          >Encerrar fila</b-button
        >
      </div>
    </div>
  </div>
</template>

<script>
import { atendimento } from "../api/api.js";

export default {
  name: "FrontDesk",
  data: () => ({
    buttonsStatus: false,
    tokenAtendimento: null,
    form: {
      email: "",
      password: ""
    }
  }),
  methods: {
    generatePassword(type) {
      atendimento
        .get(`queue/${type}`, {
          headers: {
            Authorization: `Bearer ${this.tokenAtendimento}`
          }
        })
        .then(response => {
          // bloquear buttons
          this.print(response.data.senha);

          this.buttonsStatus = true;
          setTimeout(() => {
            this.buttonsStatus = false;
          }, 5000);
        });
    },
    print(senha) {
      let a = window.open("", "", "height=150, width=250");
      a.document.write("<html>");
      a.document.write(`<body ><h1>${senha}</h1><br>`);
      a.document.write("</body></html>");
      a.document.close();
      a.print();
    },
    finishLine() {
      atendimento.delete("queue/1", {
        headers: {
          Authorization: `Bearer ${this.tokenAtendimento}`
        }
      });
      atendimento.delete("queue/2", {
        headers: {
          Authorization: `Bearer ${this.tokenAtendimento}`
        }
      });
      localStorage.removeItem("tokenAtendimento");
      this.$router.push({ path: "login-atendimento" });
    }
  },
  mounted() {
    this.tokenAtendimento = localStorage.getItem("tokenAtendimento");
    if (!this.tokenAtendimento) {
      this.$router.push({ path: "login-atendimento" });
    }
  }
};
</script>

<style lang="scss" scoped>
.img-cover {
  height: 100vh;
  overflow-y: hidden;
  padding: 0;
  margin: 0;
  background: goldenrod;
  img {
    height: 100%;
    object-fit: cover;
    opacity: 0.9;
    filter: blur(2px);
  }
}
.container-form {
  padding: 5em 3em 2em;
}

.btn-attendance {
  background: blue;
  width: 100%;
  font-size: 30px;
  height: 140px;
}
.btn-logout {
  position: absolute;
  right: 0;
}
</style>
