<template>
  <div class="topRank">
    <!-- 搜索页面 -->
    <transition name="slide-up">
      <div class="searchPage" v-show="searchShow">
        <SearchContent
          :seachShow="searchShow"
          @searchViewShow="searchViewShow"
        />
      </div>
    </transition>
    <!-- 顶部nav -->
    <div class="topNav">
      <div class="search">
        <div class="logo" @click="goHome"></div>
        <van-search
          shape="round"
          background="transparent"
          placeholder="搜索"
          @click.stop="showSearchPage"
        />
      </div>
      <van-tabs>
        <van-tab v-for="i in topNav" :key="i.id" :title="i.name">
          <ul class="sideBar">
            <li
              :id="item.rankingId"
              v-for="item in i.tabWraps"
              :key="item.rankingId"
              @click="getIndex(item)"
              ref="myLis"
            >
              <div class="li-active" v-show="liActive === item.rankingId"></div>
              {{ item.name }}
            </li>
          </ul>
          <ul class="topRankContent">
            <TopRankContent :topBarId="i.id" :sideBarId="liActive" />
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SearchContent from "@/components/SearchContent.vue";
import TopRankContent from "../components/TopRankContent";
import { getTopNav } from "../apis/topRank";

export default {
  data() {
    return {
      topNav: [],
      liActive: null,
      searchShow: false,
    };
  },
  methods: {
    goHome() {
      this.$router.replace({ path: "/" });
    },
    getIndex(item) {
      this.liActive = item.rankingId;
      console.log(this.liActive);
      console.log(this.$refs.myLis[0].getAttribute("id"));
    },
    // 判断搜索页面展示
    showSearchPage() {
      console.log("显示搜索页面");
      this.searchShow = true;
    },
    searchViewShow(i) {
      this.searchShow = i;
    },
  },
  async mounted() {
    let { tabLists } = await getTopNav();

    this.topNav = tabLists;

    this.liActive = tabLists[0].tabWraps[0].rankingId;
    console.log(this.topNav);
  },
  components: {
    TopRankContent,
    SearchContent,
  },
};
</script>

<style lang="scss" scoped>
// 搜索页面样式开始
.slide-up-enter-active,
.slide-up-leave-active {
  transition: transform 0.3s ease;
}
.slide-up-enter,
.slide-up-leave-to {
  transform: translateY(100%);
}

.searchPage {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: white;
  z-index: 999;
}
// 搜索页面样式结束

.topNav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  .search {
    height: 50px;
    display: flex;
    align-items: center;
    // background-color: cadetblue;
    .logo {
      background: url("../assets/logo.webp") no-repeat -54px -14px;
      width: 127px;
      height: 29px;
      transform: translateX(-10px) scale(0.55);
    }
    .van-search {
      transform: translateX(-55px) scale(0.9);
    }
  }

  .van-tabs {
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid rgba(204, 204, 204, 0.3);
  }

  .sideBar {
    height: 100vh;
    position: fixed;
    top: 95px;
    overflow: hidden;
    overflow-y: scroll;
    background-color: #f3f4f5;

    li {
      position: relative;
      width: 72.5px;
      color: #72727b;
      font-size: 14px;
      line-height: 20px;
      padding: 15px 0;
      border-bottom: 1px solid #d7d7d7;
    }
    .li-active {
      content: "";
      position: absolute;
      left: 0;
      top: 50%;
      transform: translateY(-50%);
      width: 5px;
      height: 50px;
      background-color: #f86442;
    }
  }

  .topRankContent {
    padding-left: 72.5px;
  }
}
</style>