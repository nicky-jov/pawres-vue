<template>
    <div class="dashboard-content">
        <br><br>
        <br><br>
        <h1 class="text-left ml-5" style="font-size: 75px;">
            <font color="white">Hotel Reservations</font>
        </h1>

        <div class="card mt-5 table-section">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-btn dark @click="dialog = true">
                    Add Reservation
                </v-btn>
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
                    :items="reservations" 
                    :loading="loading"
                    :search="search">
                    <v-progress-linear v-show="progressBar" slot="progress" color="red" indeterminate></v-progress-linear>
                    <template v-slot:[`item.duration`]="{ item }">
                        {{item.duration}} night(s)
                    </template>
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon class="green--text mr-2" @click="detailHandler(item)">mdi-text-box-search</v-icon>
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
                    <span class="headline">{{ inputType }} Reservation</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field 
                            v-if="inputType != 'Add'"
                            v-model="editId"
                            label="Transaction ID"
                            outlined
                            disabled
                        ></v-text-field>
                        <v-select
                            v-model="form.hotel"
                            label="Hotel Name"
                            :items="hotels"
                            item-text="name"
                            outlined
                            three-line
                            :value="form.hotel"
                        >
                        </v-select>
                        <v-menu
                            ref="menu"
                            v-model="menu"
                            :close-on-content-click="false"
                            :return-value.sync="date"
                            transition="scale-transition"
                            offset-y
                            min-width="290px"
                        >
                            <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                                v-model="date"
                                label="Check-in"
                                prepend-icon="mdi-calendar"
                                readonly
                                outlined
                                v-bind="attrs"
                                v-on="on"
                            ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="date"
                                no-title
                                scrollable
                            >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(date)"
                            >
                                OK
                            </v-btn>
                            </v-date-picker>
                        </v-menu>
                        <v-text-field
                            label="Duration"
                            v-model="form.duration"
                            suffix="night(s)"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Rooms"
                            v-model="form.rooms"
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
                <v-card-title>
                    <span class="headline">Reservation Details</span>
                </v-card-title>
                <v-card-text>
                    <li>Transaction ID: <span style="float: right;">{{editId}} </span></li>
                    <li>Hotel Name: <span style="float: right;">{{form.hotel}} </span></li>
                    <li>Check-in Date: <span style="float: right;">{{form.checkin}} </span></li>
                    <li>Duration: <span style="float: right;">{{form.duration}} night(s) </span></li>
                    <li>Rooms: <span style="float: right;">{{form.rooms}} </span></li>
                    <li>Price: <span style="float: right;">Rp. {{form.price}} </span></li>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red darken-1" text @click="dialogDetails = false">
                        Close
                    </v-btn>
                    <v-btn color="white darken-1" text @click="printDetails">
                        Print
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
    name: "Reservations",
    data() {
        return {
            search: '',
            reservations: [],
            reservation: new FormData,
            hotels: [],
            userform: new FormData,
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
                { text: "Transaction ID",
                    align: "start",
                    sortable: true,
                    value: "id" },
                { text: "Hotel Name", value: "hotelname" },
                { text: "Check-in", value: "checkin" },
                { text: "Duration", value: "duration" },
                { text: "Rooms", value: "rooms" },
                { text: "Actions", value: "actions" },
            ],
            form: {
                hotel: '',
                checkin: '',
                duration: '',
                rooms: '',
                price: '',
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
            this.progressBar = true;
            var url = this.$api + '/reservations'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.reservations = response.data.data;
            }).catch(()=> {
                this.progressBar = false;
                this.loading = false;
            });

            var url2 = this.$api + '/hotels'
            this.$http.get(url2, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.hotels = response.data.data;
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
        save() {
            this.progressBar = true;
            this.reservation.append('hotelname', this.form.hotel);
            this.reservation.append('checkin', this.date);
            this.reservation.append('duration', this.form.duration);
            this.reservation.append('rooms', this.form.rooms);
            this.error_message='';

            var url = this.$api + '/reservations'
            this.$http.post(url, this.reservation, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            }).then(response => {
                this.error_message=response.data.message;
                this.color="green"
                this.snackbar=true;
                this.close();
                this.loadData();
                this.progressBar = false;
                this.resetForm();
            }).catch(error => {
                if(error.response.data.message.hotelname)
                    this.error_message= this.error_message + error.response.data.message.hotelname;
                if(error.response.data.message.checkin)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.checkin;
                if(error.response.data.message.duration)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.duration;
                if(error.response.data.message.rooms)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.rooms;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            })
        },
        update() {
            this.progressBar = true;
            let newData = {
                hotelname: this.form.hotel,
                checkin: this.form.checkin,
                duration: this.form.duration,
                rooms: this.form.rooms,
            }
            var url = this.$api + '/reservations/' + this.editId;
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
            }) 
        },
        deleteData() {
            this.progressBar = true;
            var url = this.$api + '/reservations/' + this.deleteId;
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
        editHandler(item){
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.hotel = item.hotelname;
            this.form.checkin = item.checkin;
            this.form.duration = item.duration;
            this.form.rooms = item.rooms;
            this.dialog = true;
        },
        detailHandler(item){
            this.editId = item.id;
            this.form.hotel = item.hotelname;
            this.form.checkin = item.checkin;
            this.form.duration = item.duration;
            this.form.rooms = item.rooms;
            this.form.price = item.price;
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
                hotel: '',
                checkin: '',
                duration: '',
                rooms: '',
            };
        },
        printDetails() {
            var today = new Date();
            var dd = String(today.getDate()).padStart(2, '0');
            var mm = String(today.getMonth() + 1).padStart(2, '0');
            var yyyy = today.getFullYear();
            today = mm + '/' + dd + '/' + yyyy;
            var WinPrint = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
            WinPrint.document.write(`
            <div style="width: 100%; text-align: -webkit-center; font-family: system-ui;">
            <div style="width: 100%; height: 100%; box-shadow: 0 0 0 2px #7c7c7c;">
            <br><div style="float: left;"><img src="https://pawres.s3.us-east-2.amazonaws.com/logo-black.png" 
            style="height: 50px; margin-left: 50px;"/></div>
            <br><br><br>
            <h1>PawRes - Reservations Details</h1><hr width="84%" color="black">
            <br><div style="width: 80vw; text-align: left;">
            Username: `,this.username,`
            <span style="float: right;">Transaction ID: `,this.editId, `<br>
            Date: `, today, `</span></div><br><br>
            <table border="0" cellpadding="10" style="width: 80vw;" >
            <tbody style="border: none;">
                <tr>
                    <th style="text-align: left;">Hotel Name:</th>
                    <td style="text-align: right;">`, this.form.hotel,`</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Check-in Date:</th>
                    <td style="text-align: right;">`, this.form.checkin,`</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Duration:</th>
                    <td style="text-align: right;">`, this.form.duration ,` nights</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Rooms:</th>
                    <td style="text-align: right;">`, this.form.rooms, `</td>
                </tr>
                <tr>
                    <th style="text-align: left;">Price:</th>
                    <td style="text-align: right;"> Rp. `, this.form.price, `</td>
                </tr>
            </tbody></table><br><br></div></div>`);
            WinPrint.document.close();
            WinPrint.focus();
            setTimeout(function () { WinPrint.print(); }, 500);
            window.onfocus = function () { setTimeout(function () { WinPrint.close(); }, 500); }
        },
    },
    mounted() {
        this.loadData();
    },
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
      },
    },
    watch:{
        reservations(){
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