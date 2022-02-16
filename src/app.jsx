import React, { useState, useEffect, useCallback } from 'react';
import './app.module.css';
import styles from './app.module.css';
import SearchHeader from './components/search_header/search_header';
import VideoDetail from './components/video_detail/video_detail';
import VideoList from './components/video_list/video_list';

function App({ youtube }) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const selectVideo = (video) => {
    setSelectedVideo(video);
  };

  // useCallback()
  // 두번째 인자를 전달하지 않으면 계속 업데이트, 텅빈 배열(, [])을 전달하면 한 번 만들어 동일한 오브젝트를 계속 사용
  // 메모리에 콜백을 계속 보관하므로 써야할 때(콜백을 전달받은 자식 컴포넌트의 re-render방지)만 사용(단순 div, button 이벤트 처리에 등록하는 콜백 경우 사용X)
  const search = useCallback(
    (query) => {
      setSelectedVideo(null);
      // 스피너 추가 가능
      youtube
        .search(query) //
        .then((videos) => {
          setVideos(videos);
        });
    },
    [youtube]
  );

  // useEffect(): 컴포넌트가 마운트되었거나 업데이트 되었을 때마다 콜백함수를 호출
  // 두번째 인자를 전달하지 않으면 state나 props이 업데이트 될 때마다, 텅텅빈 배열(,[])을 전달하면 마운트될 때 한 번만, 배열에 인자를 전달하면 해당 값이 업데이트 될 때 호출
  useEffect(() => {
    youtube
      .mostPopular() //
      .then((videos) => setVideos(videos));
  }, [youtube]);

  return (
    <div className={styles.app}>
      <SearchHeader onSearch={search} />
      <section className={styles.content}>
        {selectedVideo && (
          <div className={styles.detail}>
            <VideoDetail video={selectedVideo} />
          </div>
        )}
        <div className={styles.list}>
          <VideoList videos={videos} onVideoClick={selectVideo} display={selectedVideo ? 'list' : 'grid'} />
        </div>
      </section>
    </div>
  );
}

export default App;
