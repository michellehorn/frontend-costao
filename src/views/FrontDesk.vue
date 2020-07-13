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
          <b-button class="btn-attendance mr-3" @click="generatePassword(1)"
            >NORMAL</b-button
          >
          <b-button class="btn-attendance" @click="generatePassword(2)"
            >PREFERENCIAL</b-button
          >
        </div>
      </div>
      <div class="col-md-6 img-cover">
        <b-img fluid :src="require('../assets/front-desk.jpg')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { atendimento } from "../api/api.js";

export default {
  name: "FrontDesk",
  data: () => ({
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
        .then(() => {
          alert("Senha gerada com sucesso");
        });
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
</style>
