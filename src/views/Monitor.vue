<template>
  <div class="home">
    <div class="home-bg"></div>
    <div class="home-content pt-5 p-4">
      <img :src="require('../assets/logo.png')" alt="" class="ml-3 mr-3" />
      <section class="d-flex pt-4 pl-5 pr-5 text-navy">
        <div class="col-md-6 pr-5 pl-5">
          <transition name="slide-fade" mode="out-in">
            <div :key="nextPassword">
              <b-card class="mr-5 ml-5 p-4 text-center">
                <h3 class="font-family-secondary">SENHA</h3>
                <h1 class="font-weight-bold">{{ nextPassword }}</h1>
              </b-card>
              <b-card class="mr-5 ml-5 mt-4 p-4  text-center">
                <h3 class="font-family-secondary">GUICHÊ</h3>
                <h1 class="font-weight-bold">{{ ticketWindow }}</h1>
              </b-card>
            </div>
          </transition>
        </div>
        <div class="col-md-6 font-family-secondary">
          <b-card style="height: 100%">
            <h5 class="text-center mt-2">ÚLTIMAS SENHAS</h5>
            <b-table
              :items="items"
              :fields="fields"
              class="text-center text-navy mt-4 table-borderless table-condensed"
            >
              <template v-slot:head(senha)>
                <h5>SENHA</h5>
              </template>
              <template v-slot:head(posto)>
                <h5>GUICHÊ</h5>
              </template>
              <template v-slot:head(data)>
                <h5>DATA/HORA</h5>
              </template>
              <template v-slot:cell()="data">
                <h3 class="font-family-secondary">
                  <strong>{{ data.value }}</strong>
                </h3>
              </template>
              <template v-slot:cell(data)="dt">
                <h3 class="font-family-secondary">
                  <strong>{{ dt.value | formatDate }}</strong>
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
import { monitor } from "../api/api.js";
import moment from "moment";
import io from "socket.io-client";

export default {
  name: "Home",
  filters: {
    formatDate: function(val) {
      if (val) {
        return moment(String(val)).format("DD/MM/YYYY hh:mm");
      }
    }
  },
  data: () => ({
    socket: io("http://192.168.0.20:3004"),
    headers: null,
    nextPassword: "1234",
    ticketWindow: "G1",
    items: [
      {
        senha: "C3454",
        posto: "G1",
        data: "10:50"
      }
    ],
    fields: ["senha", "posto", "data"]
  }),
  created() {
    const tokenMonitor = localStorage.getItem("tokenMonitor");
    this.socket.on("connect", () => {
      this.socket.emit("authentication", {
        token: tokenMonitor
      });
    });
    this.headers = {
      Authorization: `Bearer ${tokenMonitor}`
    };
    this.getItems();
  },
  mounted() {
    const tokenMonitor = localStorage.getItem("tokenMonitor");
    if (tokenMonitor) {
      this.socket.on("senha", senha => {
        this.nextPassword = senha.s;
        this.ticketWindow = senha.p;
        this.getItems();
        this.playSound(
          "http://soundbible.com/mp3/Air Plane Ding-SoundBible.com-496729130.mp3"
        );
      });

      this.socket.on("inicial", inicial => {
        this.items = inicial[0].atendimentos;
      });

      this.socket.on("disconnect", text => {
        console.log(text);
      });
    } else {
      this.$router.push({ path: "login-monitor" });
    }
  },
  methods: {
    getItems() {
      monitor
        .get("monitor", { headers: this.headers })
        .then(res => {
          this.items = res.data[0].atendimentos;
          this.nextPassword = this.items[0].senha;
          this.ticketWindow = this.items[0].posto;
        })
        .catch(() => {
          this.$router.push({ path: "login-monitor" });
        });
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound);
        audio.play();
      }
    }
  }
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
.slide-fade-enter-active {
  /* transition: all 0.3s ease; */
  animation: blinker 1s linear infinite;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for <2.1.8 */ {
  opacity: 0;
}

@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
