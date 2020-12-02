<template>
    <div class="dashboard-content">
        <br><br>
        <br><br>
        <h1 class="text-left ml-5" style="font-size: 75px;">
            <font color="white">Hotel List</font>
        </h1>

        <div class="card mt-5 table-section">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark @click="dialog = true">
                    Add Hotel
                </v-btn>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    width="0px"
                    class="ml-5 mr-3"
                ></v-text-field>
            </v-card-title>
            <v-card class="ma-6">
                <v-data-table :headers="headers" 
                    :items="hotels" 
                    :loading="loading"
                    :search="search">
                    <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon class="blue--text mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
                        <v-icon class="red--text ml-2" @click="deleteHandler(item.id)">mdi-delete</v-icon>
                    </template> 
                </v-data-table>
            </v-card>
            <br><br>
        </div>
        <br><br>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">{{ inputType }} Hotel</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            label="Hotel Name"
                            v-model="form.name"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Address"
                            v-model="form.address"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Contact"
                            v-model="form.contact"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Rooms"
                            v-model="form.rooms"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Price per night"
                            v-model="form.price"
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
            </v-card>
        </v-dialog>
        
        <v-dialog v-model="dialogConfirm" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Delete Confirmation</span>
                </v-card-title>
                <v-card-text>
                    Confirm delete Hotel?
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
            </v-card>
        </v-dialog>

        <v-snackbar v-model="snackbar" :color="color" timeout="2000" top>
            {{error_message}}
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "hotels",
    data() {
        return {
            search: '',
            hotels: [],
            hotel: new FormData,
            userform: new FormData,
            deleteId: '',
            editId: '',
            dialog: false,
            dialogConfirm: false,
            snackbar: false,
            color: "green",
            error_message: '',
            formTitle: '',
            headers: [
                { text: "Hotel Name", value: "name" },
                { text: "Address", value: "address" },
                { text: "Contact", value: "contact" },
                { text: "Rooms", value: "rooms" },
                { text: "Price per night", value: "price" },
                { text: "Actions", value: "actions" },
            ],
            form: {
                name: '',
                address: '',
                contact: '',
                rooms: '',
                price: '',
            },
            inputType: 'Add',
            fromDateVal: null,
            fromDateMenu: true,
            progressBar: true,
            loading: true,
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
            var url = this.$api + '/hotels'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.hotels = response.data.data
            });

            this.$http.get(this.$api + '/userdata', {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.userform = response.data.userdata;
            }).catch(error => {
                this.error_message = error.response.data.message;
                location.href = 'index';
            })
        },
        save() {
            this.hotel.append('name', this.form.name);
            this.hotel.append('address', this.form.address);
            this.hotel.append('contact', this.form.contact);
            this.hotel.append('rooms', this.form.rooms);
            this.hotel.append('price', this.form.price);
            this.error_message='';

            var url = this.$api + '/hotels'
            this.load = true
            this.$http.post(url, this.hotel, {
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
            }).catch(error => {
                if(error.response.data.message.name)
                    this.error_message= this.error_message + error.response.data.message.name;
                if(error.response.data.message.address)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.address;
                if(error.response.data.message.contact)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.contact;
                if(error.response.data.message.rooms)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.rooms;
                if(error.response.data.message.price)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.price;
                this.color="red"
                this.snackbar=true;
            })
        },
        update() {
            let newData = {
                name: this.form.name,
                address: this.form.address,
                contact: this.form.contact,
                rooms: this.form.rooms,
                price: this.form.price,
            }
            var url = this.$api + '/hotels/' + this.editId;
            this.load = true
            this.$http.put(url, newData, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.close();
                this.loadData();
                this.resetForm();
                this.inputType = 'Add';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            }) 
        },
        deleteData() {
            var url = this.$api + '/hotels/' + this.deleteId;
            this.$http.delete(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.load = false;
                this.close();
                this.loadData();
                this.resetForm();
                this.inputType = 'Add';
            }).catch(error => {
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
                this.load = false;
            })
        },
        editHandler(item){
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.name = item.name;
            this.form.address = item.address;
            this.form.contact = item.contact;
            this.form.rooms = item.rooms;
            this.form.price = item.price;
            this.dialog = true;
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
                hotel: '',
                checkin: '',
                duration: '',
                rooms: '',
            };
        },
    },
    created() {
        this.loadData();
    },
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
      },
    },
    watch:{
        userform(){
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
.center{text-align: -webkit-center;}
#search, #add{
    float: right;
    margin-bottom: 20px;
}
#search { 
    width: 30%;
    margin: 0 20px;
}

</style>