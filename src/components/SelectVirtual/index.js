import "./index.css";
import handleVnode from "../../mixins/handleVnode";
import { throttle } from "../../util/tool";
let mianWarp = null;
let scrollWap = null;
let clientListWarp = null;
export default {
  mixins: [handleVnode],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    labelKey: {
      type: String,
    },
    valueKey: {
      type: String,
    },
    dataItemHeight: {
      type: Number,
    },
  },
  data() {
    return {
      screenHeight: 0, // 容器可视区高度
      startOffset: 0, // 可视渲染区距上高度
      startIndex: 0, // 可视区数据相对于总数据的startIndex
      endIndex: 0, // 可视区数据相对于总数据的endIndex
    };
  },
  computed: {
    /** 数据在可视区占的份数 */
    termNum() {
      return Math.ceil(this.screenHeight / this.dataItemHeight);
    },

    /** 处在可视区的数据 */
    visibleData() {
      return this.data.slice(
        this.startIndex,
        Math.min(this.endIndex, this.data.length)
      );
    },

    /** 计算总高度 */
    getTotalHigth() {
      return this.data.length * this.dataItemHeight;
    },

    /** 可视渲染区距上偏移量 */
    visibleOffsetBottom() {
      return `translate3d(0,${this.startOffset}px,0)`;
    },
  },
  methods: {
    getHandleNode(isShow) {
      if (!isShow) return;
      setTimeout(() => {
        mianWarp = document.querySelector(".el-scrollbar__wrap");
        clientListWarp = document.querySelector(".el-scrollbar__view ");
        scrollWap = this.createScroll(clientListWarp);

        mianWarp.className = mianWarp.className + " customMianWarp";
        clientListWarp.className =
          clientListWarp.className + " customClientListWarp";

        // 1 获取可视区高度
        this.screenHeight = 500;

        // 2 计算开始和结束索引
        this.startIndex = 0;
        this.endIndex = this.termNum + this.startIndex;

        // 进行初始样式设置
        mianWarp.className = mianWarp.className + " custom";
        scrollWap.setAttribute(
          "style",
          `height: ${this.getTotalHigth}px !important`
        );

        // 滚动监听
        mianWarp.addEventListener("scroll", this.handleScroll);
      });
    },

    /**
     * 发生滚动之后重新计算开始和结束索引
     */
    handleScroll: throttle(function () {
      this.startIndex = Math.ceil(mianWarp.scrollTop / this.dataItemHeight);
      this.endIndex = this.startIndex + this.termNum;
      this.startOffset =
        mianWarp.scrollTop - (mianWarp.scrollTop % this.dataItemHeight);

      // 重新处理可视区的位置样式
      clientListWarp.setAttribute(
        "style",
        `transform: ${this.visibleOffsetBottom}  !important`
      );
    }),

    /**
     * 渲染可视区数据
     */
    renderOptions() {
      return this.visibleData.map((dataItem, index) => {
        return (
          <el-option
            style={{ height: this.dataItemHeight + "px" }}
            key={dataItem[this.labelKey]}
            label={dataItem[this.labelKey]}
            value={dataItem[this.valueKey]}
          />
        );
      });
    },

    /**
     * 创建滚动区节点
     * @param {object} popNode 可视区列表节点
     * @returns 模拟整个滚动区节点
     */
    createScroll(popNode) {
      const node = document.createElement("div");
      node.className = "clientListWarp";
      popNode.parentNode.appendChild(node);

      return node;
    },
  },

  render(h) {
    return this.handleVnodeProp(
      <el-select value="" on-visible-change={this.getHandleNode}>
        {this.renderOptions}
      </el-select>
    );
  },
};
