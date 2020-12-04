<template>
    <div id="content-home">
        <div class='cursor'>
            <div class='cursor_point'></div>
            <div class='cursor_outer'></div>
        </div>
          <div class='portfolio'>
            <div class='portfolio_home'>
              <div style='position: fixed; z-index: -99; width: 2320px; height: 180%; left: 0;top: -38%;'>
               <iframe id="subframe" 
                  frameborder="0" 
                  height="100%" 
                  width="100%" 
                  :src="iframe">
               </iframe>
              </div>
              <div class='portfolio_home__header'>
                <p class="text-right"><font color="yellow">Web Application Development Team 6 presents</font></p>
              </div>
              <div class='portfolio_home__title'>
                <div class='logo'>
                  <img class='first' src='../assets/logo/paw-white.png'>
                  <img class='second' src='../assets/logo/Res-yellow.png'>
                  <br>
                  <div class='page_portfolio'>
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
                                    :to="item.to"
                                >
                                    <a><li class="trigger">{{ item.title }}</li></a>
                                </v-list-item>
                            </v-list>
                        </div>
                      <div class='number text--white'>Web Application Development Team 6 presents</div>
                    </div>
                    <div class='slider_note'>
                      Drag Left or Right to Navigate
                    </div>
                    <div class='portfolio_home__work'>
                      <div class='portfolio_home__header work'>
                        <div class='back'>
                          <img class='trigger' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png'>
                        </div>
                        <div class='logoMain'>
                          <img src='../assets/logo/white-yellow.png'>
                        </div>
                        <div class='nav'>
                            <v-list>
                                <v-list-item
                                    v-for="item in items"
                                    :key="item.title"
                                    link
                                    tag="router-link"
                                    :to="item.to"
                                >
                                    <a><li class="trigger">{{ item.title }}</li></a>
                                </v-list-item>
                            </v-list>
                        </div>
                        <div class='number text--white'>Web Application Development Team 6 presents</div>
                      </div>
                      <div class='slideClone'>
                        <div class='title f'>
                          .01
                          <br>
                          Our Services
                        </div>
                        <div class='image'>
                          <img draggable='false' src='https://images.unsplash.com/photo-1563253814-b3055eafce93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'>
                          <div class='overlay'></div>
                          <div class='cats'>AVAILABLE SERVICES</div>
                          <div class='title'>Services we offer in this platform</div>
                          <div class='cats'>
                            <font color="white" size=4>
                              <ul>- Hotel Reservations</ul>
                              <ul>- List of Hotels</ul>
                              <ul>- Feast Menu</ul>
                            </font>
                          </div>
                        </div>
                      </div>
                      <div class='slideClone' style="display: block;">
                        <div class='title f'>
                          .02
                          <br>
                          Our Team
                        </div>
                        <div class='image'>
                          <img draggable='false' src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'>
                          <div class='overlay'></div>
                          <div class='cats'>ACTIVE MEMBERS</div>
                          <div class='title'>Members who participated on making this project</div>
                          <div class='cats'>
                            <font color="white" size=4>
                              <ul>- Ni Made Desi Handayani / 180709765</ul>
                              <ul>- Axel Benigno Santoso / 180709835</ul>
                              <ul>- Nicky Jovanus / 180709851</ul>
                            </font>
                          </div>
                        </div>
                      </div>
                      <div class='slideClone'>
                        <div class='title f'>
                          .03
                          <br>
                          Our Location
                        </div>
                        <div class='image'>
                          <img draggable='false' src='https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'>
                          <div class='overlay'></div>
                          <div class='cats'>GEOLOCATION</div>
                          <div class='title'>Our Company Location Details</div>
                          <div class='cats'>
                            <MglMap id="map"
                              :accessToken="this.accessToken"
                              :mapStyle.sync="this.mapStyle"
                              :center="this.coordinates"
                              :zoom="12"
                            >
                              <MglMarker :coordinates="coordinates" color="yellow">
                                <MglPopup :style="{'background': '#00000000'}">
                                  <VCard dark>
                                    <div class="ma-2">PAWRes Headquarters is located here!</div>
                                  </VCard>
                                </MglPopup>
                              </MglMarker>
                            </MglMap>
                          </div>
                        </div>
                      </div>
                      <div class='slideClone'>
                        <div class='title f'>
                          .04
                          <br>
                          Contact Us
                        </div>
                        <div class='image'>
                          <img draggable='false' src='https://images.unsplash.com/photo-1463573230746-1049c264?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'>
                          <div class='overlay'></div>
                          <div class='cats'>OUR CONTACT INFO</div>
                          <div class='title'>Check out our contact information</div>
                          <div class='cats'>
                          <font color="white" size=4>
                            <ul>Facebook: Paw Reservations</ul>
                            <ul>Twitter: @pawreservations</ul>
                            <ul>Phone Number: +6202932</ul>
                          </font>
                        </div>
                        </div>
                      </div>
                      <img class='scroll' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png'>
                    </div>
                    <div class='portfolio_home__slider'>
                      <div class='slider_inner'>
                        <div class='slider_inner__slide'>
                          <div class='title'>
                            .01
                            <br>
                            Our Services
                          </div>
                          <div class='image'>
                            <img draggable='false' src='https://images.unsplash.com/photo-1563253814-b3055eafce93?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'>
                            <div class='overlay'></div>
                            <div class='cats'>AVAILABLE SERVICES</div>
                            <div class='title'>Services we offer in this platform</div>
                            <div class='button'>
                              Learn More
                              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png'>
                            </div>
                          </div>
                        </div>
                        <div class='slider_inner__slide'>
                          <div class='title'>
                            .02
                            <br>
                            Our Team
                          </div>
                          <div class='image'>
                            <img draggable='false' src='https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'>
                            <div class='overlay'></div>
                            <div class='cats'>ACTIVE MEMBERS</div>
                            <div class='title'>Members who participated on making this project</div>
                            <div class='button'>
                              Learn More
                              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png'>
                            </div>
                          </div>
                        </div>
                        <div class='slider_inner__slide'>
                          <div class='title'>
                            .03
                            <br>
                            Our Location
                          </div>
                          <div class='image'>
                            <img draggable='false' src='https://images.unsplash.com/photo-1554797589-7241bb691973?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1952&q=80'>
                            <div class='overlay'></div>
                            <div class='cats'>GEOLOCATION</div>
                            <div class='title'>Our Company Location Details</div>
                            <div class='button' id="learn3" onclick="resizeMap()">
                              Learn More
                              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png'>
                            </div>
                          </div>
                        </div>
                        <div class='slider_inner__slide'>
                          <div class='title'>
                            .04
                            <br>
                            Contact Us
                          </div>
                          <div class='image'>
                            <img draggable='false' src='https://images.unsplash.com/photo-1463573230746-1049c264?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80'>
                            <div class='overlay'></div>
                            <div class='cats'>OUR CONTACT INFO</div>
                            <div class='title'>Check out our contact information</div>
                            <div class='button'>
                              Learn More
                              <img src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowbblakc.png'>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <hr>
                <h1>
                  Simplifying intricacies<br>
                  in <span>reservations</span>.
                </h1>
                <img class='trigger' src='https://s3-us-west-2.amazonaws.com/s.cdpn.io/217233/arrowDown.png'>
              </div>
            </div>
          </div>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import { MglMap, MglPopup, MglMarker } from "vue-mapbox";

