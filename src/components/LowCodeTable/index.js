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
    renderOperationItem({ type, click, label }, row) {
      // todo 调用click时把其this确定在使用方的实例上
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
          <el-table data={this.data} border>
            {this.renderTableColumn()}
          </el-table>
        )}
      </div>
    );
  },
};
