<template>
  <v-app>
    <router-view fluid></router-view>
  </v-app>
</template>

<script>
export default {
  name: "App",
};
</script>

<style scoped>

@font-face {
    font-family: 'Hurme';
    src: url("~@/assets/fonts/HurmeGeometricSans2-Bold.woff2") format("woff2"), 
         url("~@/assets/fonts/HurmeGeometricSans2-Bold.woff") format("woff");
    font-weight: bold;
    font-style: normal;
}

html, body {
  font-family: 'Hurme';
}

html {
  overflow: hidden !important;
  scrollbar-width: none;
  -ms-overflow-style: none;
}

html::-webkit-scrollbar {
  width: 0;
  height: 0;
}

.theme--dark.v-application {
    background: #12121200 !important;
    color: #fff;
}
</style>