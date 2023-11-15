<template>
  <div class="home">
    <!-- 搜索页面 -->
    <transition name="slide-up">
      <div class="searchPage" v-show="searchShow">
        <SearchContent
          :seachShow="searchShow"
          @searchViewShow="searchViewShow"
        />
      </div>
    </transition>
    <!-- 搜索框 -->
    <div class="search">
      <van-search
        shape="round"
        background="#fff"
        placeholder="搜索"
        @click.stop="showSearchPage"
      />
    </div>

    <!-- 轮播图 -->
    <div class="banner">
      <van-swipe class="my-swipe" :autoplay="3000">
        <van-swipe-item
          ><img src="../assets/swiper01.jpg" alt=""
        /></van-swipe-item>
        <van-swipe-item
          ><img src="../assets/swiper02.jpg" alt=""
        /></van-swipe-item>
      </van-swipe>
    </div>

    <!-- 导航栏 -->
    <ul class="nav">
      <router-link v-for="i in navList" :key="i.order" :to="i.link">
        <img :src="i.img" />
        <p>{{ i.name }}</p>
      </router-link>
      <router-view></router-view>
    </ul>

    <!-- 新人必听 -->
    <div class="newListen">
      <h2 class="title">新人必听</h2>
      <ul>
        <li v-for="i in newListen" :key="i.albumId">
          <a :href="`https://m.ximalaya.com/album/${i.albumId}`">
            <img :src="`https://imagev2.xmcdn.com/${i.albumCoverPath}`" />
            <p>{{ i.albumTitle }}</p>
          </a>

          <div class="playCount">
            <van-icon name="play-circle-o" />
            <span>{{ albumPlayCount(i) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 限时免费 -->
    <div class="limitFree">
      <div class="title">
        <span>限时免费</span>
        <van-count-down :time="time" />
      </div>
      <ul>
        <li v-for="i in limitFree" :key="i.id">
          <a :href="`https://m.ximalaya.com/album/${i.id}`">
            <img :src="i.coverPath" />
            <p>{{ i.title }}</p>
          </a>

          <div class="playCount">
            <van-icon name="play-circle-o" />
            <span>{{ playCount(i) }}</span>
          </div>
        </li>
      </ul>
    </div>

    <!-- 今日热点 -->
    <div class="todayHot">
      <h2 class="title">今日热点</h2>

      <ul>
        <li v-for="i in todayHot" :key="i.trackId">
          <a :href="`https://m.ximalaya.com/sound/${i.trackId}`">
            <div class="left">
              <img :src="i.albumCoverPath" />
              <div class="play">
                <van-icon name="play" />
              </div>
            </div>
            <div class="right">
              <p>{{ i.title }}</p>
              <span>
                <van-icon name="contact-o" />
                {{ i.anchorName }}
              </span>
              <span>
                <van-icon name="audio" />
                {{ playCount(i) }}
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>

    <!-- 播客推荐 -->
    <div class="podcastRecommend">
      <h2 class="title">今日热点</h2>

      <ul>
        <li v-for="i in podcastRecommend" :key="i.trackId">
          <a :href="`https://m.ximalaya.com/sound/${i.trackId}`">
            <div class="left">
              <img :src="i.coverPath" />
              <div class="play">
                <van-icon name="play" />
              </div>
            </div>
            <div class="right">
              <p>{{ i.trackTitle }}</p>
              <span>
                <van-icon name="contact-o" />
                {{ i.nickname }}
              </span>
            </div>
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SearchContent from "@/components/SearchContent.vue";
import { getNav } from "../apis/nav";
import { getNewlisten } from "../apis/newListen";
import { getDayhotAndLimitfree } from "../apis/dayHotAndLimitFree";
import { getPodcastRecommend } from "../apis/podcastRecommend";

export default {
  name: "HomeView",
  data() {
    return {
      time: 24 * 60 * 60 * 1000,
      navList: [],
      newListen: [],
      todayHot: [],
      limitFree: [],
      podcastRecommend: [],
      searchShow: false,
    };
  },
  async mounted() {
    let navList = await getNav();
    let { albums } = await getNewlisten();
    let { hotTrack, limitedFreeAlbum } = await getDayhotAndLimitfree();
    let { data } = await getPodcastRecommend();

    this.navList = navList;
    this.podcastRecommend = data.feedList;
    this.todayHot = hotTrack.hotTracks;
    this.limitFree = limitedFreeAlbum.limitedTimeFreeAlbums;
    this.newListen = albums;

    console.log(this.navList);
  },
  methods: {
    albumPlayCount(i) {
      if (i.albumPlayCount >= 100000000) {
        return (i.albumPlayCount / 100000000).toFixed(2) + "亿";
      } else if (i.albumPlayCount >= 10000) {
        return (i.albumPlayCount / 10000).toFixed(2) + "万";
      } else {
        return i.albumPlayCount;
      }
    },
    playCount(i) {
      if (i.playCount >= 100000000) {
        return (i.playCount / 100000000).toFixed(2) + "亿";
      } else if (i.playCount >= 10000) {
        return (i.playCount / 10000).toFixed(2) + "万";
      } else {
        return i.playCount;
      }
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
  components: {
    SearchContent,
  },
};
</script>

<style lang="scss" scoped>
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
.search {
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  vertical-align: bottom;
  border-bottom: 1px solid #fcfcfd;
  z-index: 100;
}

.banner {
  width: 100vw;
  margin: 20px 0;
  padding-top: 54px;

  img {
    width: 80%;
    border-radius: 10px;
    vertical-align: bottom;
  }
}
.nav {
  width: 100vw;
  display: flex;
  padding: 0 30px;

  a {
    flex: 1;
    img {
      width: 34px;
      height: 34px;
      margin-bottom: 5px;
    }

    p {
      font-size: 12px;
      color: #666666;
    }
  }
}

// 新人必听
.newListen {
  // background-color: cadetblue;
  padding: 30px 10px 20px 10px;
  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }

  ul {
    width: 100%;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    li {
      position: relative;
      width: 30%;
      margin-bottom: 10px;
    }
    li a {
      color: #333;
    }
    li a img {
      width: 100%;
      height: 103px;
      border-radius: 5px;
    }
    li a p {
      text-align: left;
      margin-top: 5px;
      font-size: 14px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    .playCount {
      width: 100%;
      height: 24px;
      line-height: 24px;
      position: absolute;
      bottom: 35px;
      left: 1px;
      padding-left: 4px;
      text-align: left;
      font-size: 14px;
      color: white;
      border-radius: 0 0 5px 5px;
      background-image: linear-gradient(
        180deg,
        rgba(3, 3, 3, 0) 9%,
        rgba(0, 0, 0, 0.58) 100%
      );
    }
  }
}

// 限时免费
.limitFree {
  // background-color: gold;
  padding: 0 10px 20px 10px;

  .title {
    display: flex;
    align-items: center;
    font-size: 18px;
    text-align: left;
    span {
      font-weight: bold;
      margin-right: 5px;
    }
    .van-count-down {
      color: white;
      background-color: red;
    }
  }

  ul {
    width: 100%;
    margin-top: 20px;
    display: flex;
    overflow: hidden;
    overflow-x: auto;

    li {
      position: relative;
      margin-bottom: 10px;
      margin-right: 10px;
    }
    li:last-child {
      margin-right: 0;
    }
    li a {
      color: #333;
    }
    li a img {
      width: 103px;
      border-radius: 5px;
    }
    li a p {
      text-align: left;
      margin-top: 5px;
      font-size: 14px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
  }
  .playCount {
    width: 102px;
    height: 24px;
    line-height: 24px;
    position: absolute;
    bottom: 35px;
    left: 1px;
    padding-left: 4px;
    text-align: left;
    font-size: 14px;
    color: white;
    border-radius: 0 0 5px 5px;
    background-image: linear-gradient(
      180deg,
      rgba(3, 3, 3, 0) 9%,
      rgba(0, 0, 0, 0.58) 100%
    );
  }
}

// 今日热点
.todayHot {
  // background-color: cadetblue;
  padding: 0 10px 20px 10px;

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }

  ul {
    width: 100%;
  }
  ul li {
    margin-top: 25px;
  }
  ul li a {
    color: #333;
    display: flex;
    text-align: left;

    .left {
      position: relative;
    }
    .left img {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      margin-right: 15px;
    }
    .left .play {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 70px;
      height: 70px;
      color: white;
      font-size: 25px;
      border-radius: 10px;
      text-align: center;
      line-height: 70px;
      background: rgba(0, 0, 0, 0.3);
    }

    .right {
      padding: 5px 0;
    }
    .right p {
      font-size: 16px;
      margin-bottom: 10px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }

    .right span {
      color: #ccc;
      font-size: 12px;
      margin-right: 5px;
    }
  }
}

// 播客推荐
.podcastRecommend {
  // background-color: chocolate;
  padding: 30px 10px 20px 10px;

  .title {
    font-size: 18px;
    font-weight: bold;
    text-align: left;
  }

  ul {
    width: 100%;
  }
  ul li {
    margin-top: 25px;
  }
  ul li a {
    color: #333;
    display: flex;
    text-align: left;

    .left {
      position: relative;
    }
    .left img {
      width: 70px;
      height: 70px;
      border-radius: 10px;
      margin-right: 15px;
    }
    .left .play {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      width: 70px;
      height: 70px;
      color: white;
      font-size: 25px;
      border-radius: 10px;
      text-align: center;
      line-height: 70px;
      background: rgba(0, 0, 0, 0.3);
    }

    .right {
      padding: 5px 0;
    }
    .right p {
      font-size: 16px;
      margin-bottom: 10px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }

    .right span {
      color: #ccc;
      font-size: 12px;
    }
  }
}
</style>
