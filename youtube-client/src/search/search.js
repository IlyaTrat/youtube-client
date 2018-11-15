export default class Search {
  constructor(id, placeholder) {
    this.options = {
      key: 'AIzaSyBaUTvlej9t_88Olyrp3sUtJ3BVjchgWR0',
      maxResults: '15',
      part: 'snippet',
    };
    this.url = new URL('https://www.googleapis.com/youtube/v3/search');

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
      const param = document.getElementById(id).value;
      this.makeReq(param);
    };
    return element;
  }

  makeReq(param) {
    this.options.q = param;
    Object.keys(this.options).forEach((val) => {
      this.url.searchParams.set(val, this.options[val]);
    });
    fetch(this.url).then(res => res.json().then(data => console.log(data.items)));
  }
}
