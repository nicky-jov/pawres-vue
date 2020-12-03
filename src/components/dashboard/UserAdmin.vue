<template>
    <div class="dashboard-content">
        <br><br>
        <br><br>
        <h1 class="text-left ml-5" style="font-size: 75px;">
            <font color="white">User Management</font>
        </h1>

        <div class="card mt-5 table-section">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    class="ml-5 mr-3"
                ></v-text-field>
            </v-card-title>
            <v-card class="ma-6">
                <v-data-table :headers="headers" 
                    :items="users" 
                    :loading="loading"
                    :search="search">
                    <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
                    <template v-slot:[`item.image`]="{ item }">
                        <img id="profileImage"
                            :src="item.image"
                            width=40
                            height=40
                            style="border-radius: 100%; object-fit: cover;"
                        />
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon class="green--text mr-2" @click="detailHandler(item)">mdi-text-box-search</v-icon>
                        <v-icon v-if="item.username != 'admin'" class="blue--text mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                        <v-icon v-if="item.username != 'admin'" class="red--text ml-2" @click="deleteHandler(item.id)">mdi-delete</v-icon>
                    </template> 
                </v-data-table>
            </v-card>
            <br><br>
        </div>
        <br><br>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-flex class="text-right">
                        <v-icon color="red" @click="cancel">mdi-close</v-icon>
                    </v-flex>
                </v-card-actions>
                <v-card-title>
                    <span class="headline">{{ inputType }} Reservation</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field 
                            v-if="inputType != 'Add'"
                            v-model="editId"
                            label="User ID"
                            outlined
                            disabled
                        ></v-text-field>
                        <v-card-actions>
                            <input class="ml-15" type="file" label="File" placeholder="Select file here..." @change='upload_image'>
                        </v-card-actions>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn light @click="saveImage">Upload Image</v-btn>
                        </v-card-actions>
                        <br>
                        <v-text-field
                            label="Username"
                            v-model="form.username"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="E-mail Address"
                            v-model="form.email"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Phone Number"
                            v-model="form.phone_number"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Password"
                            type="password"
                            v-model="form.password"
                            outlined
                        ></v-text-field>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="cancel">
                        Cancel
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="setForm">
                        Save
                    </v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="progressBar" slot="progress" color="blue" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogConfirm" persistent max-width="600px">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-flex class="text-right">
                        <v-icon color="red" @click="dialogConfirm = false">mdi-close</v-icon>
                    </v-flex>
                </v-card-actions>
                <v-card-title>
                    <span class="headline">Delete Confirmation</span>
                </v-card-title>
                <v-card-text>
                    Do you really want to delete this data?
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="dialogConfirm = false">
                        Cancel
                    </v-btn>
                    <v-btn color="red darken-1" text @click="deleteData"> 
                        Delete
                    </v-btn>
                </v-card-actions>
                <v-flex>
                    <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
                </v-flex>
            </v-card>
        </v-dialog>

        <v-dialog v-model="dialogDetails" persistent max-width="600px">
            <v-card>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-flex class="text-right">
                        <v-icon color="red" @click="dialogDetails = false">mdi-close</v-icon>
                    </v-flex>
                </v-card-actions>
                <v-card-title>
                    <span class="headline">User Details</span>
                </v-card-title>
                <v-card-text class="text-center">
                    <img id="profileImage"
                        :src="form.image"
                        width=200
                        height=200
                        style="border-radius: 100%; object-fit: cover; border: solid 3px white;"
                    />
                </v-card-text>
                <v-card-text>
                    <li>User ID: <span style="float: right;">{{editId}} </span></li>
                    <li>Username: <span style="float: right;">{{form.username}} </span></li>
                    <li>Phone Number: <span style="float: right;">{{form.phone_number}} </span></li>
                    <li>Verified At: <span style="float: right;">{{form.verified_at}} </span></li>
                    <li>Registered At: <span style="float: right;">{{form.created_at}} </span></li>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="white darken-1" text @click="dialogDetails = false">
                        Close
                    </v-btn>
                </v-card-actions>
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
    name: "Reservations",
    data() {
        return {
            search: '',
            users: [],
            hotels: [],
            userform: new FormData,
            imgData: new FormData,
            username: '',
            deleteId: '',
            editId: '',
            dialog: false,
            dialogConfirm: false,
            dialogDetails: false,
            snackbar: false,
            color: "green",
            error_message: '',
            formTitle: '',
            headers: [
                { text: "User Id",
                    align: "start",
                    sortable: true,
                    value: "id" },
                { text: "Image", value: "image" },
                { text: "Username", value: "username" },
                { text: "E-mail Address", value: "email" },
                { text: "Phone Number", value: "phone_number" },
                { text: "Verified At", value: "email_verified_at" },
                { text: "Registration Date", value: "created_at" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            form: {
                image: '',
                username: '',
                phone_number: '',
                email_verified_at: '',
                created_at: '',
                password: '',
            },
            inputType: 'Add',
            progressBar: true,
            loading: true,
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
        }
    },
    methods: {
        setForm() {
            if (this.inputType === 'Add') {
                this.save()
            } else {
                this.update()
            }
        },
        loadData() {
            if(localStorage.getItem('username') != 'admin') {
                this.$router.push({
                    name: 'Dashboard',
                })
            }

            this.progressBar = true;
            var url = this.$api + '/users/admin'

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.users = response.data.users;
                
            }).catch(()=> {
                this.progressBar = false;
                this.loading = false;
            });

            this.$http.get(this.$api + '/userdata', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.userform = response.data.userdata;
                this.username = response.data.userdata.username;
            }).catch(error => {
                this.error_message = error.response.data.message;
                location.href = 'index';
            })
        },
        update() {
            this.progressBar = true;
            let newData = {
                username: this.form.username,
                email: this.form.email,
                phone_number: this.form.phone_number,
                password: this.form.password,
            }
            var url = this.$api + '/updatebyid/' + this.editId;
            this.$http.put(url, newData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.close();
                this.loadData();
                this.resetForm();
                this.progressBar = false;
                this.inputType = 'Add';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            });
        },
        deleteData() {
            this.progressBar = true;
            var url = this.$api + '/deletebyid/' + this.deleteId;
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.close();
                this.loadData();
                this.resetForm();
                this.progressBar = false;
                this.inputType = 'Add';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            })
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
            this.$http.post(this.$api + '/imagebyid/' + this.editId, this.imgData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                },
            }).then(response => {
                this.error_message=response.data.message;
                this.snackbar=true;
                this.progressBarDialog = false;
                this.color="green";
                this.loadData();
            }).catch(err => {
                this.error_message=err.response.data.message;
                this.color="red";
                this.snackbar=true;
                this.progressBarDialog = false;
            });
        },
        editHandler(item){
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.image = item.image;
            this.form.username = item.username;
            this.form.email = item.email;
            this.form.phone_number = item.phone_number;
            this.form.verified_at = item.email_verified_at;
            this.form.created_at = item.created_at;
            this.dialog = true;
        },
        detailHandler(item){
            this.editId = item.id;
            this.form.image = item.image;
            this.form.username = item.username;
            this.form.email = item.email;
            this.form.phone_number = item.phone_number;
            this.form.verified_at = item.email_verified_at;
            this.form.created_at = item.created_at;
            this.dialogDetails = true;
        },
        deleteHandler(id){
            this.deleteId = id;
            this.dialogConfirm = true;
        },
        close() {
            this.dialog = false
            this.dialogConfirm = false
            this.inputType = 'Add';
        },
        cancel() {
            this.resetForm();
            this.loadData();
            this.dialog = false;
            this.inputType = 'Add';
        },
        resetForm() {
            this.form = {
                image: '',
                username: '',
                phone_number: '',
                email_verified_at: '',
                created_at: '',
                password: '',
            };
        },
    },
    mounted() {
        this.loadData();
    },
    watch:{
        users(){
            this.progressBar = false
            this.loading = false
        }    
    }
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
    font-family: 'Hurme';
}
.table-section {
    margin: 0 150px;
    background: #171717;
    border-radius: 20px;
    box-shadow: 15px 15px 0px 0px #383838;
}
.v-card { 
    font-family: 'Hurme';
}
.center{text-align: -webkit-center;}
#search, #add{
    float: right;
    margin-bottom: 20px;
}
#search { 
    width: 30%;
    margin: 0 20px;
}
button, input, select, textarea {
    color: gray;
}
.v-card, .headline {
    font-family: 'Hurme' !important;
}
</style>