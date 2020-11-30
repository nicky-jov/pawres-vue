<template>
    <div class="dashboard-content-profile">
        <br>
      <br>
      <br>
      <br>
      <h1 class="text-left ml-5" style="font-size: 75px;">
          <font color="white">Profile</font>
      </h1>

      <div class="card mt-5 profile-section">
          <div class="card-body">
            <br>
            <br>
            <table>
                <th>
                    <td>
                        <img id="profileImage" src="https://images.unsplash.com/photo-1511298521967-cefc9f26ec55?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1942&q=80"/>
                    </td>
                </th>
                <th>
                    <td class="infobox">
                        <font color="white" size=4>
                            <h1>Account Details</h1>
                            <hr color="grey">
                            <h3>
                                Username: <span style="float: right;">User</span>
                            </h3>
                            <h3>
                                E-mail: <span style="float: right;">useremail@mail.com</span>
                            </h3>
                            <h3>
                                Status: <span style="float: right;"><font color="lightgreen">Verified ✓</font></span>
                            </h3>
                            <h3>
                                Phone Number: <span style="float: right;">08123123123123</span>
                            </h3>
                            <br>
                            <br>
                        </font>
                        <div class="center">
                            <button type="button" 
                                class="btn btn-light"
                                data-toggle="modal" 
                                data-target="#editmodal">Edit Profile
                            </button>
                        </div>
                    </td>
                </th>
            </table>
            <br><br>

            <br>
            <br>
          </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {

        }
    },
    methods: {
        loadData() {
            this.$http.get(this.$api + '/userdata', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.username = response.data.userdata.username;
                this.profileImage = response.data.userdata.image;
            });
        },
    },
    mounted() {
        this.loadData();
        import("@/assets/js/dashnavtop.js");
    },
    watch:{
        $route (to, from){
            import("@/assets/js/dashnavtop.js")
        }
    },
}
</script>

<style scoped>

.dashboard-content-profile {
  position: absolute;
  margin-right: 5px;
  width: 94.5%;
  height: 100%;
  right: 0;
  margin-left: 100px;
  overflow-y: scroll;
  overflow-x: hidden;
}
.profile-section {
    margin: 0 150px;
    background: #171717;
    border-radius: 20px;
    box-shadow: 15px 15px 0px 0px #383838;
}
#profileImage {
    margin: 0 50px;
    width: 400px;
    height: 400px;
    object-fit: cover;
    border-radius: 100%;
    border: solid 5px white;
    box-shadow: 0 0 20px 0px black;
}
.infobox {
    width: 100%;
    margin-right: 50px;
}
.center{text-align: -webkit-center;}
</style>