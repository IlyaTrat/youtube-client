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
    this.videoInfoSection = section;
    this.data = [];
    this.nextPageToken = undefined;
    this.request = undefined;
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
      if (event.key === 'Enter') {
        document.getElementById(this.id).onsubmit();
      }
    });
    element.onsubmit = () => {
      this.videoInfoSection.clearInfoSection();
      this.data = [];
      this.nextPageToken = undefined;
      this.request = document.getElementById(this.id).value;
      this.initSearch(this.request);
    };

    elementContainer.appendChild(elementIcon);
    elementContainer.appendChild(element);
    document.body.appendChild(elementContainer);
  }

  makeReq(param) {
    return new Promise((resolve) => {
      let tempData;
      const url = new URL(this.url.concat('search'));
      this.options.part = 'snippet';
      this.options.q = param;
      Object.keys(this.options).forEach((val) => {
        url.searchParams.set(val, this.options[val]);
      });
      if (typeof this.nextPageToken !== 'undefined') {
        url.searchParams.set('pageToken', this.nextPageToken);
      }
      fetch(url).then(res => res.json()
        .then((data) => {
          tempData = data;
          this.nextPageToken = tempData.nextPageToken;
          this.handleReq(tempData.items);
        })
        .then(() => {
          this.makeSubReq(tempData.items.map(val => val.id.videoId).join(','))
            .then(resolve);
        }));
    });
  }

  makeSubReq(videos) {
    return new Promise((resolve) => {
      const url = new URL(this.url.concat('videos'));
      this.options.part = 'statistics';
      this.options.id = videos;
      Object.keys(this.options).forEach((val) => {
        url.searchParams.set(val, this.options[val]);
      });
      fetch(url).then(res => res.json()
        .then((data) => {
          const position = this.data.length - data.items.length;
          data.items.forEach((val, ind) => {
            this.data[position + ind].viewCount = val.statistics.viewCount;
          });
        }))
        .then(() => this.videoInfoSection.setData(this.data))
        .then(resolve);
    });
  }

  initSearch(param) {
    this.makeReq(param).then(() => {
      this.videoInfoSection.showArticles(0);
    });
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
  }
}
