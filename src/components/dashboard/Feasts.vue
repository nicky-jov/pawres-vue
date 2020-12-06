<template>
    <div class="dashboard-content">
        <br><br>
        <br><br>
        <h1 class="text-left ml-5" style="font-size: 75px;">
            <font color="white">Feast Menu</font>
        </h1>
        <h4 class="text-left ml-5">
            <font class="ml-2" color="white" size=6>Apply additional <font color="yellow">feasts</font> into your reservation ticket.</font><br>
        </h4>

        
      <div class="wrap" style="place-content: center; padding: 40px;">

        <div class="tile"> 
          <img draggable="false" :src='images.A'/>
          <div class="text">
          <h1>Category A</h1>
          <h3 class="animate-text">
            Includes:
          </h3>
          <p class="animate-text">3x Meat Lover's Pizza</p>
          <p class="animate-text">3x Garlic Bread</p>
          <p class="animate-text">3x Cola</p>
          </div>
         </div>
        
        
        <div class="tile"> 
          <img draggable="false" :src="images.B"/>
          <div class="text">
          <h1>Category B</h1>
          <h3 class="animate-text">
            Includes:
          </h3>
          <p class="animate-text">2x Shoyu Ramen</p>
          <p class="animate-text">1x Miso</p>
          <p class="animate-text">2x (Hot/Iced) Ocha</p>
          </div>
         </div>
          

          <div class="tile"> 
          <img draggable="false" :src="images.C"/>
          <div class="text">
          <h1>Category C</h1>
          <h3 class="animate-text">
            Includes:
          </h3>
          <p class="animate-text">1x Tenderloin Steak</p>
          <p class="animate-text">1x Orange Juice</p>
          </div>
         </div>
    
    
        </div>

        <div class="card mt-5 table-section">
            <v-card-title>
                <v-spacer></v-spacer>
                <v-icon @click="loadData" class="mr-5">mdi-reload</v-icon>
                <v-btn dark @click="dialog = true; this.loadData();">
                    Add Feast
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
                    :items="feasts" 
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
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-spacer></v-spacer>
                    <v-flex class="text-right">
                        <v-icon color="red" @click="cancel">mdi-close</v-icon>
                    </v-flex>
                </v-card-actions>
                <v-card-title>
                    <span class="headline">{{ inputType }} Feast</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field 
                            v-if="inputType != 'Add'"
                            v-model="editId"
                            label="Order No."
                            outlined
                            disabled
                        ></v-text-field>
                        <v-select
                            v-model="form.resid"
                            label="Reservation ID"
                            :items="reservations"
                            item-text="id"
                            outlined
                            three-line
                            :value="form.resid"
                        >
                        </v-select>
                        <v-select
                            v-model="form.category"
                            label="Category"
                            :items="['A', 'B', 'C']"
                            prefix="Category"
                            outlined
                        >
                        </v-select>
                        <v-select
                            v-model="form.type"
                            label="Type"
                            :items="['Breakfast', 'Lunch', 'Meal']"
                            outlined
                        >
                        </v-select>
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
                    <span class="headline">Feast Details</span>
                </v-card-title>
                <v-card-text>
                    <li>Order No.: <span style="float: right;">{{editId}} </span></li>
                    <li>Reservation ID: <span style="float: right;">{{form.resid}} </span></li>
                    <li>Type: <span style="float: right;">{{form.type}}  </span></li>
                    <li>Category: <span style="float: right;">{{form.category}} </span></li>
                        <font size=2.5>
                            <div v-if="form.category == 'A'">
                                <ol>3x Meat Lover's Pizza <span style="float: right;">Rp. 150000</span></ol>
                                <ol>3x Garlic Bread <span style="float: right;">Rp. 35000</span></ol>
                                <ol>3x Cola <span style="float: right;">Rp. 15000</span></ol>
                            </div>
                            <div v-else-if="form.category == 'B'">
                                <ol>2x Shoyu Ramen <span style="float: right;">Rp. 50000</span></ol>
                                <ol>1x Miso <span style="float: right;">Rp. 15000</span></ol>
                                <ol>2x (Hot/Iced) Ocha <span style="float: right;">Rp. 10000</span></ol>
                            </div>
                            <div v-else>
                                <ol>1x Tenderloin Steak <span style="float: right;">Rp. 135000</span></ol>
                                <ol>1x Orange Juice <span style="float: right;">Rp. 15000</span></ol>
                            </div>
                        </font>
                    <li>Total Price: <span style="float: right;">Rp. {{form.price}} </span></li>
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
        
        <v-flex class="text-right" style="position: fixed; bottom: 20px; right: 20px;">
            <v-progress-circular
            v-show="progressBar"
            indeterminate
            color="amber"
            ></v-progress-circular>
        </v-flex>

        <v-snackbar v-model="snackbar" :color="color" timeout="3000" top>
            <pre>{{error_message}}</pre>
        </v-snackbar>
    </div>
