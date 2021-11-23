export default {
  name: "lowcode-ele-table",
  props: {
    data: {
      type: Array,
    },
    schema: {
      type: Array,
    },
  },
  data: function () {
    return {
      pagination: {
        pageNum: 1,
        pageSize: 10,
        total: 100,
        event: this.paginationEvent,
      },
    };
  },
  methods: {
    /** 处理属性与事件 */
    handleTableVnode(vnode) {
      const fromUserEvent = this._events; // event
      const otherBLMProps = this.$attrs; // props

      const currentEvent = vnode.componentOptions.listeners;
      const vnodeProps = vnode.componentOptions.propsData;

      vnode.componentOptions.listeners = {
        ...currentEvent,
        ...fromUserEvent,
      };

      vnode.componentOptions.propsData = {
        ...vnodeProps,
        ...otherBLMProps,
      };
      return vnode;
    },
    handleColVnode(vnode, props) {
      const vnodeProps = vnode.componentOptions.propsData;
      vnode.componentOptions.propsData = {
        ...vnodeProps,
        ...props,
      };
      return vnode;
    },
    handleSlot({ type, name, render, actions }) {
      if (render) {
        return {
          scopedSlots: {
            default: ({ $index, row }) => {
              const rowData = {
                colIndex: $index,
                rowData: row,
                value: row[name],
              };
              return render(rowData);
            },
          },
        };
      } else if (type && type === "operation") {
        return {
          scopedSlots: {
            default: ({ $index, row }) => {
              const rowData = {
                colIndex: $index,
                rowData: row,
              };

              return this.renderOperation(actions, rowData);
            },
          },
        };
      } else {
        return null;
      }
    },
    renderTableColumn() {
      return this.schema.map((col) => {
        return this.handleColVnode(
          <el-table-column
            prop={col.name}
            label={col.label}
            {...col.props}
            {...this.handleSlot(col)}
          ></el-table-column>,
          col.props
        );
      });
    },
    renderOperation(actions, row) {
      return actions.map((action) => this.renderOperationItem(action, row));
    },
    renderOperationItem({ type, click, label, hide, props = {} }, row) {
      if (hide && typeof hide === "function") {
        const flag = hide(row);
        if (flag) return null;
      }

      switch (type) {
        case "link":
          return this.handleColVnode(
            <el-link
              onClick={() => {
                click(row);
              }}
            >
              {label}
            </el-link>,
            props
          );
        default:
          return null;
      }
    },
  },
  render: function (h) {
    return (
      <div>
        {this.handleTableVnode(
          <BLM-table data={this.data}>{this.renderTableColumn()}</BLM-table>
        )}
      </div>
    );
  },
};
