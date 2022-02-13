import React, { useState, useEffect } from 'react';
import './app.module.css';
import styles from './app.module.css';
import Search_header from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const search = (query) => {
    youtube
      .search(query) //
      .then((videos) => setVideos(videos));
  };

  // useEffect(): 컴포넌트가 마운트되었거나 업데이트 되었을 때마다 콜백함수를 호출
  // 두번째 인자를 전달하지 않으면 state나 props이 업데이트 될 때마다, 텅텅빈 배열(,[])을 전달하면 마운트될 때 한 번만, 배열에 인자를 전달하면 해당 값이 업데이트 될 때 호출
  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, []);

  return (
    <div className={styles.app}>
      <Search_header onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
