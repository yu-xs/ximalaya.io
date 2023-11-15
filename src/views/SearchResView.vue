<template>
  <div class="searchRes">
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
      <!-- 搜索框 -->
      <div class="search">
        <div class="logo" @click="goHome"></div>
        <van-search
          shape="round"
          background="white"
          placeholder="搜索"
          @click.stop="showSearchPage"
          :value="searchRes"
        />
      </div>

      <!-- 导航栏 -->
      <van-tabs v-model="active" class="tabBar" @click="getNavId">
        <van-tab class="all" title="全部" name="all">
          <div class="all-user">
            <p>'{{ searchRes }}' 相关的主播</p>
          </div>
          <div class="all-album">
            <p>
                <span>'{{ searchRes }}' 相关的专辑</span>
                <span>更多 <van-icon name="arrow" /></span>
            </p>
            <div class="all-albumList"></div>
          </div>
        </van-tab>
        <van-tab class="album" title="专辑" name="album"> </van-tab>
        <van-tab class="track" title="声音" name="track"> </van-tab>
        <van-tab class="user" title="主播" name="user"> </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SearchContent from "@/components/SearchContent.vue";

export default {
  components: {
    SearchContent,
  },
  data() {
    return {
      searchRes: "",
      active: 0,
      searchShow: false,
    };
  },
  methods: {
    // 点击logo返回主页
    goHome() {
      this.$router.replace({ path: "/" });
    },
    // 判断搜索页面展示
    showSearchPage() {
      console.log("显示搜索页面");
      this.searchShow = true;
    },
    searchViewShow(i) {
      this.searchShow = i;
    },

    getNavId() {},
  },
  mounted() {
    this.searchRes = this.$route.params.searchVal;
  },
};
</script>

<style lang="scss" scoped>
.searchRes {
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

  //顶部nav样式开始
  .topNav {
    // position: fixed;
    // top: 0;
    // left: 0;
    width: 100%;
    z-index: 100;
    background-color: white;
    .search {
      height: 50px;
      display: flex;
      align-items: center;
      //   background-color: cadetblue;
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
  }

  //   tabBar样式开始
  .tabBar {
    position: relative;

    &::after {
      position: absolute;
      content: "";
      top: 44px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #ebebeb;
    }
  }
  //   tabBar样式结束
  //顶部nav样式结束

  //   全部标签样式
  .tabBar .all .all-user {
    width: 100%;
    height: 80px;
    margin-top: 20px;
    padding: 0 10px;
    background-color: cadetblue;

    p{
        font-size: 18px;
        text-align: left;
        margin-left: 20px;
    }
  }
  .tabBar .all .all-album{
    width: 100%;
    padding: 0 10px;
    background-color: gold;

    p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        text-align: left;
        padding-left: 20px;
    }
    p span:first-child{
        font-size: 18px;
    }
    p span:last-child{
        font-size: 14px;
    }
  }
}
</style>