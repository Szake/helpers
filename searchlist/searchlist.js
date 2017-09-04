// MAIN:
class SearchList {

  constructor(searchElement, listElement) {
    this.input = {
      element: searchElement
    };
    this.list = {
      element: listElement,
      items: listElement.querySelectorAll('li')
    };
    this.status = false;
    this.search = this.search.bind(this);

    this.initialize();
  }

  initialize() {
    // Break if is connected already:
    if (this.status) return;

    // Highlight:
    this.search();

    // Add listener:
    this.input.element.addEventListener('input', this.search);
    this.status = true;
  }

  destroy() {
    // Clear search:
    this.clear(true);

    // Remove listener:
    this.input.element.removeEventListener('input', this.search);
    this.status = false;
  }

  // Search function:
  search() {
    // Clear search:
    this.clear();

    // Break if search string is empty and place the original content:
    if (!this.input.element.value) return;

    let query = this.input.element.value.toLowerCase();
    let count = 0;

    // Toggle item classname:
    for (let element of this.list.items) {
      if (element.textContent.toLowerCase().indexOf(query) !== -1) {
        element.classList.add('selected');
        count++;
      }
      else {
        element.classList.remove('selected');
      }
    }

    // Toggle list classname:
    this.list.element.classList.add(count ? 'found' : 'not-found');
  }

  clear(complete = false) {
    complete && (this.input.element.value = '');

    this.list.element.classList.remove('found');
    this.list.element.classList.remove('not-found');
    
    for (let element of this.list.items) {
      element.classList.remove('selected');
    }
  }
}

// USAGE:
let searchList = new SearchList(
  document.getElementById('search'),
  document.getElementById('list')
);
