<template>
  <div class="channel">
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
    </div>

    <!-- 占位盒子 -->
    <!-- <div style="height: 55px;"></div> -->

    <!-- 底部内容区 -->
    <div class="content">
      <div class="left">
        <van-sidebar v-model="activeKey">
          <van-sidebar-item
            v-for="(i, index) in sideBarList"
            :key="i.id"
            :title="i.title"
            @click="scrollToSection(index)"
          />
        </van-sidebar>
      </div>
      <div class="right">
        <div
          class="channel"
          v-for="(i, index) in sideBarList"
          :key="i.id"
          :id="`section-${index}`"
        >
          <div class="title">
            <a :href="`https://m.ximalaya.com/category/a${i.id}`">
              <span>{{ i.title }}</span>
              <van-icon name="arrow" />
            </a>
          </div>
          <ul class="title-channel">
            <li
              v-for="item in i.subCategories[0].metadataValues"
              :key="item.id"
            >
              {{ item.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchContent from "@/components/SearchContent.vue";

export default {
  data() {
    return {
      activeKey: 0,
      searchShow: false,
      sideBarList: [],
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

    // 请求分类侧边栏以及右侧数据
    getChannelList() {
      this.$axios
        .get(`/api/m-revision/page/category/queryCategoriesV2`)
        .then((res) => {
          this.sideBarList = res.data.data;
          console.log(this.sideBarList);
        });
    },

    // 侧边栏滚动方法
    scrollToSection(inedx) {
      // 获取被点击的侧边栏项对应的右侧内容区块
      const section = document.getElementById(`section-${inedx}`);

      // 滚动至指定位置
      section.scrollIntoView({ behavior: "smooth" });

      // 高亮被点击的侧边栏项
      this.activeKey = inedx;
    },
  },
  mounted() {
    this.getChannelList();
  },
  components: {
    SearchContent,
  },
};
</script>

<style lang="scss" scoped>
.channel {
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
    border-bottom: 5px solid #f0f0f0;
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
  //顶部nav样式结束

  //   底部内容区开始
  .content {
    width: 100%;
    height: calc(100vh - 55px);
    overflow: hidden;
    display: flex;
    // margin-top: 55px;

    .left {
      width: 80px;
      height: 100vh;
      overflow: hidden;
      overflow-y: scroll;

      .van-sidebar-item {
        padding: 15px 12px;
      }
    }

    .right {
      flex: 1;
      height: 100vh;
      overflow: hidden;
      overflow-y: scroll;
      padding: 0 15px;
      //   background-color: cadetblue;
    }
    .channel {
      margin-bottom: 10px;
    }
    .right .channel .title {
      height: 50px;
      font-size: 14px;
      font-weight: 600;
      border-bottom: 1px solid #efefef;
      margin-bottom: 10px;
      a {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 100%;
        color: #40404c;
      }
    }

    .right .channel .title-channel {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      li {
        white-space: nowrap;
        color: #7e8c8d;
        font-size: 14px;
        padding: 7px;
      }
    }
  }
  //   底部内容区结束
}
</style>