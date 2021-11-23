// 中间去加一层 拿实例子去注入目标的props
import emitter from "../../mixins";
export default {
  name: "middlelayer",
  mixins: [emitter],
  props: {},
  methods: {},
  render: function (h) {
    return this.default.$slot;
  },
};
