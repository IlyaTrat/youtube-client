import Search from './search/search-component';
import VideoSection from './video-info/video-info-section-component';

const section = new VideoSection({});
const search = new Search('search', 'Input text', section);
section.setSearch(search);

search.createElement();
section.createElement();
