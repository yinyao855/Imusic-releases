import axios from "axios";
import {LyricContent, LyricList} from "@/js/SongDetail.js";

export const GetLyrics=(url)=>{
    axios.get(url)
        .then(response=>{
            LyricContent.value=response.data;
            const TmpLyricList=LyricContent.value.trim().split('\n');
            console.log(TmpLyricList);
            for(let i=0;i<TmpLyricList.length;++i){
                let timestamp=TmpLyricList[i].slice(1,9);
                let content=TmpLyricList[i].slice(10);
                let TmpDictionary={};
                TmpDictionary['timestamp']=timestamp;
                TmpDictionary['content']=content;
                LyricList.value.push(TmpDictionary);
                console.log(LyricList.value);
            }
        })
        .catch(error=>{
            console.log(error);
        })
}