<template>
  <div>
    <!-- <p>我是排行榜的组件-{{ topBarId }}-{{ sideBarId }}</p> -->
    <ul class="content" v-if="contentArr.length > 0">
      <router-link to="" tag="li" v-for="(i, index) in contentArr" :key="i.id">
        <span class="icon">{{ index + 1 }}</span>
        <div class="left">
          <img :src="`https://imagev2.xmcdn.com/${i.cover}`" />
        </div>
        <div class="right">
          <h3>{{ i.albumTitle }}</h3>
          <p>{{ i.salePoint }}</p>
          <p>
            <span><i></i>{{ playCount(i) }}</span
            ><span><i></i>{{ i.trackCount }}</span>
          </p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  name: "topRankContent",
  props: {
    topBarId: {
      type: [String, Number],
      required: true,
    },
    sideBarId: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      contentArr: [],
    };
  },
  methods: {
    playCount(i) {
      if (i.playCount >= 100000000) {
        return (i.playCount / 100000000).toFixed(2) + "亿";
      } else if (i.playCount >= 10000) {
        return (i.playCount / 10000).toFixed(2) + "万";
      } else {
        return i.playCount;
      }
    },
    fetchData() {
      this.$axios
        .get(`/api/revision/rank/v4/element?rankingId=${this.sideBarId}`)
        .then((res) => {
          let data = res.data.data.rankList[0].albums;
          this.contentArr = data;
        //   console.log(this.contentArr);
          console.log("axios中的侧边导航栏的id", this.sideBarId);
        });
    },
  },
  watch: {
    sideBarId(newVal) {
      console.log("sideBarId改变了", newVal);
      this.fetchData();
    },
  },
  mounted() {
    this.fetchData();
  },
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
  height: 100vh;
  overflow: hidden;
  overflow-y: scroll;

  li {
    position: relative;
    height: 127px;
    padding: 15px 10px;
    display: flex;
  }
  li::after {
    content: "";
    position: absolute;
    left: 35px;
    right: 0;
    bottom: 0;
    border-bottom: 1px solid #eaeaea;
  }
  li .icon {
    display: inline-block;
    width: 34px;
    height: 19px;
    margin-right: 5px;
    font-weight: 600;
    transform: translateY(-10px);
  }
  li:nth-child(1) .icon {
    font-size: 0;
    display: inline-block;
    width: 34px;
    height: 19px;
    margin-right: 5px;
    transform: translateY(5px);
    background: url(../assets/img_rank_first.png) 50%/18px no-repeat;
  }
  li:nth-child(2) .icon {
    font-size: 0;
    display: inline-block;
    width: 34px;
    height: 19px;
    margin-right: 5px;
    transform: translateY(5px);
    background: url(../assets/img_rank_second.png) 50%/18px no-repeat;
  }
  li:nth-child(3) .icon {
    font-size: 0;
    display: inline-block;
    width: 34px;
    height: 19px;
    margin-right: 5px;
    transform: translateY(5px);
    background: url(../assets/img_rank_third.png) 50%/18px no-repeat;
  }
  li .left {
    width: 85px;
    height: 70px;
    // background-color: cadetblue;
    img {
      width: 70px;
      height: 70px;
      border-radius: 5px;
      margin-right: 10px;
    }
  }

  li .right {
    width: 100%;
    text-align: left;
    h3 {
      width: 100%;
      height: 40px;
      line-height: 20px;
      font-size: 16px;
      margin-bottom: 5px;

      overflow: hidden;
      -webkit-line-clamp: 2;
      display: -webkit-box;
      text-overflow: ellipsis;
      -webkit-box-orient: vertical;
    }
    p {
      height: 12px;
      line-height: 12px;
      color: #a2a2a2;
    }
    p:nth-of-type(1) {
      font-size: 13px;
      margin-bottom: 15px;
    }
    p:nth-of-type(2) {
      font-size: 11px;

      span {
        margin-right: 10px;
      }
      span:nth-child(1) i {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background: url(../assets/play.png) no-repeat;
        background-size: 12px 12px;
        vertical-align: -2px;
      }
      span:nth-child(2) i {
        display: inline-block;
        width: 12px;
        height: 12px;
        margin-right: 4px;
        background: url(../assets/sound.png) no-repeat;
        background-size: 12px 12px;
        vertical-align: -2px;
      }
    }
  }
}
</style>