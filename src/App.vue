<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@300;400&family=Open+Sans:wght@300;400&display=swap");
@import "node_modules/bootstrap/scss/bootstrap";
@import "node_modules/bootstrap-vue/src/index.scss";

html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}

// Fonts
.font-family-primary {
  font-family: "Lato", sans-serif;
}

.font-family-secondary {
  font-family: "Open Sans", sans-serif;
}

// Color

.text-navy {
  color: #154360;
}
.bg-navy {
  background: #154360;
}
</style>
