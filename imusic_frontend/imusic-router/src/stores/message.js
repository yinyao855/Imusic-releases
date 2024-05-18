import {computed, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";

// 处理消息的 store
export const useMessageStore = defineStore('message', () => {
    const Message = ref([])

    let unReads = computed(() => {
        return Message.value.filter(item => !item.is_read).length
    })

    // 处理消息类型
    const MessageType1 = ref([]);
    const MessageType2 = ref([]);
    const MessageType4 = ref([]);
    const MessageType6 = ref([]);
    const MessageType7 = ref([]);

    // 处理消息数量
    const Count1 = ref(0);
    const Count2 = ref(0);
    const Count4 = ref(0);
    const Count6 = ref(0);
    const Count7 = ref(0);

    const processMessage = () => {
        console.log("处理消息")
        // console.log(Message.value);
        MessageType1.value = [];
        MessageType2.value = [];
        MessageType4.value = [];
        MessageType6.value = [];
        MessageType7.value = [];
        Count1.value = 0;
        Count2.value = 0;
        Count4.value = 0;
        Count6.value = 0;
        Count7.value = 0;
        for (let i = 0; i < Message.value.length; i++) {
            if (Message.value[i].type === 1) {
                MessageType1.value.push(Message.value[i]);
                Count1.value++;
            } else if (Message.value[i].type === 2) {
                MessageType2.value.push(Message.value[i]);
                Count2.value++;
            } else if (Message.value[i].type === 4) {
                MessageType4.value.push(Message.value[i]);
                Count4.value++;
            } else if (Message.value[i].type === 6) {
                MessageType6.value.push(Message.value[i]);
                Count6.value++;
            } else if (Message.value[i].type === 7) {
                MessageType7.value.push(Message.value[i]);
                Count7.value++;
            }
        }
    }

    // 添加消息
    function setMessage(message) {
        Message.value = message
    }

    // 当Message变化时，处理消息
    watch(Message, processMessage)

    function readMessage(messageId, token) {
        const instance = axios.create({
            baseURL: 'http://182.92.100.66:5000',
            timeout: 5000,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        axios.defaults.withCredentials = true;
        const formData = new FormData();
        formData.append('message_id', messageId);
        instance.post('/messages/read', formData)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    function refreshMessage(token) {
        const instance = axios.create({
            baseURL: 'http://182.92.100.66:5000',
            timeout: 5000, // 设置请求超时时间
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        axios.defaults.withCredentials = true;
        const web = '/messages/';
        instance.get(web)
            .then(response => {
                Message.value = response.data.data;
            })
            .catch(error => {
                console.log(error.response.data);
            })
    }

    return {
        Message,
        setMessage,
        readMessage,
        refreshMessage,
        unReads,
        MessageType1,
        MessageType2,
        MessageType4,
        MessageType6,
        MessageType7,
        Count1,
        Count2,
        Count4,
        Count6,
        Count7
    }
})
