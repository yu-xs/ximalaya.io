<template>
  <div>
    <p>我是top和tabBar渲染的内容</p>
    <!-- <button @click="getId">获取</button>    -->
  </div>
</template>

<script>
export default {
  name: "topRankContent",
  props: {
    // tabBarId: {
    //   type: [String, Number],
    //   required: true,
    // },
    // val: {
    //   type: [String, Number],
    //   required: true,
    // },
  },
  data() {
    return {};
  },
  methods: {
    // getId() {
    //   console.log("content的id", this.val, this.tabBarId);
    // },
  },
};
</script>