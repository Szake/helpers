// DATA:
let data = {
  class: 'animals',
  title: 'Animals list',
  list: [{
    mark: '',
    name: 'Cat',
    value: '48', 
  },{
    mark: '',
    name: 'Dog',
    value: '12', 
  },{
    mark: '',
    name: 'Parrot',
    value: '36', 
  }]
};

// MAIN:
class List {

  constructor(holder, data) {
    this.data = data;
    this.holder = holder;

    // Status accepts: 
    //    - true(initialized),
    //    - false(not initialized or destroyed)
    this.status = false;

    this.initialize();
  }

  initialize() {

    // Break if the list is filled:
    if (this.status) return;

    // console.log('Create the list.');

    // Create classname:
    this.classname = this.data.class || 'data';

    // Create title:
    if (this.data.title) {

      let titleElement = document.createElement('div');
          titleElement.className = this.classname + '-title';
          titleElement.textContent = this.data.title;

      this.holder.appendChild(titleElement);
      this.title = {
        element: titleElement,
        content: this.data.title
      };
    }

    // Create list:
    if (this.data.list) {

      let listElement = document.createElement('ul');
          listElement.className = this.classname + '-list';

      this.holder.appendChild(listElement);
      this.list = {
        element: listElement,
        content: []
      };
    }

    // Fill in the list:
    if (this.data.list.length) {

      this.data.list.forEach((item) => {

        let itemElement = document.createElement('li');
            itemElement.className = this.classname + '-list-item';

        let itemContent = [];

        // Fill in the list item:
        for (let key in item) {
          let unitElement = document.createElement('span');
              unitElement.className = this.classname + '-list-item-' + key;
              unitElement.textContent = item[key];

          itemElement.appendChild(unitElement);
          itemContent.push({
            element: unitElement,
            content: item[key]
          });
        }

        this.list.element.appendChild(itemElement);
        this.list.content.push({
          element: itemElement,
          content: itemContent
        });
      });
    }

    // Update status:
    this.status = true;
  }

  update(newData) {
    if (!newData) return;

    // console.log('Update the list.');

    // Update with new data:
    this.data = newData;

    // Rebuild the list:
    this.destroy();
    this.initialize(newData);
  }

  destroy() {
    // console.log('Destroy the list.');

    // Clear HTML content:
    this.holder.innerHTML = '';

    // Remove not original properties:
    delete this.classname;
    delete this.title;
    delete this.list;

    // Update status:
    this.status = false;
  }
};

// USAGE:
let list = new List(document.getElementById('animals'), data);
console.log(list);
