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
  methods: {
    /**
     * 将使用方的属性和事件重新注入blmtable
     * @param {*} vnode
     * @returns vnode
     */
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

    /**
     * 向vnode中注入prop
     * @param {*} vnode
     * @param {*} props
     * @returns vnode
     */
    handleColVnode(vnode, props) {
      const vnodeProps = vnode.componentOptions.propsData;
      vnode.componentOptions.propsData = {
        ...vnodeProps,
        ...props,
      };
      return vnode;
    },

    /**
     * 1.使用方如果提供render函数，那么此列按render函数进行渲染
     * 2.关于operation列的渲染
     * @param {*} 列schema配置
     * @returns scopedSlots
     */
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
              if (actions && Array.isArray(actions)) {
                return this.renderOperation(actions, rowData);
              } else {
                new Error(
                  "type为operation的配置必须含有actions属性，actions:Array"
                );
              }
            },
          },
        };
      } else {
        return null;
      }
    },

    /**
     * 渲染 el-table-column
     * @returns all el-table-column vnode
     */
    renderTableColumn() {
      return this.schema.map((col) => {
        const { name, label, props = {}, type } = col;

        if (!type && (!name || !label)) {
          throw new Error("schema 中必须含有name、label属性");
        }

        return this.handleColVnode(
          <el-table-column
            prop={name}
            label={label}
            {...props}
            {...this.handleSlot(col)}
          ></el-table-column>,
          col.props
        );
      });
    },

    /**
     * 渲染操作区域
     * @param {*} actions 操作数组
     * @param {*} row 当前行数据
     * @returns 渲染操作区域vnode
     */
    renderOperation(actions, row) {
      return actions.map((action) => this.renderOperationItem(action, row));
    },

    /**
     * 单个操作控件渲染
     * @param {*} action内的属性
     * @param {*} row
     * @returns 单个操作控件vnode
     */
    renderOperationItem({ type, click, label, hide, props = {} }, row) {
      if (hide && typeof hide === "function") {
        const flag = hide(row);
        if (flag) return null;
      }
      if (!type || !label) {
        throw new Error("actions中的每一项配置必须含有type、lable属性");
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
