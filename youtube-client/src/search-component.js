export default class Search {
  constructor(id, placeholder, section) {
    this.options = {
      type: 'video',
      key: 'AIzaSyBaUTvlej9t_88Olyrp3sUtJ3BVjchgWR0',
      maxResults: '15',
    };
    this.id = id;
    this.placeholder = placeholder;
    this.url = 'https://www.googleapis.com/youtube/v3/';
    this.section = section;
    this.data = [];
    this.nextPageToken = '';
    this.currentIndex = 0;
    this.articlesOnPage = 0;
    this.pageIndex = 0;
    this.mouseStartPosition = 0;
    this.mouseEndPosition = 0;
  }

  createElement() {
    const elementContainer = document.createElement('div');
    const elementIcon = document.createElement('label');
    const element = document.createElement('input');

    elementContainer.className = 'search-bar-container';

    elementIcon.className = 'fas fa-search';
    elementIcon.htmlFor = this.id;

    element.type = 'text';
    element.id = this.id;
    element.placeholder = this.placeholder;
    element.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById(this.id).onsubmit();
      }
    });
    element.onsubmit = () => {
      this.section.clearInfoSection();
      this.data = [];
      const param = document.getElementById(this.id).value;
      this.makeReq(param);
    };
    window.addEventListener('resize', () => {
      this.section.clearInfoSection();
      this.section.showArticles(this.currentIndex);
    });

    elementContainer.appendChild(elementIcon);
    elementContainer.appendChild(element);
    return elementContainer;
  }

  makeReq(param) {
    const url = new URL(this.url.concat('search'));
    this.options.part = 'snippet';
    this.options.q = param;
    Object.keys(this.options).forEach((val) => {
      url.searchParams.set(val, this.options[val]);
    });
    fetch(url).then(res => res.json()
      .then((data) => {
        this.nextPageToken = data.nextPageToken;
        this.handleReq(data.items);
        this.makeSubReq(data.items.map(val => val.id.videoId).join(','));
      }));
  }

  makeSubReq(videos) {
    const url = new URL(this.url.concat('videos'));
    this.options.part = 'statistics';
    this.options.id = videos;
    Object.keys(this.options).forEach((val) => {
      url.searchParams.set(val, this.options[val]);
    });
    fetch(url).then(res => res.json()
      .then((data) => {
        data.items.forEach((val, ind) => {
          this.data[ind].viewCount = val.statistics.viewCount;
        });
        this.section.showArticles(0);
      }));
  }

  handleReq(data) {
    data.forEach((value) => {
      const result = {
        videoId: value.id.videoId,
        publishedAt: value.snippet.publishedAt,
        title: value.snippet.title,
        description: value.snippet.description,
        channelTitle: value.snippet.channelTitle,
        thumbnails: value.snippet.thumbnails,
      };
      this.data.push(result);
    });
    this.section.setData(this.data);
  }
}
