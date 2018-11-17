import VideoInfo from '../video-info-component/video-info-component';

export default class Search {
  constructor(id, placeholder) {
    this.options = {
      type: 'video',
      key: 'AIzaSyBaUTvlej9t_88Olyrp3sUtJ3BVjchgWR0',
      maxResults: '15',
    };
    this.url = 'https://www.googleapis.com/youtube/v3/';
    this.data = [];
    this.nextPageToken = '';

    const element = document.createElement('input');
    element.type = 'text';
    element.id = id;
    element.placeholder = placeholder;
    element.addEventListener('keyup', (event) => {
      event.preventDefault();
      if (event.keyCode === 13) {
        document.getElementById(id).onsubmit();
      }
    });
    element.onsubmit = () => {
      const section = document.getElementById('video-section');
      while (section.firstChild) {
        section.removeChild(section.firstChild);
      }
      this.data = [];
      const param = document.getElementById(id).value;
      this.makeReq(param);
    };
    return element;
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
        this.addArticles();
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
  }

  addArticles() {
    this.data.forEach(val => document.getElementById('video-section').appendChild(new VideoInfo(val)));
  }
}
