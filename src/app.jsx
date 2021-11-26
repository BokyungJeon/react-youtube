import React, { useState, useEffect } from "react";
import "./app.css";
import VideoList from "./components/video_list/video_list";

function App() {
  const [videos, setVideos] = useState([]);

  // 컴포넌트가 마운트되었거나 업데이트 되었을 때마다 콜백함수를 호출
  // 두번째 인자를 전달하지 않으면 state나 props이 업데이트 될 때마다, 텅텅빈 배열을 전달하면 마운트될 때 한 번만, 배열에 인자를 전달하면 해당 값이 업데이트 될 때 호출
  useEffect(() => {
    const requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch(
      "https://youtube.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=25&key=AIzaSyBruCY03m-YwYtRr8Pd5M1dx9B-viLcN30",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => setVideos(result.items))
      .catch((error) => console.log("error", error));
  }, []);

  return <VideoList videos={videos} />;
}

export default App;
