import VideoInfo from './video-info-component';

export default class VideoSection {
  constructor(data) {
    this.data = JSON.parse(JSON.stringify(data));
    this.element = undefined;
    this.currentIndex = 0;
    this.articlesOnPage = 0;
    this.pageIndex = 0;
    this.mouseStartPosition = 0;
    this.mouseEndPosition = 0;

    this.down = (downEvent) => {
      this.mouseStartPosition = downEvent.pageX;
    };
    this.move = (moveEvent) => {
      this.mouseEndPosition = moveEvent.pageX;
    };
    this.up = () => {
      if (this.mouseStartPosition < this.mouseEndPosition) {
        if (this.currentIndex < this.data.length - this.articlesOnPage) {
          this.currentIndex += this.articlesOnPage;
          this.clearInfoSection();
          this.showArticles(this.currentIndex);
        }
      } else if (this.mouseStartPosition > this.mouseEndPosition) {
        if (this.currentIndex >= this.articlesOnPage) {
          this.currentIndex -= this.articlesOnPage;
          this.clearInfoSection();
          this.showArticles(this.currentIndex);
        } else {
          this.currentIndex = 0;
          this.clearInfoSection();
          this.showArticles(this.currentIndex);
        }
      }
    };
  }

  createElement() {
    this.element = document.createElement('section');
    this.element.id = 'video-section';

    document.body.appendChild(this.element);
    this.element = document.getElementById('video-section');
    this.addMouseEvent();
  }

  setData(data) {
    this.data = JSON.parse(JSON.stringify(data));
  }

  showArticles(startIndex) {
    const windowWidth = window.innerWidth;
    this.articlesOnPage = Math.floor(windowWidth / (320 + 40 * 2)) || 1;
    const endIndex = startIndex + this.articlesOnPage;
    for (let i = startIndex; i < endIndex; i += 1) {
      this.element.appendChild(new VideoInfo(this.data[i]).createElement());
    }
  }

  clearInfoSection() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
  }

  addMouseEvent() {
    this.element.addEventListener('mousedown', this.down);
    this.element.addEventListener('mousemove', this.move);
    this.element.addEventListener('mouseup', this.up);
  }
}
