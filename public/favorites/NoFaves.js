import Component from '../Component.js';

class NoFaves extends Component {

    renderHTML() {
        
        return /*html*/`
            <div class="no-faves">
                <div class="no-faves">Please pick some favorites</div>
            </div>
            `;
    }
}

export default NoFaves;