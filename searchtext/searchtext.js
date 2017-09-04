// MAIN:
class SearchText {

  constructor(searchElement, textElement) {
    this.input = {
      element: searchElement
    };
    this.text = {
      element: textElement,
      content: textElement.innerHTML
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

    let elements = this.text.element.querySelectorAll('*');

    // Find and replace:
    let textSearch = this.input.element.value;
    let textReplace = `<em class="selected">${this.input.element.value}</em>`;

    for (let element of elements) {
      element.innerHTML = element.textContent.split(textSearch).join(textReplace);
    }
  }

  clear(complete = false) {
    complete && (this.input.element.value = '');
    this.text.element.innerHTML = this.text.content;
  }
}

// USAGE:
let searchText = new SearchText(
  document.getElementById('search'),
  document.getElementById('text')
);
