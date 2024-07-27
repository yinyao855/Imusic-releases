import axios from 'axios'
import { EditLyricList, LyricContent, LyricList } from '@/js/SongDetail.js'
import { TimeStringToSecond } from '@/js/MusicPlayer.js'

//详情界面的歌词解析
export const GetDetailLyrics = (url) => {
  axios.get(url)
    .then(response => {
      let lyric=[];
      LyricContent.value = response.data
      const TmpLyricList = LyricContent.value.trim().split('\n')
      for (let i = 0; i < TmpLyricList.length; ++i) {
        let timestamp = TmpLyricList[i].split(']')[0].split('[')[1]
        let content = TmpLyricList[i].split(']')[1]
        let TmpDictionary = {}
        TmpDictionary['content'] = content
        TmpDictionary['timestamp'] = TimeStringToSecond(timestamp)
        lyric.push(TmpDictionary)
      }
      LyricList.value=lyric;
    })
    .catch(error => {
      console.log(error)
    })
}

//编辑界面的歌词
export const GetEditLyrics= (url) => {
  axios.get(url)
    .then(response => {
      let lyric=[];
      LyricContent.value = response.data
      const TmpLyricList = LyricContent.value.trim().split('\n')
      for (let i = 0; i < TmpLyricList.length; ++i) {
        let timestamp = TmpLyricList[i].split(']')[0].split('[')[1]
        let content = TmpLyricList[i].split(']')[1]
        let TmpDictionary = {}
        TmpDictionary['content'] = content
        TmpDictionary['timestamp'] = TimeStringToSecond(timestamp)
        lyric.push(TmpDictionary)
      }
      EditLyricList.value=lyric;
      console.log(EditLyricList.value);
    })
    .catch(error => {
      console.log(error)
    })
}