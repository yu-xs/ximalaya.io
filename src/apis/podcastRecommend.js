import axios from 'axios'

// 请求最新音乐数据
export const getPodcastRecommend = async () => {
    let { data } = await axios.get('/api/podcast-channel-web/api/v2/feed/getTrackFeed?categoryId=1&ts=1699577540152')
    return data;
}