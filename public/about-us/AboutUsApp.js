import Component from '../Component.js';
import Header from '../common/Header.js';
import Footer from '../common/Footer.js';

// !!!
// TO-DO STILL! MODIFY THIS FOR PLANT APP! DELETE THIS LINE ONCE DONE!
// !!!

class AboutUsApp extends Component {

    onRender(dom) {
        const header = new Header();
        dom.prepend(header.renderDOM());

        const footer = new Footer();
        dom.appendChild(footer.renderDOM());
    }

    renderHTML() {
        return /*html*/`
            <div>
                <!-- header goes here -->
                <main>
                    <ul>
                        <li>Tess</li>
                        <li>Tali</li>
                        <li>Dan</li>
                        <li>Brittany</li>
                        <li>Lisa</li>
                        <li>JBJ</li>
                    </ul>
                </main>
                <!-- footer goes here -->
            </div>
        `;
    }
}

export default AboutUsApp;