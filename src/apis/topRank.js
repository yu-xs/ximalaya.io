import axios from 'axios'

// 请求最新音乐数据
export const getTopNav = async () => {
    let { data } = await axios.get('/api/revision/rank/v4/rankTabs?sceneId=1')
    return data.data;
}