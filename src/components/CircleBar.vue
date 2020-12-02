<template>
    <div>
        <div class="hamcircle">
            <div :class="['trigger hamburger bars hamburger--elastic', {'is-active': isActive}]" 
                id="nav-action" 
                type="button"
                @click="isActive = !isActive">
                <span class="hamburger-box">
                    <span class="hamburger-inner"></span>
                </span>
            </div>
        </div>
        
        <div class='cursor'>
            <div class='cursor_point'></div>
            <div class='cursor_outer'></div>
        </div>

        <div class="fullheight">
            <keep-alive>
                <router-view></router-view>
            </keep-alive>
        </div>

        <div class="nav-body" style="display: none;">
            <div class="container">
            <a @click="aboutus">
                <div class="box box-1">
                    <div class="cover"><img class="img-menu" :src="image1" alt=""></div>
                    <button><div></div></button>
                </div>
            </a>
                <a @click="signup">
                <div class="box box-3">
                    <div class="cover"><img class="img-menu" :src="image2" alt=""></div>
                    <button><div></div></button>
                </div>
                </a>
                <a @click="login">
                <div class="box box-4">
                    <div class="cover"><img class="img-menu" :src="image3" alt=""></div>
                    <button><div></div></button>
                </div>
                </a>
            </div>
        </div>
    </div>
</template>

<script>
import $ from "jquery";
export default {
    name: "CircleBar",
    data() {
        return {
            items: [
                { title: "Home Page", to: "/index" },
                { title: "Sign Up", to: "/signup" },
                { title: "Log In", to: "/login" },
            ],
            image1: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/3433202-2ebb2b6f93add843.png",
            image2: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/3433202-964edcf0f07211b0.png",
            image3: "https://s3-us-west-2.amazonaws.com/s.cdpn.io/945546/3433202-f79c4cc8de2f84ae.png",
            isActive: false,
        }
    },
    methods: {
        aboutus() {
            this.$router.push({
                name: 'index',
            });
            setTimeout(function(){location.href= 'index'}, 100);
        },
        signup() {
            this.$router.push({
                name: 'signup',
            });
            setTimeout(function(){location.href= 'signup'}, 100);
        },
        login() {
            this.$router.push({
                name: 'login',
            });
            setTimeout(function(){location.href= 'login'}, 100);
        },
        hamChange(ham) {
            ham.classList.toggle("change");
        },
    },
    mounted() {
        import('../assets/js/parallax.js');
        import('../assets/js/navigation.js');
    },
}
</script>

<style>
  @import '../assets/styles/navigation.css';
  @import '../assets/styles/parallax.css';
  @import '../assets/styles/scrollbar.css';
</style>