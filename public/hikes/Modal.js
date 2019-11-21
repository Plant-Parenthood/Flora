import Component from '../Component.js';

class Modal extends Component {

    renderHTML() {

        const { modalHike, campgrounds } = this.props;
        const strigifiedModalHike = JSON.stringify(modalHike);
        const strigifiedEmptyObject = JSON.stringify({});
        if (strigifiedModalHike === strigifiedEmptyObject){
            return /*html*/ `
                <div>
                </div>
            `;
        } else {
            return /*html*/ `
            <div>
                <a href="${modalHike.url}" class="modalHike-name"><img src="${modalHike.imgMedium}" onerror="this.onerror=null;this.src='/assets/placeholder-image.png';" alt="${modalHike.name}">${modalHike.name}</a>
                <summary>
                    Length: ${modalHike.length} m.<br>
                    Difficulty: ${modalHike.difficulty}<br>
                    Summary: ${modalHike.summary}
                </summary>
                <section>
                <-- Because we will have many campgrounds we will want another component for campgrounds and do logic to append campground components to the modal component -->
                    Campgrounds: ${JSON.stringify(campgrounds)}
                </section>
            </div>
            `;
        }
    }
}

export default Modal;