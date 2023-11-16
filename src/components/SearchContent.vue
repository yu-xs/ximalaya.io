<template>
  <div class="searchPage">
    <div class="search">
      <van-search
        class="searchInput"
        shape="round"
        placeholder="搜索"
        v-model="inputVal"
      />
      <button @click="searchViewShow">取消</button>
    </div>

    <!-- 搜索历史 -->
    <div class="searchHistory" v-show="inputVal == '' ? true : false">
      <div class="top">
        <span>搜索历史</span>
        <van-icon name="delete-o" @click="delLocalstorage()" />
      </div>
      <ul class="history">
        <router-link
          tag="li"
          v-for="i in historyList"
          :key="i"
          :to="{ name: 'searchRes', params: { searchVal: i } }"
          >{{ i }}</router-link
        >
      </ul>
    </div>

    <!-- 热搜导航栏 -->
    <van-tabs
      class="searchNav"
      v-show="inputVal == '' ? true : false"
      @click="getSearchNavId"
    >
      <van-tab
        v-for="i in searchNav"
        :key="i.categoryId"
        :name="i.categoryId"
        :title="i.categoryName"
      >
        <p
          v-for="(i, index) in searchList"
          :key="i.score"
          @click="getHotSearchName(i.word)"
        >
          <span>{{ index + 1 }}</span>
          <span>{{ i.word }}</span>
          <i></i>
        </p>
      </van-tab>
    </van-tabs>

    <!-- 搜索结果 -->
    <div class="searchRes" v-show="inputVal == '' ? false : true">
      <!-- 推荐结果 -->
      <div class="albumResList" v-for="i in albumResList" :key="i.keyword">
        <div class="left">
          <img :src="i.imgPath" />
        </div>
        <div class="right">
          <p>{{ i.keyword }}</p>
          <span class="type">{{ i.category }}</span>
          <span class="play"><van-icon name="audio" />{{ playCount(i) }}</span>
          <span class="listen">{{ i.tracks }}集</span>
        </div>
        <van-icon class="playIcon" name="play-circle-o" />
      </div>
      <!-- 搜索列表 -->
      <ul class="queryResList">
        <li
          v-for="i in queryResList"
          :key="i.keyword"
          @click="getSearchVal(i.keyword)"
        >
          {{ i.keyword }}
        </li>
        <router-view></router-view>
      </ul>
    </div>
  </div>
</template>

<script>
// import SearchResView from "@/views/SearchResView.vue";
import { getsearchNav } from "../apis/searchNav.js";
export default {
  components: {},
  props: ["searchShow"],
  data() {
    return {
      historyList: [],
      searchNav: [],
      searchList: [],
      categoryId: -1,
      inputVal: "",
      albumResList: [],
      queryResList: [],
    };
  },
  async mounted() {
    let { category } = await getsearchNav();

    this.searchNav = category;

    this.getSearchList();

    if (localStorage.getItem("historyList")) {
      this.getLocalStorageList();
    } else {
      let arr = [];
      localStorage.setItem("historyList", JSON.stringify(arr));
      this.getLocalStorageList();
    }
  },
  methods: {
    // 获取热搜数据
    getSearchList() {
      this.$axios
        .get(
          `/api/hotWordBillboard/list/2.0?categoryId=${this.categoryId}&size=24`
        )
        .then((res) => {
          this.searchList = res.data.hotWordResultList;
          //   console.log(this.searchList);
        });
    },
    // 获取搜索词列表
    getSearchResList() {
      this.$axios
        .get(
          `/api/revision/suggest?kw=${this.inputVal}&paidFilter=false&scope=all`
        )
        .then((res) => {
          this.albumResList = res.data.data.result.albumResultList;
          this.queryResList = res.data.data.result.queryResultList;
          //   console.log(res.data.data.result);
        });
    },
    // 播放量转换
    playCount(i) {
      if (i.play >= 100000000) {
        return (i.play / 100000000).toFixed(2) + "亿";
      } else if (i.play >= 10000) {
        return (i.play / 10000).toFixed(2) + "万";
      } else {
        return i.play;
      }
    },

    // 关闭搜索页面
    searchViewShow() {
      this.inputVal = "";
      this.$emit("searchViewShow", false);
    },

    getSearchNavId(name) {
      console.log(name);
      this.categoryId = name;
    },

    // 获取点击的热搜词
    getHotSearchName(val) {
      if (this.historyList.length === 0 || !this.historyList.includes(val)) {
        this.historyList.unshift(val);
      }
      console.log(val, this.historyList);

      localStorage.setItem("historyList", JSON.stringify(this.historyList));

      this.$router.push({
        name: "searchRes",
        params: { searchVal: val },
      });
    },
    // 获取点击的搜索结果值
    getSearchVal(val) {
      if (this.historyList.length === 0 || !this.historyList.includes(val)) {
        this.historyList.unshift(val);
      }
      console.log(val, this.historyList);

      localStorage.setItem("historyList", JSON.stringify(this.historyList));

      this.$router.push({
        name: "searchRes",
        params: { searchVal: val },
      });
    },

    // 将localStorage的数组添加至historyList
    getLocalStorageList() {
      let localStorageList = JSON.parse(localStorage.getItem("historyList"));

      localStorageList.map((item) => {
        this.historyList.push(item);
      });

      console.log(this.historyList);
    },
    // 清除localStorage数据
    delLocalstorage() {
      let arr = [];
      localStorage.setItem("historyList", JSON.stringify(arr));
      this.historyList = [];
      console.log("触发删除");
    },
  },
  watch: {
    categoryId(newVal) {
      console.log("categoryId改变了", newVal);
      this.getSearchList();
    },
    inputVal(newVal) {
      console.log("搜索框的值改变了", newVal);
      this.getSearchResList();
    },
  },
};
</script>

