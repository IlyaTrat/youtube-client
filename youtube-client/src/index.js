import Search from './search/search';

const search = new Search('search', 'Input text');
const videoSection = document.createElement('section');
videoSection.id = 'video-section';
document.body.appendChild(search);
document.body.appendChild(videoSection);
