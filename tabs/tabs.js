// .js-tabs
//    -> .js-tabs__head
//       -> ul
//          -> li
//              -> a[href="#tab_No"]
//    -> .js-tabs__body
//        -> ul
//           -> li[id="tab_No"]

let customTabs = () => {
    let class_active = '-state_active',
        class_expand = '-state_expanded';

    let filter = (list, type) => {
        if (!list || !list.length || !type) { return []; }
        return Array.prototype.filter.call(list, (item) => {
                return item.tagName.toLowerCase() === type;
            });
    };
    let init = (block) => {
        let block_h = block.querySelector('.js-tabs__head'),
            block_c = block.querySelector('.js-tabs__body');
        if (!block_h || !block_c) { return; }

        // Lists:
        let block_h_ul = filter(block_h.children, 'ul')[0],
            block_c_ul = filter(block_c.children, 'ul')[0];
        if (!block_h_ul || !block_c_ul) { return; }

        // Items:
        let block_h_li = filter(block_h_ul.children, 'li'),
            block_c_li = filter(block_c_ul.children, 'li');
        if (!block_h_li.length || !block_c_li.length) { return; }

        // Event:
        block_h_ul.addEventListener('click', (e) => {
            e.preventDefault();

            let link = e.target,
                link_href = link.getAttribute('href'),
                link_wrap = link.parentElement,
                content = block_c.querySelector(link_href);

            if (link.tagName.toLowerCase() !== 'a' || !link_href || link_wrap.tagName.toLowerCase() !== 'li') { return; }

            if (link_wrap.classList.contains(class_active)) {
                block.classList.toggle(class_expand);
                return;
            }

            // Change url hash:
            location.hash = link_href;

            // Heading:
            block_h_li.forEach((li) => {
                if (li === link_wrap) { li.classList.add(class_active); }
                else { li.classList.remove(class_active); }
                block.classList.remove(class_expand); // close list
            });

            // Content:
            block_c_li.forEach((li) => {
                if (li === content) { li.classList.add(class_active); }
                else { li.classList.remove(class_active); }
            });
        });
    };

    // Loop:
    let collection = document.querySelectorAll('.js-tabs');
    Array.prototype.forEach.call(collection, (item) => {
        init(item);
    });
};

customTabs();
