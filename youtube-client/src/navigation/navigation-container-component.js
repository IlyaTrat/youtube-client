import NavigationButtonComponent from './navigation-button-component';

export default class NavigationContainer {
  constructor(videoInfoSection) {
    this.id = 'page-nav';
    this.element = undefined;
    this.videoInfoSection = videoInfoSection;
    this.numberOfPages = undefined;
    this.pageIndex = 0;
  }

  createElement() {
    this.element = document.createElement('div');
    this.element.id = this.id;

    this.createButtons(this.element, 2);

    document.body.appendChild(this.element);
    this.element = document.getElementById(this.id);
  }

  createButtons(element, span) {
    this.pageIndex = this.videoInfoSection.pageIndex;
    this.numberOfPages = this.videoInfoSection.numberOfPages;
    const leftShift = this.pageIndex - span;
    const rightShift = this.pageIndex + span;
    for (let i = leftShift; rightShift >= i && this.numberOfPages > i; i += 1) {
      if (i >= 0 && i === this.pageIndex) {
        element.appendChild(new NavigationButtonComponent(i, this.videoInfoSection)
          .createElement(i, true));
      } else if (i >= 0) {
        element.appendChild(new NavigationButtonComponent(i, this.videoInfoSection)
          .createElement(i));
      }
    }
  }

  deleteElement() {
    document.body.removeChild(this.element);
  }
}
