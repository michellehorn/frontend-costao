<template>
  <div class="attendance">
    <b-navbar-nav
      class="p-3 font-family-secondary text-center bg-navy text-white"
    >
      <h3>Atendimento</h3>
      <div class="position-absolute" style="right:20px; top: 25px">
        <a class="link" @click="hasPlace ? logoff() : ''">{{
          hasPlace ? "Logoff" : ""
        }}</a>
      </div>
    </b-navbar-nav>
    <b-container class="pt-3">
      <OperationList v-if="hasPlace" />
      <OperationEntry @areaSelected="areaSelected" v-else />
    </b-container>
  </div>
</template>

<script>
import OperationEntry from "../components/OperationEntry";
import OperationList from "../components/OperationList";

export default {
  name: "Operation",
  components: {
    OperationEntry,
    OperationList
  },
  data: () => ({
    hasPlace: false
  }),
  methods: {
    logoff() {
      this.hasPlace = false;
      localStorage.removeItem("tokenOperador");
      this.$router.push({ path: "login-operador" });
    },
    areaSelected() {
      this.idArea = localStorage.getItem("id_posto");
      this.tokenOperador = localStorage.getItem("tokenOperador");
      this.hasPlace = true;
    }
  },
  mounted() {
    this.idArea = localStorage.getItem("id_posto");
    this.tokenOperador = localStorage.getItem("tokenOperador");
    if (!this.tokenOperador) {
      this.$router.push({ path: "login-operador" });
    }
    if (this.idArea) {
      this.hasPlace = true;
    }
  }
};
</script>

<style lang="scss" scoped>
.attendance {
  height: 100vh;
  background-color: #f8f9fa;
}
.link {
  text-decoration: underline;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
}
</style>
