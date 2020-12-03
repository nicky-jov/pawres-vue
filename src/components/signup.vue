<template>
    <div class="content-signup">
        <v-progress-linear v-show="progressBar" slot="progress" color="purple" indeterminate></v-progress-linear>
        <div class='portfolio mb-20'>
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
                            :to=item.to
                        >
                            <a><li class="trigger">{{ item.title }}</li></a>
                        </v-list-item>
                    </v-list>
                </div>
                    <div class='number text--white'>Web Application Development Team 6 presents</div>
                </div>

                <div class="text-center">
                    <font color="white">
                    <h1 class="titleform" style="display:none;">Sign up now<font color="yellow">!</font></h1>
                    <br>
                    <h3 class="textform" style="display:none;">Join us by entering your <font color="yellow">personal information</font> here.</h3>
                    </font>
                </div>
            </div>
            <v-form v-model="valid" ref="form">
                <div class="signup mt-5" style="display: none;">
                    <label class="text-white">Username</label>
                    <input type="text" 
                        placeholder="Username" 
                        v-model="form.username"
                        :rules=rules.username
                        required>
                    <label class="text-white">E-mail Address</label>
                    <input type="text" 
                        placeholder="E-mail Address" 
                        v-model="form.email" 
                        :rules=rules.email
                        required>
                    <label class="text-white">Phone Number</label>
                    <input type="number" 
                        placeholder="Phone Number" 
                        v-model="form.phone" 
                        :rules=rules.phone
                        required>
                    <label class="text-white">Password</label>
                    <input type="password" 
                        placeholder="Password" 
                        v-model="form.password" 
                        :rules=rules.password
                        required>
                    <v-btn class="trigger" @click=register>Sign Up</v-btn>
                </div>
            </v-form>
            <br><br>
        </div>
        <br><br>
        <v-snackbar v-model="snackbar" :color="color" timeout="3000" top>
            <pre>{{error_message}}</pre>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "signup",
    data() {
        return {
            items: [
                {title: 'About Us', to: "/index"},
                {title: 'Sign Up', to: "/signup"},
                {title: 'Log In', to: "/login"},
            ],
            valid: false,
            snackbar: false,
            error_message: '',
            form: {
                username: '',
                email: '',
                phone: '',
                password: '',
            },
            rules: {
                username: [ (v) => !!v || 'Username is empty',],
                email: [ (v) => !!v || 'Email Address is empty',],
                phone: [ (v) => !!v || 'Phone Number is empty',],
                password: [ (v) => !!v || 'Password is empty',],
            },
            progressBar: false,
        }
    },
    methods: {
        register() {
            this.progressBar = true;
            if (this.$refs.form.validate()) { 
                this.error_message = ''
                this.$http.post(this.$api + '/register', {
                    username: this.form.username,
                    email: this.form.email,
                    phone_number: this.form.phone,
                    password: this.form.password,
                }).then(response => {
                    this.error_message=response.data.message; 
                    this.color="green"
                    this.snackbar=true;
                    this.progressBar = false;
                    this.clear();
                }).catch(error => {
                    if (error.response.data.message.username)
                        this.error_message=this.error_message + error.response.data.message.username;
                    if (error.response.data.message.email)
                        this.error_message=this.error_message + '\n' + error.response.data.message.email;
                    if (error.response.data.message.phone_number)
                        this.error_message=this.error_message + '\n' + error.response.data.message.phone_number;
                    if (error.response.data.message.password)
                        this.error_message=this.error_message + '\n' + error.response.data.message.password;
                    this.color="red"
                    this.snackbar=true;
                    this.progressBar = false;
                })
            }
        },
        clear() {
            this.$refs.form.reset();
        }
    },
    mounted() {
        import('../assets/js/formAni.js');
    },
}
</script>
<style>
@import '../assets/styles/form.css';

.content-signup{
    background: linear-gradient(45deg, #0f1288, #3c009d);
    width: 100%;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
}

@media (max-height:830px) {
    .content-signup{
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