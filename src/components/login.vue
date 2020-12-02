<template>
    <div class="content-login">
        <v-progress-linear v-show="progressBar" slot="progress" color="yellow" indeterminate></v-progress-linear>
        <div class='portfolio'>
            <div class='page_portfolioz'>
                <div class='portfolio_home__header'>
                <div class='logoMain'>
                    <img src='../assets/logo/white.png'>
                </div>
                <div class='nav'>
                    <v-list>
                        <v-list-item
                            v-for="item in items"
                            :key="item.title"
                            link
                            tag="router-link"
                            :to="item.to"
                        >
                            <a><li class="trigger">{{ item.title }}</li></a>
                        </v-list-item>
                    </v-list>
                </div>
                    <div class='number'>Web Application Development Team 6 presents</div>
                </div>
            </div>
            <div class="text-center">
                <font color="white">
                <h1 class="titleform" style="opacity: 0;">Welcome Back<font color="yellow">!</font></h1>
                <br>
                <h3 class="textform" style="opacity: 0;">Please enter your <font color="yellow">personal information</font> to log in.</h3>
                </font>
            </div>

            <v-form v-model="valid" ref="form">
                <div class="login mt-5" style="opacity: 0;">

                    <label class="text--white">Username</label>
                    <input type="text" 
                        placeholder="Username" 
                        v-model="form.username" 
                        :rules="usernameRules" 
                        required>

                    <label class="text--white">Password</label>

                    <input type="password" 
                        placeholder="Password" 
                        v-model="form.password"
                        :rules="passwordRules" 
                        required>
                    
                    <v-btn class="trigger" @click="login">Log In</v-btn>
                </div>
            </v-form>

            <br><br>
        </div>
        <v-snackbar v-model="snackbar" :color="color" timeout="3000" top>
            <pre>{{error_message}}</pre>
        </v-snackbar>
    </div>
</template>

<script>

export default {
    name: "login",
    data() {
        return {
            items: [
                {title: 'About Us', to: "/index"},
                {title: 'Sign Up', to: "/signup"},
                {title: 'Log In', to: "/login"},
            ],
            valid: false,
            error_message: '',
            snackbar: false,
            color: 'green',
            form: {
                username: '',
                password: '',
            },
            usernameRules: [
                (v) => !!v || 'Username is empty!',
            ],
            passwordRules: [
                (v) => !!v || 'Password is empty!',
            ],
            progressBar: false,
        }
    },
    mounted() {
        import('../assets/js/formAni.js');
    },
    methods: {
        login() {
            if (this.$refs.form.validate()) {
                this.error_message = ''
                this.progressBar = true
                this.$http.post(this.$api + '/login', {
                    username: this.form.username,
                    password: this.form.password,
                }).then(response => {
                    localStorage.setItem('id', response.data.user.id);
                    localStorage.setItem('username', response.data.user.username);
                    localStorage.setItem('token', response.data.access_token);
                    this.error_message=response.data.message; 
                    this.color="green";
                    this.snackbar=true;
                    this.progressBar = false;
                    location.href = "/dashboard"
                }).catch(error => {
                    if (error.response.data.message.username)
                        this.error_message= this.error_message + error.response.data.message.username;
                    if (error.response.data.message.password)
                        this.error_message= this.error_message + '\n' + error.response.data.message.password;
                    if(!error.response.data.message.password && !error.response.data.message.username)
                        this.error_message= this.error_message + error.response.data.message;
                    this.color="red"
                    this.snackbar=true;
                    localStorage.removeItem('token')
                    this.progressBar = false;
                });
            }
        }
    }
}
</script>
<style>
@import '../assets/styles/form.css';
.content-login{
    background: linear-gradient(45deg, #0f1288, #3c009d);
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
}

@media (max-height:830px) {
    .content-login{
        overflow-y: scroll;
    }
}

.page_portfolioz {
    margin: 40px;
}
body .portfolio_home__header .number {
    opacity: 1 !important;
    animation: none !important;
}
</style>