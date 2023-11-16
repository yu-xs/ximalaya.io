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
            <p>
              <span>'{{ searchRes }}' 相关的主播</span>
              <span>更多 <van-icon name="arrow" /></span>
            </p>

            <ul class="all-userList">
              <li v-for="i in searchResUserList" :key="i.userInfo.uid">
                <div class="left">
                  <img :src="i.userInfo.smallPic" />
                </div>
                <div class="right">
                  <p class="title">{{ i.userInfo.nickname }}</p>
                  <span class="fans"><van-icon name="user-o" />{{ i.userInfo.followers_counts }}</span>
                </div>
              </li>
            </ul>
          </div>
          <div class="all-album">
            <p>
              <span>'{{ searchRes }}' 相关的专辑</span>
              <span>更多 <van-icon name="arrow" /></span>
            </p>

            <ul class="all-albumList">
              <li v-for="i in searchResList" :key="i.albumInfo.id">
                <div class="left">
                  <img :src="i.albumInfo.cover_path" />
                </div>
                <div class="right">
                  <p class="title">{{ i.albumInfo.title }}</p>
                  <p class="reviews">
                    {{ i.albumInfo.intro }}
                  </p>
                  <span class="user"
                    ><van-icon name="user-o" />{{ i.albumInfo.nickname }}</span
                  >
                  <span class="sound"><i></i>{{ i.albumInfo.tracks }}</span>
                  <span class="play"
                    ><van-icon name="audio" />{{
                      playCount(i.albumInfo.play)
                    }}</span
                  >
                </div>
              </li>
            </ul>
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
      searchResUserList: [],
      searchResList: [],
      searchCore: "all",
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

    // 播放量计算
    playCount(i) {
      if (i >= 100000000) {
        return (i / 100000000).toFixed(2) + "亿";
      } else if (i >= 10000) {
        return (i / 10000).toFixed(2) + "万";
      } else {
        return i;
      }
    },

    // 获取导航栏对应数据
    getSearchResList() {
      this.$axios
        .get(
          `/api/m-revision/page/search?kw=${this.searchRes}&core=${this.searchCore}&page=1&rows=5`
        )
        .then((res) => {
          this.searchResList = res.data.data.albumViews.albums;
          this.searchResUserList = res.data.data.userViews.users;
          console.log(this.searchResUserList);
        });
    },
    getNavId() {},
  },
  mounted() {
    this.searchRes = this.$route.params.searchVal;

    this.getSearchResList();
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
        transform: translateX(-14px) scale(0.55);
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
    margin-top: 20px;
    padding: 0 10px;
    // background-color: gold;

    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      padding-left: 20px;
    }
    p span:first-child {
      font-size: 18px;
    }
    p span:last-child {
      font-size: 14px;
    }

    .all-userList {
      width: 100%;
      display: flex;
      margin: 20px 0;
      overflow: hidden;
      overflow-x: scroll;
    }
    .all-userList li {
      display: flex;
      flex-shrink: 0;
      margin-right: 30px;
      text-align: left;
    }
    .all-userList li:last-child {
      margin-right: 0;
    }
    .all-userList li .left img {
      width: 40px;
      height: 40px;
      margin-right: 10px;
      vertical-align: bottom;
      border-radius: 50%;
    }
    .all-userList li .right .title {
      padding: 0;
      margin: 4px 0;
      font-size: 14px;
    }
    .all-userList li .right .fans {
      font-size: 12px;
      color: #b3b3bb;

      i {
        margin-right: 5px;
      }
    }
  }
  .tabBar .all .all-album {
    width: 100%;
    padding: 0 10px;
    // background-color: gold;

    p {
      display: flex;
      justify-content: space-between;
      align-items: center;
      text-align: left;
      padding-left: 20px;
    }
    p span:first-child {
      font-size: 18px;
    }
    p span:last-child {
      font-size: 14px;
    }
  }

  .tabBar .all .all-albumList {
    width: 100%;
  }
  .tabBar .all .all-albumList li {
    display: flex;
    margin: 15px 0;
    padding-bottom: 15px;
    border-bottom: 1px solid #f8f8f8;

    .left img {
      width: 70px;
      height: 70px;
      vertical-align: bottom;
      border-radius: 5px;
    }

    .right {
      width: calc(100vw - 85px);
      padding-left: 15px;
      text-align: left;
    }
    .right p {
      padding: 0;
    }
    .right .title {
      font-size: 16px;
      overflow: hidden;
      text-wrap: nowrap;
    }
    .right .reviews {
      font-size: 13px;
      color: #999;
      margin: 10px 0;
      line-height: 1.38;
    }

    .right span {
      font-size: 11px;
      color: #999;
      margin-right: 15px;
    }
    .right span i {
      margin-right: 5px;
    }
    .right .sound i {
      display: inline-block;
      width: 11px;
      height: 11px;
      background: url(../assets/sound.png) no-repeat;
      background-size: 11px 11px;
    }
  }
}
</style>