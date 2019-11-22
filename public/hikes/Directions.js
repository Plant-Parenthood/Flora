import Component from '../Component.js';

class Directions extends Component {

    renderHTML() {
        let directionsHtml = '';
        if (localStorage.getItem('LAT')){
            const { modalHike } = this.props;
            const latOrigin = JSON.parse(localStorage.getItem('LAT'));
            const lonOrigin = JSON.parse(localStorage.getItem('LON'));
    
            directionsHtml = `
                <p>Get Directions</p>
                <a href="https://www.google.com/maps/dir/?api=1&origin=${latOrigin},${lonOrigin}&destination=${modalHike.latitude},${modalHike.longitude}" target="_blank">Car</a>`;
        }
        return `
            <div>
                ${directionsHtml}
            </div>
            `;  
    }
}

export default Directions;