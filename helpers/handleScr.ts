import { Dispatch, SetStateAction } from 'react';
import axios from 'axios';
import { resType } from '../data';

type DimType = {
  width: number,
  height: number
};

const makeAndPostScr = async (
  canvas: HTMLCanvasElement,
  video: HTMLVideoElement,
  dim: DimType,
  setData: Dispatch<SetStateAction<resType | undefined>>
) => {
  const context = canvas!.getContext('2d');
  if (dim && dim.width && dim.height) {
    canvas!.width = dim.width;
    canvas!.height = dim.height;
    context?.drawImage(video!, 0, 0, dim.width, dim.height);
    const data = canvas!.toDataURL('image/png');
    const res = await axios.post('/api/', {img: data});
    setData(res.data);
  }
}

export const handleScr = (setData: Dispatch<SetStateAction<resType | undefined>>) => {
  if (window) {
    const d = {width: window.screen.availWidth, height: window.screen.availHeight}
    const v = document.createElement('video');
    const c = document.createElement('canvas');
    navigator.mediaDevices.getDisplayMedia()
      .then((stream) => {
        v.srcObject = stream;
        v.play()
          .then(() => makeAndPostScr(c, v, d, setData))
          .finally(() => {
            if ('getTracks' in v.srcObject!) {
              let tracks = v.srcObject.getTracks();
              tracks.forEach(track => track.stop());
              v.srcObject = null;
            }
          });
      })
      .catch((err) => {
        console.log('An error occurred: ' + err);
      });
  }
};
