import type { NextPage } from 'next';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';

type DimType = {
  width: number,
  height: number
};

const handleScr = async (
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  dim: DimType,
  setImg: Dispatch<SetStateAction<string | undefined>>
) => {
  const context = canvas!.getContext('2d');
  if (dim && dim.width && dim.height) {
    canvas!.width = dim.width;
    canvas!.height = dim.height;
    context?.drawImage(video!, 0, 0, dim.width, dim.height);
    const data = canvas!.toDataURL('image/png');
    const res = await axios.post('/api/', {img: data});
    setImg(res.data.img)
  }
}


const Home: NextPage = () => {
  const [img, setImg] = useState<string>()
  const handleClick = () => {
    if (window) {
      const d = {width: window.screen.availWidth, height: window.screen.availHeight}
      const v = document.createElement('video');
      const c = document.createElement('canvas');
      navigator.mediaDevices.getDisplayMedia()
        .then(function (stream) {
          v.srcObject = stream;
          v.play()
            .then(() => handleScr(c, v, d, setImg))
            .then(() => {
              if ('getTracks' in v.srcObject!) {
                let tracks = v.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                v.srcObject = null;
              }
            })
            .catch(() => {
              if ('getTracks' in v.srcObject!) {
                let tracks = v.srcObject.getTracks();
                tracks.forEach(track => track.stop());
                v.srcObject = null;
              }
            })
        })
        .catch((err) => {
          console.log('An error occurred: ' + err);
        });
    }
  }

  return (
    <div>
      <button type="button" onClick={handleClick}>Send Screenshot</button>
      {img && <img src={img} width="300px" height="300px"/>}
    </div>
  )
}

export default Home
