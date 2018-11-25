export default class NavigationButtonComponent {
  constructor(pageNumber, videoSection) {
    this.pageNumber = pageNumber;
    this.videoSection = videoSection;
    this.element = undefined;
  }

  createElement(pageNumber, active = false) {
    this.element = document.createElement('button');
    this.element.textContent = pageNumber + 1;
    if (active) {
      this.element.className = 'active';
    }
    this.addEvent(pageNumber);
    return this.element;
  }

  addEvent(pageNumber) {
    this.element.onclick = () => {
      this.videoSection.clearInfoSection();
      this.videoSection.showArticles(this.videoSection.articlesOnPage * pageNumber);
    };
  }
}