<style lang="scss" scoped>
.searchPage {
  overflow: hidden;
  overflow-y: scroll;
  pointer-events: auto;
  .search {
    display: flex;
    .searchInput {
      flex: 8.5;
      height: 40px;
    }

    button {
      flex: 1.5;
      border: none;
      font-size: 16px;
      background-color: transparent;
    }
  }

  .searchHistory {
    width: 100%;
    margin: 15px 0;
    padding: 0 10px;

    .top {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
    }
    .history {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
    }

    .history li {
      margin: 5px;
      margin-left: 0;
      padding: 10px 15px;
      border-radius: 5px;
      background-color: #f3f4f5;
      font-size: 14px;
    }
  }
  .searchNav {
    margin-bottom: 10px;
    // background-color: cadetblue;
    text-align: left;

    p {
      height: 45px;
      line-height: 45px;
      margin: 5px 15px;
      border-bottom: 1px solid #e8e8e8;
    }
    p span:nth-child(1) {
      display: inline-block;
      width: 12px;
      font-size: 16px;
      font-weight: 500;
      color: #dabda6;
    }
    p:nth-child(1) span:nth-child(1) {
      font-size: 20px;
      color: #ff0b0b;
    }
    p:nth-child(2) span:nth-child(1) {
      font-size: 20px;
      color: #f86442;
    }
    p:nth-child(3) span:nth-child(1) {
      font-size: 20px;
      color: #f8a642;
    }
    p span:nth-child(2) {
      padding-left: 10px;
    }
  }

  //   搜索结果
  .searchRes {
    // 推荐搜索
    .albumResList {
      position: relative;
      display: flex;
      align-items: center;
      width: 100%;
      height: 70px;
      padding: 15px 10px;
      //   background-color: cadetblue;
    }
    // 左侧
    .albumResList .left {
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
    .albumResList .left img {
      width: 100%;
      height: 100%;
      vertical-align: bottom;
    }
    // 右侧
    .albumResList .right {
      flex: 1;
      text-align: left;
    }
    .albumResList .right p {
      width: 275px;
      font-size: 14px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      margin-bottom: 5px;
      color: #40404c;
    }
    .albumResList .right span {
      font-size: 12px;
      color: #a3a3ac;
      margin-right: 15px;
    }
    .albumResList .right .type {
      font-size: 10px;
      border: 1px solid #a3a3ac;
      border-radius: 5px;
      padding: 1px 5px;
    }
    .albumResList .right .play i {
      margin-right: 3px;
    }
    .albumResList .right .listen::before {
      content: "";
      display: inline-block;
      width: 12px;
      height: 12px;
      background: url(../assets/sound.png) no-repeat;
      background-size: 12px 12px;
      vertical-align: -1px;
      margin-right: 3px;
    }
    // 播放按钮
    .albumResList .playIcon {
      font-size: 24px;
    }

    // 搜索列表
    .queryResList {
      padding: 0 10px;
      li:first-child {
        border-top: 1px solid #e1e1e1;
      }
      li {
        height: 40px;
        line-height: 40px;
        text-align: left;
        font-size: 14px;
        border-bottom: 1px solid #e1e1e1;
      }
      li a {
        color: #333;
      }
    }
  }
}
</style>