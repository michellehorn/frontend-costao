<template>
  <div>
    <div class="d-flex">
      <div class="col-md-6 container-form ">
        <div class="text-center">
          <img
            style="width: 250px"
            :src="require('../assets/logo.png')"
            alt=""
          />
        </div>
        <div class="font-family-primary mt-2 pt-5">
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
    preSenha: null,
    posSenha: null,
    form: {
      email: "",
      password: "",
    },
    hourMinute: "",
  }),
  methods: {
    getHourMinute() {
      const data = new Date();
      this.hourMinute = `${data.getHours()}:${data.getMinutes()}`;
    },
    generatePassword(type) {
      atendimento
        .get(`queue/${type}`, {
          headers: {
            Authorization: `Bearer ${this.tokenAtendimento}`,
          },
        })
        .then((response) => {
          // bloquear buttons
          this.print(response.data.senha);
          this.buttonsStatus = true;
          setTimeout(() => {
            this.buttonsStatus = false;
          }, 5000);
        });
    },
    print(senha) {
      let a = window.open("", "", "height=300, width=450");
      a.document.write("<html>");
      a.document.write(
        `<body><h4 style="text-align: center; margin: 0; padding-top: 1em;">${this.preSenha}</h3>`
      );
      a.document.write(
        `<h2 style="font-size: 100px; text-align: center; margin: 0;">${senha}</h2>`
      );
      a.document.write(
        `<h5 style="text-align: center; margin: 0;">${this.posSenha}</h5>`
      );
      a.document.write(
        `<h5 style="text-align: center; margin: 10px 0;">Horário de impressão: ${this.hourMinute}</h5>`
      );
      a.document.write("</body></html>");
      a.document.close();
      a.focus();
      a.print();
      a.onafterprint = a.close();
    },
  },
  mounted() {
    this.getHourMinute();
    this.tokenAtendimento = localStorage.getItem("tokenAtendimento");
    if (!this.tokenAtendimento) {
      this.$router.push({ path: "login-atendimento" });
    }
    atendimento
      .get("config", {
        headers: {
          Authorization: `Bearer ${this.tokenAtendimento}`,
        },
      })
      .then((res) => {
        this.preSenha = res.data[0].ds_pre_senha;
        this.posSenha = res.data[0].ds_pos_senha;
      });
  },
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
