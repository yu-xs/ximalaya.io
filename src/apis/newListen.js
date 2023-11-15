import axios from 'axios'

// 请求最新音乐数据
export const getNewlisten = async () => {
    let { data } = await axios.get('/api/revision/category/v2/albums?pageNum=1&pageSize=6&sort=1')
    return data.data;
}