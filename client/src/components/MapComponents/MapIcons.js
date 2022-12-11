import L from 'leaflet';
import '../MapComponents/leaflet.awesome-markers';


// custom icons for the map markers
const startIcon = L.AwesomeMarkers.icon({
    icon: 'play-circle',
    markerColor: 'green',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x',
});
const endIcon = L.AwesomeMarkers.icon({
    icon: 'stop-circle',
    markerColor: 'red',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const refIcon = L.AwesomeMarkers.icon({
    icon: 'info-circle',
    markerColor: 'blue',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const hutIcon = L.AwesomeMarkers.icon({
    icon: 'home',
    markerColor: 'blue',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const parkIcon = L.AwesomeMarkers.icon({
    icon: 'parking',
    markerColor: 'blue',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const newHutIcon = L.AwesomeMarkers.icon({
    icon: 'home',
    markerColor: 'green',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const newParkIcon = L.AwesomeMarkers.icon({
    icon: 'parking',
    markerColor: 'green',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const refIconToConfirm = L.AwesomeMarkers.icon({
    icon: 'info-circle',
    markerColor: 'red',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});
const newRefIcon = L.AwesomeMarkers.icon({
    icon: 'plus-circle',
    markerColor: 'green',
    prefix: 'fa',
    iconColor: 'black',
    extraClasses: 'fas fa-2x'
});


export default { startIcon, endIcon, refIcon, newRefIcon, refIconToConfirm, hutIcon, parkIcon, newHutIcon, newParkIcon}