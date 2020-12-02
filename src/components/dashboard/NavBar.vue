<template>
<div>

    <div id="menu">
		<div class="hamburger">
			<div class="line"></div>
			<div class="line"></div>
			<div class="line"></div>
		</div>
		<div class="menu-inner">
			
			<ul>
                <img src="~@/assets/logo/white.png" style="transform: scale(0.45);" />
                <v-list>
                    <v-list-item
                        id="vnavbaritems"
                        v-for="item in items"
                        :key="item.title"
                        link
                        tag="router-link"
                        :to="item.to"
                    >
                        <a><li class="trigger">{{ item.title }}</li></a>
                    </v-list-item>
                </v-list>
                <hr color="#b8b8b8">
				<a @click="confirmlogout"><li class="trigger">Log Out</li></a>
			</ul>
		</div>

		<svg version="1.1" id="blob" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
			<path id="blob-path" d="M60,500H0V0h60c0,0,20,172,20,250S60,900,60,500z"/>
		</svg>
    </div>

    <div class="fullheight">
    <v-progress-linear v-show="progressBar" slot="progress" color="yellow" indeterminate></v-progress-linear>

      <div id="navbartop">
        <div id="navbar-right">
          <div class="dropdown">
                <img v-if="profileImage == ''"
                    src="@/assets/loading.gif"
                    class="mr-2"
                    style="border-radius: 100%; object-fit: cover;"
                    width=40
                    height=40
                />
              <img v-else
                :src="this.profileImage"
                lazy-src="~@/assets/author1.png"
                id="avatar" 
                width=40
                height=40
                class="mr-2" style="border-radius: 100%; object-fit: cover;"/>
              {{this.username}}<span>  ▼</span>
            <div class="dropdown-content">
              <a @click="dashboard"><p>Dashboard</p></a>
              <a @click="profile"><p>Account Settings</p></a>
              <hr color="#c2c2c2">
              <a @click="confirmlogout"><p>Log Out</p></a>
            </div>
          </div>
        </div>
      </div>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
    
    <v-dialog v-model="logoutdialog" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Notice!</span>
            </v-card-title>
            <v-card-text>
                Confirm Logout?
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="white darken-1" text @click="logoutdialog = false;">
                    Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="logout"> 
                    Yes
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>
export default {
    name: "NavBar",
    data(){
        return{
            items: [
                { title: "Dashboard", to: "/dashboard" },
                { title: "Profile", to: "/profile" },
                { title: "Hotel Reservations", to: "/reservations" },
                { title: "Hotel List", to: "/hotels" },
                { title: "Feast Menu", to: "/feasts" },
            ],
            logoutdialog: false,
            username: 'Loading...',
            profileImage: '',
            progressBar: true,
            userform: new FormData,
        }
    },
    methods: {
        confirmlogout() {
            this.logoutdialog = true;
        },
        logout() {
            this.progressBar = true;
            var url = this.$api + '/logout'
            //POST '/logout'
            this.$http.post(url, {}, { //Empty Data
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(() => {
                //Remove Local Token
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('username');
                //Delete Axios Header
                delete this.$http.defaults.headers.common['Authorization'];
                this.progressBar = false;

                //Push Login after logout
                this.$router.push({
                    name: 'login',
                }).then(()=> {
                    location.href="login";
                })
            }).catch(error => {
                //prints error to console
                console.log(error);
                //Remove Local Token
                localStorage.removeItem('token');
                localStorage.removeItem('id');
                localStorage.removeItem('username');
                //Delete Axios Header
                delete this.$http.defaults.headers.common['Authorization'];
                this.progressBar = false;
                this.$router.push({
                    name: 'index',
                }).then(()=> {
                    location.href="index";
                })
            });
        },
        loadData() {
            this.username = localStorage.getItem('username');
            this.$http.get(this.$api + '/userdata', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.username = response.data.userdata.username;
                this.profileImage = response.data.userdata.image;
                this.userform = response.data.userdata;
            });
        },
        dashboard() {
            this.$router.push({
                name: "Dashboard",
            });
        },
        profile() {
            this.$router.push({
                name: "Profile",
            });
        }
    },
    mounted: function(){
        import("@/assets/js/dashnav.js");
        import("@/assets/js/dashnavtop.js");
        if(localStorage.getItem('token') == null) {
            location.href="/index";
        }
        this.loadData();
    },
    watch:{
        userform(){
            this.progressBar = false
            this.loading = false
        }    
    }
}
</script>

<style>
@import '~@/assets/styles/dashboard.css';
@import '~@/assets/styles/dashnavtop.css';
@import '~@/assets/styles/scrollbar.css';
.dropdown {
    font-family: 'Hurme';
}
.profile-section {
    margin: 0 150px;
    background: #171717;
    border-radius: 20px;
    box-shadow: 15px 15px 0px 0px #383838;
}
</style>