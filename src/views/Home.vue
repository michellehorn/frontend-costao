<template>
  <div class="home">
    <div class="home-bg"></div>
    <div class="home-content pt-5 p-4">
      <img :src="require('../assets/logo.png')" alt="" class="ml-3 mr-3" />
      <section class="d-flex pt-4 pl-5 pr-5 text-navy">
        <div class="col-md-6 pr-5 pl-5">
          <b-card class="mr-5 ml-5 p-4 text-center">
            <h3 class="font-family-secondary">SENHA</h3>
            <h1 class="font-weight-bold">{{ nextPassword }}</h1>
          </b-card>
          <b-card class="mr-5 ml-5 mt-4 p-4  text-center">
            <h3 class="font-family-secondary">GUICHÊ</h3>
            <h1 class="font-weight-bold">{{ ticketWindow }}</h1>
          </b-card>
        </div>
        <div class="col-md-6 font-family-secondary">
          <b-card style="height: 100%">
            <h5 class="text-center mt-2">ÚLTIMAS SENHAS</h5>
            <b-table
              :items="items"
              :fields="fields"
              class="text-center text-navy mt-4 table-borderless table-condensed"
            >
              <template v-slot:head(password)>
                <h5>SENHA</h5>
              </template>
              <template v-slot:head(ticketWindow)>
                <h5>GUICHÊ</h5>
              </template>
              <template v-slot:head(time)>
                <h5>HORA</h5>
              </template>
              <template v-slot:cell()="data">
                <h3 class="font-family-secondary">
                  <strong>{{ data.value }}</strong>
                </h3>
              </template>
            </b-table>
          </b-card>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  components: {},
  data: () => ({
    nextPassword: "1234",
    ticketWindow: "G1",
    items: [
      {
        password: "C3454",
        ticketWindow: "G1",
        time: "10:50"
      },
      {
        password: "C3454",
        ticketWindow: "G1",
        time: "10:50"
      },
      {
        password: "C3454",
        ticketWindow: "G1",
        time: "10:50"
      },
      {
        password: "C3454",
        ticketWindow: "G1",
        time: "10:50"
      },
      {
        password: "C3454",
        ticketWindow: "G1",
        time: "10:50"
      }
    ],
    fields: ["password", "ticketWindow", "time"]
  })
};
</script>
<style lang="scss" scoped>
.home {
  height: 100vh;
  width: 100%;

  .home-bg {
    background: url("../assets/beach.jpg");
    height: 100vh;
    width: 100%;
    background-size: cover;
    position: relative;
    z-index: 1;
    opacity: 0.65;
    filter: blur(1px);
  }

  .home-content {
    position: absolute;
    z-index: 10;
    top: 0;
    width: 100%;
  }

  h1 {
    font-size: 100px;
    font-weight: bolder;
  }
}
</style>
