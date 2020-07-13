<template>
  <div class="attendance-list">
    <div class="d-flex text-left">
      <h6>Área: {{ field }} | Guichê: {{ window }}</h6>
    </div>
    <b-row class="pt-4 align-center col-md-12 text-center">
      <b-card class="p-4 pb-5 pt-5 text-navy m-auto">
        <h3 class="font-family-secondary">SENHA</h3>
        <h1 class="font-weight-bold">{{ currentPassword }}</h1>
      </b-card>
    </b-row>
    <b-row class="pt-5 align-center col-md-12 text-center">
      <div class="d-flex m-auto pt-4">
        <b-button @click="callCurrent" variant="outline-dark" class="p-3">
          CHAMAR NOVAMENTE
        </b-button>
        <b-button @click="callNext" class="ml-3 p-3 bg-navy text-white">
          FINALIZAR ATENDIMENTO E CHAMAR PRÓXIMO
        </b-button>
      </div>
    </b-row>
  </div>
</template>

<script>
export default {
  name: "AttendanceList",
  data: () => ({
    field: "Sagão do Hotel",
    window: "G1",
    currentPassword: 2345
  }),
  methods: {
    callNext() {
      this.currentPassword++;
    },
    callCurrent() {
      alert(this.currentPassword);
    }
  }
};
</script>

<style lang="scss" scoped>
.attendance-list {
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