</template>

<script>
export default {
    name: "Feasts",
    data() {
        return {
            search: '',
            feasts: [],
            feast: new FormData,
            reservations: [],
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
                { text: "Order No.",
                    align: "start",
                    sortable: true,
                    value: "id" },
                { text: "Reservation ID", value: "resid" },
                { text: "Category", value: "category" },
                { text: "Type", value: "type" },
                { text: "Price", value: "price" },
                { text: "Actions",
                    sortable: false,
                    value: "actions" },
            ],
            form: {
                resid: '',
                category: '',
                type: '',
                price: '',
            },
            inputType: 'Add',
            progressBar: true,
            loading: true,
            menu: false,
            modal: false,
            menu2: false,
            images: {
                A: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80",
                B: "https://images.unsplash.com/photo-1596699691540-ea34b062cdc0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1886&q=80",
                C: "https://images.unsplash.com/photo-1558030006-450675393462?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1789&q=80",
            }
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
            var url = this.$api + '/feasts';

            if(localStorage.getItem('username') == 'admin')
                url = this.$api + '/feasts/admin'

            this.$http.get(url, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.feasts = response.data.data;
                
            }).catch(()=> {
                this.progressBar = false;
                this.loading = false;
            });

            var url2 = this.$api + '/reservations'

            if(localStorage.getItem('username') == 'admin')
                url2 = this.$api + '/reservations/admin'
            

            this.$http.get(url2, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                } 
            }).then(response => {
                this.reservations = response.data.data;
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
            this.feast.append('resid', this.form.resid);
            this.feast.append('category', this.form.category);
            this.feast.append('type', this.form.type);
            this.error_message='';

            var url = this.$api + '/feasts'
            this.$http.post(url, this.feast, {
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
                if(error.response.data.message.resid)
                    this.error_message= this.error_message + error.response.data.message.resid;
                if(error.response.data.message.category)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.category;
                if(error.response.data.message.type)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.type;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            })
        },
        update() {
            this.progressBar = true;
            let newData = {
                resid: this.form.resid,
                category: this.form.category,
                type: this.form.type,
            }
            var url = this.$api + '/feasts/' + this.editId;
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
                if(error.response.data.message.resid)
                    this.error_message= this.error_message + error.response.data.message.resid;
                if(error.response.data.message.category)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.category;
                if(error.response.data.message.type)
                    this.error_message= this.error_message + '\n'  + error.response.data.message.type;
                this.color="red"
                this.snackbar=true;
                this.progressBar = false;
            }) 
        },
        deleteData() {
            this.progressBar = true;
            var url = this.$api + '/feasts/' + this.deleteId;
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
            this.loadData();
            this.inputType = 'Edit';
            this.editId = item.id;
            this.form.resid = item.resid;
            this.form.category = item.category;
            this.form.type = item.type;
            this.dialog = true;
        },
        detailHandler(item){
            this.editId = item.id;
            this.form.resid = item.resid;
            this.form.category = item.category;
            this.form.type = item.type;
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
            var WinPrint = window.open(this.$public + '/Feasts/'  + this.editId, '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0');
            WinPrint.focus();
            setTimeout(function () { WinPrint.print(); }, 500);
            window.onfocus = function () { setTimeout(function () { WinPrint.close(); }, 500); }
        },
    },
    mounted() {
        this.loadData();
        
        if(localStorage.getItem('username') == 'admin') {
            this.headers.pop();
            this.headers.push({text: "User Id", value: "userid"},
                              {text: "Created At", value: "created_at"},
                              {text: "Updated At", value: "updated_at"},
                              {text: "Actions", sortable: false, value: "actions"},);
        }
    },
    computed: {
      fromDateDisp() {
        return this.fromDateVal;
      },
    },
    watch:{
        feasts(){
            this.progressBar = false
            this.loading = false
        }    
    }
}
</script>

<style scoped>
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
.v-card, .headline {
    font-family: 'Hurme' !important;
}
</style>