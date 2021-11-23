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
    handleTableVnode(vnode) {
      return vnode;
    },
    handleColVnode(vnode, props) {
      let vnodeProps = vnode.componentOptions;
      let newVnodeProps = {
        ...vnodeProps.propsData,
        ...props,
      };

      vnode.componentOptions.propsData = newVnodeProps;
      return vnode;
    },
    handleSlot({ type, name, render, actions }) {
      if (render) {
        const scoped = {
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
        return scoped;
      } else if (type && type === "operation") {
        const scoped = {
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
        return scoped;
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
    renderOperationItem({ type, click, label, hide }, row) {
      if (hide && typeof hide === "function") {
        const flag = hide(row);
        if (flag) return null;
      }

      switch (type) {
        case "link":
          return (
            <el-link
              type="primary"
              onClick={() => {
                click(row);
              }}
            >
              {label}
            </el-link>
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
          <BLM-table pagination={this.pagination} data={this.data}>
            {this.renderTableColumn()}
          </BLM-table>
        )}
      </div>
    );
  },
};
