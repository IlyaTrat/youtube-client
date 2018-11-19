import Search from './search-component';
import VideoSection from './video-info-section-component';

const section = new VideoSection({});
const search = new Search('search', 'Input text', section);

document.body.appendChild(search.createElement());
section.createElement();
console.log(section);
// document.body.appendChild(section.createElement());
