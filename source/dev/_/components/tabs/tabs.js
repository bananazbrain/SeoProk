"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

class Tabs {
  selectCurrent(link) {
    var parent = link.parentElement;
    for (let item of parent.children) {
      item.classList.remove(this.classCurrent);
    }
    link.classList.add(this.classCurrent);
    var tab = document.getElementById(link.getAttribute('href').replace('#', ''));
    parent = tab.parentElement;
    for (let item of parent.children) {
      item.classList.remove(this.classCurrent);
    }
    tab.classList.add(this.classCurrent);
  }

  constructor() {
    _defineProperty(this, "classCurrent", '--current');

    _defineProperty(this, "elemLink", '.tabs-link');

    _defineProperty(this, "elemTab", '.tabs-item');

    _defineProperty(this, "elemLinks", '.tabs-links');

    var links = document.querySelectorAll(this.elemLink),
        item = document.querySelectorAll(this.elemTab),
        listList = document.querySelectorAll(this.elemLinks);

    listList.forEach((listListItem) => {
      var links = listListItem.children,
          currentElement = links[0];

      for (let i = 0; i < links.length; i++) {
      	var link = links[i];
        if (link.classList.contains(this.classCurrent)) {
          link = currentElement;
        }
      }

      this.selectCurrent(currentElement);
    });
    links.forEach(link => {
      link.addEventListener('click', event => {
        event.preventDefault();
        if (!link.classList.contains(this.classCurrent)) {
          this.selectCurrent(link);
        }
      });
    });
  }

}

new Tabs();