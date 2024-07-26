import instance from "@/js/axios.js";
import {ref} from 'vue'
import {GetLyrics} from "@/js/HandleLyrics.js";

//当前歌曲id
export const SongId = ref(0);
//当前歌曲详细信息
export const SongDetail = ref({});
//是否显示歌曲详情
export const SongDetailVisible = ref(false);
//歌词内容
export const LyricContent = ref('');
//歌词列表
export const LyricList = ref([]);

export const GetSongDetail = () => {
    instance.get('/songs/info/' + SongId.value)
        .then(response => {
            SongDetail.value = response.data.data;
            SongDetail.value.upload_date = SongDetail.value.upload_date.split(' ')[0];
            SongDetail.value.introduction = SongDetail.value.introduction === null ? '无简介' : SongDetail.value.introduction;
            LyricList.value = [];
            LyricContent.value = '';
            GetLyrics(SongDetail.value.lyric);
        })
        .catch(error => {
            console.log(error);
        })
}

export const ShowSongDetail = (id) => {
    console.log(id);
    SongId.value = id;
    SongDetailVisible.value = true;
}
