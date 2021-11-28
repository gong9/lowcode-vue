import InputRender from "./formItemRender/input";
import SelectRender from "./formItemRender/select";

export default {
  name: "lowcode-form-item",
  props: {
    schema: {
      type: Object,
    },
    ctx: {
      type: Object,
    },
  },
  render: function (h) {
    const { type } = this.schema;
    return (
      <fragment>
        {type === "input" && (
          <InputRender
            schema={this.schema}
            ctx={this.ctx || this}
            createEle={h}
          />
        )}

        {type === "select" && (
          <SelectRender
            schema={this.schema}
            ctx={this.ctx || this}
            createEle={h}
          />
        )}
      </fragment>
    );
  },
};
