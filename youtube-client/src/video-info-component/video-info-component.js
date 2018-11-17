export default class VideoInfoComponent {
  constructor(options) {
    this.options = JSON.parse(JSON.stringify(options));
    this.article = document.createElement('article');
    this.header = document.createElement('header');
    this.publisherContainer = document.createElement('div');
    this.publishDateContainer = document.createElement('div');
    this.viewCountContainer = document.createElement('div');
    this.description = document.createElement('p');

    this.article.className = 'video-info';
    this.article.style.width = options.thumbnails.medium.width.toString().concat('px');
    this.fillHeader(this.header);
    this.fillPublisherContainer(this.publisherContainer);
    this.fillPublishDateContainer(this.publishDateContainer);
    this.fillViewCountContainer(this.viewCountContainer);
    this.fillDescription();

    this.article.appendChild(this.header);
    this.article.appendChild(this.publisherContainer);
    this.article.appendChild(this.publishDateContainer);
    this.article.appendChild(this.viewCountContainer);
    this.article.appendChild(this.description);
    return this.article;
  }

  fillHeader(header) {
    const image = document.createElement('img');
    const imageLink = document.createElement('a');
    image.src = this.options.thumbnails.medium.url;
    image.alt = 'Thumbnails image';
    imageLink.href = 'https://www.youtube.com/watch?v='.concat(this.options.videoId);
    imageLink.textContent = this.options.title;
    header.appendChild(image);
    header.appendChild(imageLink);
  }

  fillPublisherContainer(publisherContainer) {
    const publisherIcon = document.createElement('i');
    const publisher = document.createElement('span');
    publisherIcon.className = 'fas fa-user';
    publisher.className = 'publisher';
    publisher.textContent = this.options.channelTitle;
    publisherContainer.appendChild(publisherIcon);
    publisherContainer.appendChild(publisher);
  }

  fillPublishDateContainer(publishDateContainer) {
    const publishDateIcon = document.createElement('i');
    const publishDate = document.createElement('span');
    publishDateIcon.className = 'far fa-calendar-alt';
    publishDate.className = 'publish-date';
    publishDate.textContent = new Date(this.options.publishedAt).toLocaleDateString();
    publishDateContainer.appendChild(publishDateIcon);
    publishDateContainer.appendChild(publishDate);
  }

  fillViewCountContainer(viewCountContainer) {
    const viewCountIcon = document.createElement('i');
    const viewCount = document.createElement('span');
    viewCountIcon.className = 'far fa-eye';
    viewCount.className = 'view-count';
    viewCount.textContent = this.options.viewCount;
    viewCountContainer.appendChild(viewCountIcon);
    viewCountContainer.appendChild(viewCount);
  }

  fillDescription() {
    this.description.className = 'description';
    this.description.textContent = this.options.description;
  }
}
