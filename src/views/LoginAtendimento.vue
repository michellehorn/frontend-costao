<template>
  <div>
    <div class="d-flex">
      <div class="col-md-6 align-center container-form ">
        <div class="text-center mt-5">
          <img :src="require('../assets/logo.png')" alt="" />
        </div>
        <div class="font-family-primary">
          <b-form @submit="onSubmit">
            <b-form-group
              id="input-group-1"
              label="Login:"
              required
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.login"
                required
                placeholder="usuario"
              ></b-form-input>
            </b-form-group>
            <b-form-group
              id="input-group-1"
              label="Senha:"
              required
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.senha"
                type="password"
                required
                placeholder="********"
              ></b-form-input>
            </b-form-group>
            <div fluid class="text-light text-center">
              <b-button style="width: 200px" type="submit" variant="primary"
                >Entrar</b-button
              >
            </div>
          </b-form>
        </div>
      </div>
      <div class=" col-md-6 img-cover">
        <b-img fluid :src="require('../assets/capa-login.jpg')" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
import { operador } from "../api/api.js";

export default {
  name: "LoginAtendimento",
  data: () => ({
    form: {
      login: "",
      senha: ""
    }
  }),
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      operador
        .post("login", {
          ...this.form
        })
        .then(res => {
          alert(res);
        });
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
  padding: 10em 5em 5em 5em;
}
</style>
