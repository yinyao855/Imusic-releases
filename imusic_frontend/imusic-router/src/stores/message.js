import {computed, ref, watch} from 'vue'
import {defineStore} from 'pinia'
import axios from "axios";

// 处理消息的 store
export const useMessageStore = defineStore('message', () => {
    const Message = ref([])

    let unReads = computed(() => {
        const totalUnreads = ref(0);
        totalUnreads.value = MessageType1.value.filter(item => !item.is_read).length +
            MessageType2.value.filter(item => !item.is_read).length +
            MessageType4.value.filter(item => !item.is_read).length +
            MessageType6.value.filter(item => !item.is_read).length +
            MessageType7.value.filter(item => !item.is_read).length;
        return totalUnreads.value;
    })
    let unReads1 = computed(() => {
        return MessageType1.value.filter(item => !item.is_read).length
    })
    let unReads2 = computed(() => {
        return MessageType2.value.filter(item => !item.is_read).length
    })
    let unReads4 = computed(() => {
        return MessageType4.value.filter(item => !item.is_read).length
    })
    let unReads6 = computed(() => {
        return MessageType6.value.filter(item => !item.is_read).length
    })
    let unReads7 = computed(() => {
        return MessageType7.value.filter(item => !item.is_read).length
    })

    // 处理消息类型
    const MessageType1 = ref([]);
    const MessageType2 = ref([]);
    const MessageType4 = ref([]);
    const MessageType6 = ref([]);
    const MessageType7 = ref([]);
    const tmp = ref([]);

    // 处理消息数量
    const Count1 = ref(0);
    const Count2 = ref(0);
    const Count4 = ref(0);
    const Count6 = ref(0);
    const Count7 = ref(0);


    const ChangeTime = (InputDate) => {
        const date = new Date(InputDate);
        const now = new Date();
        const diff = now - date;

        if (diff < 5 * 60 * 60 * 1000) { // 不超过5小时
            if (diff < 10 * 60 * 1000) { // 不超过10分钟
                return '刚刚';
            } else {
                const minutesDiff = Math.floor(diff / (60 * 1000));
                return `${minutesDiff}分钟前`;
            }
        } else if (diff < 24 * 60 * 60 * 1000) { // 前一天
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `昨天${hours}:${minutes}`;
        } else {
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }


    const processMessage = () => {
        // console.log(Message.value);
        MessageType1.value = [];
        MessageType2.value = [];
        MessageType4.value = [];
        MessageType6.value = [];
        MessageType7.value = [];
        tmp.value = [];
        Count1.value = 0;
        Count2.value = 0;
        Count4.value = 0;
        Count6.value = 0;
        Count7.value = 0;
        for (let i = 0; i < Message.value.length; i++) {
            if (Message.value[i].type === 1) {
                tmp.value.push(Message.value[i]);
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
        for (let i = 0; i < tmp.value.length; ++i) {
            let flag = false;
            for (let j = 0; j < MessageType1.value.length; ++j) {
                if (tmp.value[i].title === MessageType1.value[j].title && tmp.value[i].send_date === MessageType1.value[j].send_date) {
                    flag = true;
                    break;
                }
            }
            if (flag === false) {
                MessageType1.value.push(tmp.value[i]);
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
                console.log("refreshMessage");
                Message.value = response.data.data;
                processMessage();
            })
            .catch(error => {
                console.log(error.response.data);
                console.log("获取消息失败");
                console.log(token);
            })
    }

    async function deleteMessage(messageId, token) {
        const instance = axios.create({
            baseURL: 'http://182.92.100.66:5000',
            timeout: 5000,
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        axios.defaults.withCredentials = true;
        instance.delete('/messages/delete', {
            params: {
                'message_id': messageId
            }
        })
            .then(response => {
                if (response.data !== null && response.data.message === "删除成功") {
                    new Promise(resolve => setTimeout(resolve, 500));
                    refreshMessage(token);
                    console.log(Message.value)
                    return true;
                } else {
                    throw new Error("删除消息失败1");
                    return false;
                }
            })
            .catch(error => {
                refreshMessage(token);
                console.log(error.response.data);
                throw new Error("删除消息失败2");
                return false;
            })
    }

    function getMessage(token) {
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
                const msg = response.data.data;
                setMessage(msg);
                console.log(msg);
            })
            .catch(error => {
                console.log(error.response.data);
            })
    };
    return {
        Message,
        setMessage,
        readMessage,
        refreshMessage,
        getMessage,
        ChangeTime,
        deleteMessage,
        unReads,
        unReads1,
        unReads2,
        unReads4,
        unReads6,
        unReads7,
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
