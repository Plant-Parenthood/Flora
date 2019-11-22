import Component from '../Component.js';

class Directions extends Component {

    renderHTML() {
        if (navigator.geolocation){
            const { modalHike } = this.props;
            let latOrigin;
            let lonOrigin;
            let directionsHtml;

            const getCurrentLocation = () => {
                return new Promise((resolve, reject) => {
                    navigator.geolocation.getCurrentPosition(function(pos){
                        latOrigin = pos.coords.latitude;
                        lonOrigin = pos.coords.longitude;
                        resolve({ latOrigin, lonOrigin });
                    });
                });
            };

            const loadLocation = async() => {
                try {
                    location = await getCurrentLocation();
                }
                catch (err) {
                    alert(`Sorry, we couldn't get your location.`);
                    console.log(err);
                }
            };
            loadLocation();
            directionsHtml = `
                <p>Get Directions</p>
                <a href="https://www.google.com/maps/dir/?api=1&origin=${latOrigin},${lonOrigin}&destination=${modalHike.latitude},${modalHike.longitude}" target="_blank">Car</a>`;

            return `
                <div>
                    ${directionsHtml}
                </div>
                `;
        }
    }
}

export default Directions;