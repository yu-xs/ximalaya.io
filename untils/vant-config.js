import { Search, Lazyload, Image as VanImage, Swipe, SwipeItem, CountDown, Icon, Tab, Tabs, Sidebar, SidebarItem } from 'vant';

export default {
    install(Vue) {
        Vue.use(Search);
        Vue.use(Lazyload);
        Vue.use(VanImage);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
        Vue.use(CountDown);
        Vue.use(Icon);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(Sidebar);
        Vue.use(SidebarItem);
    }
}