export default {
    name: "Index",
    components: {
      MglMap,
      MglMarker,
      MglPopup
    },
    data() {
        return {
            accessToken: 'pk.eyJ1Ijoibmlja3lqb3ZhbnVzIiwiYSI6ImNrZnFqc2Z6cTBqamUyeXBiaGNidzljOHEifQ.EmKNctj3vwr2nPn0beNhAQ',
            mapStyle: 'mapbox://styles/mapbox/dark-v9',
            coordinates: [110.416169, -7.779292],
            iframe: "https://youtube.com/embed/RGj1KfeCBws?autoplay=1&start=361&controls=0&showinfo=0&autohide=1&mute=1",
            items: [
                {title: 'About Us', to: "/index"},
                {title: 'Sign Up', to: "/signup"},
                {title: 'Log In', to: "/login"},
            ],
            map: null,
        }
    },
    mounted() {
        let mapboxScript = document.createElement('script')
        mapboxScript.setAttribute('src', 'https://api.mapbox.com/mapbox-gl-js/v1.12.0/mapbox-gl.js')
        document.head.appendChild(mapboxScript)
        new mapboxgl.Map();
    },
    methods: {
      onMapLoaded(event) {
        // in component
        this.map = event.map;
        // or just to store if you want have access from other components
        this.$store.map = event.map;
      },
    },
    created() {
      if (localStorage.getItem('reloaded')) {
          // The page was just reloaded. Clear the value from local storage
          // so that it will reload the next time this page is visited.
          localStorage.removeItem('reloaded');
      } else {
          // Set a flag so that we know not to reload the page twice.
          localStorage.setItem('reloaded', '1');
          location.reload();
      }
    }
}
</script>

<style scoped>
body {
    overflow-y: hidden;
}
.mgl-map-wrapper {
    box-shadow: 0 0 20px 4px black;
    position: absolute;
    right: -380px;
    top: -175px;
    width: 500px;
    height: 400px;
    border: solid;
}
.mapboxgl-canvas {
  width: 100%;
  height: 100%;
  left: 0;
}
.mapboxgl-popup-content {
    background: #00000000 !important;
}
</style>


<!-- <script>
    mapboxgl.accessToken = 'pk.eyJ1Ijoibmlja3lqb3ZhbnVzIiwiYSI6ImNrZnFqc2Z6cTBqamUyeXBiaGNidzljOHEifQ.EmKNctj3vwr2nPn0beNhAQ';
    var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [110.416169, -7.779292],
    zoom: 6,
    });
    
    // create the popup
    var popup = new mapboxgl.Popup({ offset: 20 }).setText(
    'PAWRes Headquarters is located here!'
    );
    
    var marker = new mapboxgl.Marker()
    .setLngLat([110.416169, -7.779292])
    .setPopup(popup)
    .addTo(map);
    
    map.on('load', function () {
        setTimeout(function(){map.resize();}, 100);
    });

    this.map.once('load', () => {
    this.map.resize()
    })

    setTimeout(function(){
    this.map.resize();
    document.querySelector('.mapboxgl-marker').click();
    }, 5000);

    function resizeMap(){
    this.map.resize();
    }
    
</script> -->