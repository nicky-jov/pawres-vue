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
                    Add Product
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
                    :search="search">
                    <template v-slot:[`item.actions`]="{ item }">
                        <v-icon class="green--text mr-2" @click="editHandler(item)">mdi-pencil</v-icon>
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
                    <span class="headline">{{ formTitle }} Reservation</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                            label="Transaction ID"
                            outlined
                            disabled
                        ></v-text-field>
                        <label class="text-white">Hotel Name</label>
                        <select class="form-control" name="hotel" required>
                            <option disabled>--Select a Hotel--</option>
                            <option selected>Mariott</option>
                            <option>Ibis</option>
                            <option>The Jade</option>
                        </select>
                        <v-menu
                            v-model="fromDateMenu"
                            :close-on-content-click="false"
                            transition="scale-transition"
                        >
                            <v-text-field
                                label="Check-in"
                                prepend-icon="mdi-event"
                                outlined
                                readonly
                                :value="fromDateDisp"
                                v-on="on"
                            ></v-text-field>
                            <v-date-picker
                                locale="en-in"
                                v-model="fromDateVal"
                                @input="fromDateMenu = false"
                                no-title
                            ></v-date-picker>
                        </v-menu>
                        <v-text-field
                            label="Duration"
                            outlined
                        ></v-text-field>
                        <v-text-field
                            label="Rooms"
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
                    Confirm delete reservation?
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
    name: "Reservations",
    data() {
        return {
            search: '',
            reservations: [],
            reservation: new FormData,
            deleteId: '',
            editId: '',
            dialog: false,
            dialogConfirm: false,
            snackbar: false,
            color: "green",
            error_message: '',
            formTitle: '',
            headers: [
                { text: "Transaction ID",
                    align: "start",
                    sortable: true,
                    value: "id" },
                { text: "Hotel Name", value: "hotel" },
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
            },
            inputType: 'Add',
            fromDateVal: null,
            fromDateMenu: true,
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
            var url = this.$api + '/reservations'
            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.reservations = response.data.data
            });
        },
        save() {
            this.product.append('hotel', this.form.hotel);
            this.product.append('checkin', this.form.checkin);
            this.product.append('duration', this.form.duration);
            this.product.append('rooms', this.form.rooms);

            var url = this.$api + '/product/'
            this.load = true
            this.$http.post(url, this.product, {
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
                this.error_message=error.response.data.message;
                this.color="red"
                this.snackbar=true;
            })
        },
        editHandler(item){
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.hotel = item.hotel;
            this.form.checkin = item.checkin;
            this.form.duration = item.duration;
            this.form.rooms = item.rooms;
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
    mounted() {
        this.loadData();
    },
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
      },
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