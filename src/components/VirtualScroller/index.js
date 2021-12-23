import "./index.css";
export default {
  props: {
    data: {
      type: Array,
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
  mounted() {
    // 1 获取可视区高度
    this.screenHeight = this.$refs.scrollContext.clientHeight;

    // 2 计算开始和结束索引
    this.startIndex = 0;
    this.endIndex = this.termNum;
  },
  methods: {
    /**
     * 发生滚动之后要做什么呢？重新计算开始和结束索引
     */
    handleScroll() {
      this.startIndex = Math.ceil(
        this.$refs.scrollContext.scrollTop / this.dataItemHeight
      );

      this.endIndex = this.startIndex + this.termNum;
      this.startOffset = this.$refs.scrollContext.scrollTop;
    },

    /**
     * 渲染可视区数据
     */
    renderClientData() {
      return this.visibleData.map((node, index) => {
        return (
          <div style={{ height: this.dataItemHeight + "px" }} key={index}>
            {node.value}
          </div>
        );
      });
    },
  },

  render(h) {
    return (
      <div class="scroll" ref="scrollContext" on-scroll={this.handleScroll}>
        <div
          class="scroll-context"
          style={{ height: this.getTotalHigth + "px" }}
        ></div>
        <div class="view-list" style={{ transform: this.visibleOffsetBottom }}>
          {this.renderClientData()}
        </div>
      </div>
    );
  },
};
