import axios from "axios";
import {LyricContent, LyricList} from "@/js/SongDetail.js";
import {TimeStringToSecond} from "@/js/MusicPlayer.js";

export const GetLyrics=(url)=>{
    axios.get(url)
        .then(response=>{
            LyricList.value=[];
            LyricContent.value=response.data;
            const TmpLyricList=LyricContent.value.trim().split('\n');
            for(let i=0;i<TmpLyricList.length;++i){
                let timestamp=TmpLyricList[i].split(']')[0].split('[')[1];
                let content=TmpLyricList[i].split(']')[1];
                let TmpDictionary={};
                TmpDictionary['content']=content;
                TmpDictionary['timestamp']=TimeStringToSecond(timestamp);
                LyricList.value.push(TmpDictionary);
            }
            console.log(LyricList.value);
        })
        .catch(error=>{
            console.log(error);
        })
}