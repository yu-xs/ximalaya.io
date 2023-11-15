import axios from 'axios'

// 请求最新音乐数据
export const getNav = async () => {
    let { data } = await axios.get('/api/m-revision/page/index/queryIndexTabContent?moduleKey=tuijian')
    return data.data.moduleContent.tomatoes;
}