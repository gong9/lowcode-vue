/**
 * file: 表格组件封装
 */

import handleVnode from "../../../mixins/handleVnode";
export default {
  name: "lowcode-table",
  mixins: [handleVnode],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    schema: {
      type: Array,
      default: () => [],
    },
  },
  data: function () {
    return {
      tableRef: null,
    };
  },
  methods: {
    /**
     * 1.使用方如果提供render函数，那么此列按render函数进行渲染
     * 2.关于operation列的渲染
     * @param {*} 列schema配置
     * @returns scopedSlots
     */
    handleSlot({ type, name, render, actions }) {
      if (render && typeof render === "function") {
        return {
          scopedSlots: {
            default: ({ $index, row }) => {
              const rowData = {
                colIndex: $index,
                rowData: row,
                value: row[name],
              };
              return render.call(this.$parent, rowData);
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
            type={type}
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
        const flag = hide.call(this.$parent,row);
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
  mounted: function () {
    this.tableRef = this.$refs.table;
  },
  render: function (h) {
    return (
      <div>
        {/* blm-table js控制选中行时存在bug 未支持相关方法 */}
        {this.handleVnodeProp(
          <el-table ref="table" data={this.data}>
            {this.renderTableColumn()}
          </el-table>
        )}
      </div>
    );
  },
};
