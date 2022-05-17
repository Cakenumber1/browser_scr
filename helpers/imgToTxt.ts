import axios from 'axios';
import { url, body, config, resType } from '../data'

const parseRes = (res: any) => {
  let ans: string[] = [];
  const data = res.data.results[0].results[0].textDetection.pages[0].blocks;
  if (!res.data.results[0].results[0]) {
    return null
  }
  if (data && data.length) {
    data.forEach((b: any) => {
      b.lines.forEach((l: any) => {
        l.words.forEach((w: any) => {
          ans.push(w.text);
        });
      });
    });
    return ans;
  }
  return null;
};

export const imgToTxt = async (encoded: string) => {
  // @ts-ignore
  const splited = encoded.replace(/^data:image\/\w+;base64,/, "");
  const id = (+new Date).toString(36);
  const _body = body(splited);
  let _res: resType = { id, img: encoded};
  try {
    const res = await axios.post(url, _body, config);
    const parsedRes = parseRes(res);
    if (parsedRes) {
      _res = {..._res, words: parsedRes }
    }
  } catch (e) {
    console.log(e);
  }
  return _res
};

