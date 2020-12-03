<template>
    <div class="dashboard-content">
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
                        <img id="profileImage" v-if="form.profileImage == ''"
                            src="@/assets/loading.gif"
                        />
                        <img id="profileImage" v-else
                            :src="form.profileImage"
                        />
                    </td>
                </th>
                <th>
                    <td class="infobox">
                        <font color="white" size=4>
                            <h1>Account Details</h1>
                            <v-progress-linear v-if="progressBar" v-show="progressBar" slot="progress" color="green" indeterminate></v-progress-linear>
                            <hr color="grey" v-else>
                            <h3>
                                Username: <span style="float: right;">{{form.username}}</span>
                            </h3>
                            <h3>
                                E-mail: <span style="float: right;">{{form.email}}</span>
                            </h3>
                            <h3>
                                Status: <span style="float: right;">
                                            <font class="green--text text--lighten-2" v-if="form.verified != 'Loading...'">Verified <v-icon class="green--text text--lighten-2">mdi-checkbox-marked-circle-outline</v-icon></font>
                                            <font v-else>Loading...</font>
                                        </span>
                            </h3>
                            <h3>
                                Phone Number: <span style="float: right;">{{form.phone}}</span>
                            </h3>
                            <br>
                            <br>
                        </font>
                        <div class="center">
                            <v-btn type="button" 
                                class="btn btn-danger mr-2"
                                data-toggle="modal" 
                                @click="editDialog = true"
                                data-target="#editmodal">Edit Profile
                            </v-btn>
                            <v-btn type="button" 
                                class="btn btn-danger ml-2"
                                data-toggle="modal" 
                                @click="passwordDialog = true"
                                data-target="#editmodal">Change Password
                            </v-btn>
                        </div>
                    </td>
                </th>
            </table>
            <br><br>

            <br>
            <br>
          </div>
        </div>
            <br>
            <br>
            <br>
            <br>

        <v-dialog v-model="editDialog" 
            persistent 
            max-width="600px">
            <v-card>
                <v-card-actions class="text-right">
                    <v-spacer></v-spacer>
                    <v-icon color="red" @click="editDialog = false">mdi-close</v-icon>
                </v-card-actions>
                <v-card-title>
                    <span class="headline" style="font-family: Hurme !important;">Change Picture</span>
                </v-card-title>
                <v-card-actions>
                    <input class="ml-15" type="file" label="File" placeholder="Select file here..." @change='upload_image'>
                </v-card-actions>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn light @click="saveImage">Upload Image</v-btn>
                </v-card-actions>
                
                <v-card-title>
                    <span class="headline" style="font-family: Hurme !important;">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field  
                        v-model="formEdit.username"
                        label="Username"
                        v-if="!isAdmin"
                    ></v-text-field>
                    <v-text-field  
                        v-model="formEdit.phone"
                        label="Phone Number"
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark class="red" @click="editDialog = false">Cancel</v-btn>
                    <v-btn light @click="editDetails">Save Changes</v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="progressBarDialog" slot="progress" color="yellow" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>

        <v-dialog v-model="passwordDialog" 
            persistent 
            max-width="600px">
            <v-card>
                <v-card-actions class="text-right">
                    <v-spacer></v-spacer>
                    <v-icon color="red" @click="passwordDialog = false">mdi-close</v-icon>
                </v-card-actions>
                <v-card-title>
                    <span class="headline" style="font-family: Hurme !important;">Change Password</span>
                </v-card-title>
                <v-card-text>
                    <v-text-field 
                        placeholder="Old Password" 
                        v-model="form.oldpassword"
                        type="password"
                        outlined
                        required
                    ></v-text-field>
                    <v-text-field
                        placeholder="New Password"
                        v-model="form.newpassword"
                        type="password"
                        outlined
                        required
                    ></v-text-field>
                    <v-text-field 
                        placeholder="Confirm Password"
                        v-model="form.confirmpassword"
                        type="password" 
                        outlined
                        required
                    ></v-text-field>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn dark class="red" @click="passwordDialog = false">Cancel</v-btn>
                    <v-btn light @click="changePassword">Apply Changes</v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="progressBarDialog" slot="progress" color="yellow" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>
        
        <v-flex class="text-right" style="position: fixed; bottom: 10px; right: 10px;">
            <v-progress-circular
            v-show="progressBar"
            indeterminate
            color="amber"
            ></v-progress-circular>
        </v-flex>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" top>
            {{error_message}}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            form: {
                username: 'Loading...',
                email: 'Loading...',
                profileImage: '',
                phone: 'Loading...',
                verified: 'Loading...',
                oldpassword: '',
                newpassword: '',
                confirmpassword:'',
            },
            formEdit: {
                username: '',
                phone: '',
            },
            error_message: '',
            snackbar: false,
            color: 'green',
            editDialog: false,
            passwordDialog: false,
            imgData: new FormData,
            progressBar: true,
            progressBarDialog: false,
            userform: new FormData,
            isAdmin: false,
        }
    },
    methods: {
        loadData() {
            this.$http.get(this.$api + '/userdata', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.form.username = response.data.userdata.username;
                this.form.profileImage = response.data.userdata.image;
                this.form.email = response.data.userdata.email;
                this.form.phone = response.data.userdata.phone_number;
                this.form.verified = response.data.userdata.emmail_verified_at;
                this.userform = response.data.userdata;

                this.formEdit.username = this.form.username;
                this.formEdit.phone = this.form.phone;
            }).catch(error => {
                this.error_message = error.response.data.message;
                location.href = 'index';
            })
        },

        changePassword() {
            this.progressBarDialog = true;
            this.$http.post(this.$api + '/change-password' , {
                old_password: this.form.oldpassword,
                new_password: this.form.newpassword,
                confirm_password: this.form.confirmpassword,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then(response => {
                this.error_message=response.data.message; 
                if(this.error_message == "Data was successfully updated") {
                    this.color="green"
                    this.passwordDialog = false;
                    this.form.oldpassword = '';
                    this.form.newpassword = '';
                    this.form.confirmpassword = '';
                    this.progressBarDialog = false;
                    this.loadData();
                }
                else 
                    this.color="red"
                this.snackbar=true;
                this.progressBarDialog = false;
            }).catch(err => {
                this.error_message=err.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.progressBarDialog = false;
            });
        },

        editDetails() {
            this.progressBarDialog = true;
            this.$http.post(this.$api + '/change-details' , {
                username: this.formEdit.username,
                phone_number: this.formEdit.phone,
            }, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then(response => {
                this.error_message=response.data.message; 
                localStorage.removeItem('username');
                localStorage.setItem('username', this.formEdit.username);
                this.color="green";
                this.snackbar=true;
                this.progressBarDialog = false;
                this.editDialog = false;
                this.loadData();
            }).catch(err => {
                this.error_message= '';
                if(err.response.data.message.username)
                    this.error_message=this.error_message + err.response.data.message.username;
                if(err.response.data.message.phone_number)
                    this.error_message=this.error_message + '\n' + err.response.data.message.phone_number;
                this.color="red"
                this.snackbar=true;
                this.progressBarDialog = false;
            });
        },

        upload_image(evt){
            let img_file = evt.target.files[0];
            let reader = new FileReader();

            if (img_file['size'] < 2111775) {
                reader.onloadend = (img_file) => {
                    this.form.image = reader.result;
                }
                this.imgData.append("image", img_file);
                reader.readAsDataURL(img_file);
            } else {
                this.error_message="File cannot be larger than 2MB";
                this.color="red";
                this.snackbar=true;
            }
        },

        saveImage() {
            this.progressBarDialog = true;
            this.$http.post(this.$api + '/upload-image', this.imgData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then(response => {
                this.error_message=response.data.message;
                this.snackbar=true;
                this.progressBarDialog = false;
                this.color="green";
                this.editDialog = false;
                this.loadData();
                location.href = "profile";
            }).catch(err => {
                this.error_message=err.response.data.message;
                this.color="red";
                this.snackbar=true;
                this.progressBarDialog = false;
            });
        }
    },
    mounted() {
        this.loadData();
        import("@/assets/js/dashnavtop.js");
        if(localStorage.getItem('username') == "admin") {
            this.isAdmin = true;
        }
    },
    watch:{
        userform(){
            this.progressBar = false
        }    
    },
}
</script>

<style scoped>

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
* {
    font-family: 'Hurme' !important;
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
    width: 40vw;
    margin-right: 50px;
}
button, input, select, textarea {
    color: gray;
}
.center{text-align: -webkit-center;}
.v-card, .headline {
    font-family: 'Hurme' !important;
}
</style>