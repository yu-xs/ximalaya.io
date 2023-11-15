import axios from 'axios'

export const getsearchNav = async () => {
    let { data } = await axios.get('/api/hotWordBillboardCategory')
    return data;

}
// export const getsearchList = async () => {
//     let { data } = await axios.get('/api/hotWordBillboard/list/2.0?categoryId=-1&size=24')
//     return data;
// }
