import React, { useState, useEffect } from 'react';
import './app.module.css';
import styles from './app.module.css';
import Search_header from './components/search_header/search_header';
import VideoList from './components/video_list/video_list';

function App() {
  const [videos, setVideos] = useState([]);
  const search = (query) => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=25&q=${query}&type=video&key=AIzaSyAweiE4NNaNubCRbDfdNtVARJK2H4sYuIU`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => result.items.map((item) => ({ ...item, id: item.id.videoId })))
      .then((items) => setVideos(items))
      .catch((error) => console.log('error', error));
  };

  // useEffect(): 컴포넌트가 마운트되었거나 업데이트 되었을 때마다 콜백함수를 호출
  // 두번째 인자를 전달하지 않으면 state나 props이 업데이트 될 때마다, 텅텅빈 배열(,[])을 전달하면 마운트될 때 한 번만, 배열에 인자를 전달하면 해당 값이 업데이트 될 때 호출
  useEffect(() => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyBruCY03m-YwYtRr8Pd5M1dx9B-viLcN30',
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log('error', error));
  }, []);

  return (
    <div className={styles.app}>
      <Search_header onSearch={search} />
      <VideoList videos={videos} />
    </div>
  );
}

export default App;
