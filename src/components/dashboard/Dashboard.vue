<template>
    <div class="dashboard-content">
        <br><br><br><br>

        <h1 class="text-left ml-5" style="font-size: 75px;">
            <font color="white">Welcome, {{username}}<font color="yellow">!</font></font>
        </h1>
        
        <div class="modal fade" role="dialog" id="ﾖﾂﾊﾞ"><div class="modal-dialog center"><div class="modal-body"><img id="ysb" style="width: 50vw; float: left; object-fit: cover;"></div></div></div>
        
        <br><br>
        <h4 class="text-left ml-5">
            <font class="ml-2" color="white" size=6>Our Selection</font><br>
            <font class="ml-2" color="white" size=3 style="font-style: italic">Navigate through our features.</font>
        </h4>

        <div class="wrap ml-5">

            <a @click="profile"
              data-cursor-hover>
            <div class="tile"> 
              <img draggable="false" :src='images.profile'/>
              <div class="text">
              <h1>Profile</h1>
              <h3 class="animate-text">Personalize your own profile.</h3>
              <p class="animate-text">You can view and customize your personal information and credentials here.</p>
              <div class="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
             </div>
            </a>
            
            

            <a @click="reservations">
            <div class="tile"> 
              <img :src='images.reservations'/>
              <div class="text">
              <h1>Hotel Reservation</h1>
              <h3 class="animate-text">Reserve a place at your favorite hotel.</h3>
              <p class="animate-text">In this section you can create reservations through our hotel selections.</p>
              <div class="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
             </div>
            </a>
              
            <a @click="hotels">
              <div class="tile"> 
              <img :src='images.hotels'/>
              <div class="text">
              <h1>Hotel List</h1>
              <h3 class="animate-text">Visit our available hotel selections.</h3>
              <p class="animate-text">In this section, you can check out our available hotels that can be selected as a reservation.</p>
              <div class="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
             </div>
            </a>
              
            <a @click="feasts">
              <div class="tile"> 
              <img :src='images.feasts'/>
              <div class="text">
              <h1>Feast Menu</h1>
              <h3 class="animate-text">Browse through our available feast menu.</h3>
              <p class="animate-text">You can browse through our lunch and dinner selection which can be applied towards your reservation ticket here.</p>
            <div class="dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              </div>
             </div>
            </a>
        
        
            </div>

            <br>
            <br>
            <h4 class="text-left ml-5">
                <font class="ml-2" color="white" size=6>What's New? <v-icon>mdi-mailbox</v-icon></font><br>
                <font class="ml-2" color="white" size=3 style="font-style: italic">Check out our latest updates.</font>
            </h4>

            <section class="card-list">
 
                <article class="card-article">
                  <header class="card-header">
                    <p>Nov 18th 2020</p>
                    <h3>We launched a new feature<a data-toggle="modal" href="#ﾖﾂﾊﾞ">!</a></h3>
                    <p>Can you guess what it is?</p>
                  </header>
          
                  <div class="card-author">
                    <a class="author-avatar" href="#">
                        <img src="@/assets/author1.png" />
                    </a>
                    <svg class="half-circle" viewBox="0 0 106 57">
                      <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                    </svg>
          
                    <div class="author-name">
                      <div class="author-name-prefix">Author</div>
                      Axcel Santoso
                    </div>
                  </div>
                  
                  <div class="tags">
                    <a href="#">html</a>
                    <a href="#">java</a>
                    <a href="#">web-dev</a>
                  </div>
                </article>

                
                <article class="card-article">
                    <header class="card-header">
                      <p>Nov 18th 2020</p>
                      <h3>We've created a new website!</h3>
                      <p>With more convenient UI.</p>
                    </header>
            
                    <div class="card-author">
                      <a class="author-avatar" href="#">
                        <img src="@/assets/author1.png" />
                      </a>
                      <svg class="half-circle" viewBox="0 0 106 57">
                        <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                      </svg>
            
                      <div class="author-name">
                        <div class="author-name-prefix">Author</div>
                        Axcel Santoso
                      </div>
                    </div>
                    
                    <div class="tags">
                      <a href="#">html</a>
                      <a href="#">java</a>
                      <a href="#">web-dev</a>
                    </div>
                  </article>

                
                  <article class="card-article">
                      <header class="card-header">
                        <p>Nov 18th 2020</p>
                        <h3>This is my third article in a single day</h3>
                        <p>And I don't really care!</p>
                      </header>
              
                      <div class="card-author">
                        <a class="author-avatar" href="#">
                          <img src="@/assets/author1.png" />
                        </a>
                        <svg class="half-circle" viewBox="0 0 106 57">
                          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                        </svg>
              
                        <div class="author-name">
                          <div class="author-name-prefix">Author</div>
                          Axcel Santoso
                        </div>
                      </div>
                      
                      <div class="tags">
                        <a href="#">html</a>
                        <a href="#">java</a>
                        <a href="#">web-dev</a>
                      </div>
                    </article>

                
                  <article class="card-article">
                      <header class="card-header">
                        <p>Dec 3rd 2020</p>
                        <h3>We launched an API-based platform</h3>
                        <p>And I still don't really care!</p>
                      </header>
              
                      <div class="card-author">
                        <a class="author-avatar" href="#">
                          <img src="@/assets/author1.png" />
                        </a>
                        <svg class="half-circle" viewBox="0 0 106 57">
                          <path d="M102 4c0 27.1-21.9 49-49 49S4 31.1 4 4"></path>
                        </svg>
              
                        <div class="author-name">
                          <div class="author-name-prefix">Author</div>
                          Axcel Santoso
                        </div>
                      </div>
                      
                      <div class="tags">
                        <a href="#">html</a>
                        <a href="#">java</a>
                        <a href="#">web-dev</a>
                      </div>
                    </article>
          
                <!-- Add more cards here -->
          
           </section>
    </div>
