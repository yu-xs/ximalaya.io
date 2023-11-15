import axios from 'axios'

// 请求最新音乐数据
export const getDayhotAndLimitfree = async () => {
    let { data } = await axios.get('/api/web-site/main/page')
    return data.data;
}