<template>
  <div class="listen">
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

      <!-- 导航栏 -->
      <van-tabs v-model="active" class="tabBar" @click="getNavId">
        <van-tab
          class="tabBar-list"
          v-for="i in tabBarList"
          :key="i.name"
          :title="i.title"
          :name="i.name"
        >
          <ul class="content">
            <li v-for="i in contentList" :key="i.id">
              <a :href="`https://m.ximalaya.com/ting/${i.id}`">
                <div class="left">
                  <img :src="i.coverPathSmall" />
                </div>
                <div class="right">
                  <p>{{ i.title }}</p>
                  <span class="play">{{ i.dataCount }}</span>
                  <!-- <span class="time">2021-8-27更新</span> -->
                </div>
              </a>
            </li>
          </ul>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
import SearchContent from "@/components/SearchContent.vue";

export default {
  data() {
    return {
      searchShow: false,
      active: 'remen',
      tabBarList: [],
      contentList: [],
      tabBarId: "remen",
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

    getTabBarList() {
      this.$axios.get(`/api/revision/subject/category`).then((res) => {
        this.tabBarList = res.data.data.categories;
        console.log(this.tabBarList);
      });
    },
    getContentList() {
      this.$axios
        .get(
          `/api/revision/subject/categorySubjectList/${this.tabBarId}?pageNum=1&pageSize=20`
        )
        .then((res) => {
          this.contentList = res.data.data.subjects;
          console.log(res.data.data.subjects);
        });
    },

    // 获取导航栏id
    getNavId(name) {
      this.tabBarId = name;
      console.log(name);
    },
  },
  watch: {
    tabBarId(newVal) {
      this.getContentList();
      console.log("tabBarId的值改变了", newVal);
    },
  },
  mounted() {
    this.getTabBarList();
    this.getContentList();
  },
  components: {
    SearchContent,
  },
};
</script>

<style lang="scss" scoped>
.listen {
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
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 100;
    background-color: white;
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
  }

  //   导航栏
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
  .tabBar .content {
    width: 100%;
    height: 100vh;
    margin-top: 10px;
    padding: 0 15px;
    overflow: hidden;
    overflow-y: scroll;
    // background-color: gold;

    li a {
      display: flex;
      align-items: center;
      width: 100%;
      margin-bottom: 20px;
    }
    li a .left img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      margin-right: 10px;
    }

    li a .right {
      text-align: left;
    }
    li a .right p {
      width: 100%;
      height: 44px;
      line-height: 22px;
      font-size: 16px;
      color: #40404c;
      letter-spacing: 0;
      white-space: normal;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    li a .right span {
      color: #a4a4ad;
      font-size: 12px;
      margin-right: 15px;
    }
    li a .right span::before {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url(../assets/sound.png) no-repeat;
      background-size: 12px 12px;
      margin-right: 5px;
      vertical-align: -2px;
    }
  }
  //顶部nav样式结束
}
</style>