</template>

<script>
export default {
    name: "Dashboard",
    data() {
        return {
          username: '',
          images: {
              profile: "https://images.unsplash.com/photo-1485635153370-c97bb55602c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
              reservations: "https://images.unsplash.com/photo-1525905708812-b271b5e3b2f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2001&q=80",
              hotels: "https://images.unsplash.com/photo-1583325981638-776a0aed5375?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
              feasts: "https://images.unsplash.com/photo-1580917109855-6817741b51e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1901&q=80",
          }
        }
    },
    mounted() {
      import("@/assets/js/dashnavtop.js");
      import("@/assets/styles/dashtile.css")
      this.username = localStorage.getItem('username');
      this.loadData();
    },
    watch:{
        $route (to, from){
            import("@/assets/js/dashnavtop.js")
        }
    },
    methods: {
        dashboard() {
            this.$router.push({
                name: "Dashboard",
            });
        },
        profile() {
            this.$router.push({
                name: "Profile",
            });
        },
        reservations() {
            this.$router.push({
                name: "Reservations",
            });
        },
        hotels() {
            this.$router.push({
                name: "Hotels",
            });
        },
        feasts() {
            this.$router.push({
                name: "Feasts",
            });
        },
        loadData() {
          this.$http.get(this.$api + '/userdata', {
              headers: {
                  'Authorization': 'Bearer ' + localStorage.getItem('token')
              } 
          }).then(response => {
              this.username = response.data.userdata.username;
          }).catch(error => {
              this.error_message = error.response.data.message;
              location.href = 'index';
          })
        }
    },
}
</script>


<style scoped>
@import '~@/assets/styles/dashcard.css';
@import '~@/assets/styles/dashtile.css';
.dashboard-content {
  position: absolute;
  margin-right: 5px;
  width: 94.5%;
  height: 100%;
  right: 0;
  margin-left: 100px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.center{text-align: -webkit-center;}
</style>