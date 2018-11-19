export default class VideoInfoComponent {
  constructor(options) {
    this.options = JSON.parse(JSON.stringify(options));
  }

  createElement() {
    const article = document.createElement('article');
    const header = document.createElement('header');
    const publisherContainer = document.createElement('div');
    const publishDateContainer = document.createElement('div');
    const viewCountContainer = document.createElement('div');
    const description = document.createElement('p');

    article.className = 'video-info';
    article.style.gridTemplateColumns = this.options.thumbnails.medium.width.toString().concat('px');
    this.fillHeader(header);
    this.fillPublisherContainer(publisherContainer);
    this.fillPublishDateContainer(publishDateContainer);
    this.fillViewCountContainer(viewCountContainer);
    this.fillDescription(description);

    article.appendChild(header);
    article.appendChild(publisherContainer);
    article.appendChild(publishDateContainer);
    article.appendChild(viewCountContainer);
    article.appendChild(description);

    return article;
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

  fillDescription(description) {
    const desc = description;
    desc.className = 'description';
    desc.textContent = this.options.description;
  }
}
