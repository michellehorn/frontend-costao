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
              label="Email:"
              required
              label-for="input-1"
            >
              <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                required
                placeholder="user@costao.com.br"
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
                v-model="form.password"
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
import { api } from "../api.js";

export default {
  name: "Login",
  data: () => ({
    form: {
      email: "",
      password: ""
    }
  }),
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      alert(JSON.stringify(this.form));
      api.post("path", {
        ...this.form
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
