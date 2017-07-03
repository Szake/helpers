// div.js-cut, p.js-cut

// Main:
let customCut = () => {
    let init = (block) => {

        let text = block.textContent,
            size = block.dataset && Math.abs(block.dataset.size) || 20,
            link = block.dataset && block.dataset.link || 'Read more';

        let index = text.indexOf('.', size - 1);
        if (!~index) { return; }

        // Empty:
        block.innerHTML = '';

        // Main:
        let main_el = document.createElement('span');
            main_el.className = 'main';
            main_el.textContent = text.slice(0, ++index) + ' ';
            block.appendChild(main_el);

        // More:
        let more_el = document.createElement('span');
            more_el.className = 'more';
            more_el.textContent = text.slice(index).trim();
            // console.log('Hidden:', more_el.textContent);

        // Link:
        let link_el = document.createElement('a');
            link_el.setAttribute('href', '#');
            link_el.className = 'link';
            link_el.textContent = link;
            block.appendChild(link_el);

        // Event:
        link_el.addEventListener('click', (e) => {
            e.preventDefault();
            block.replaceChild(more_el, link_el);
        });
    };

    let collection = document.querySelectorAll('.js-cut');
    Array.prototype.forEach.call(collection, (item) => {
        init(item);
    });
};

// Call:
customCut();
