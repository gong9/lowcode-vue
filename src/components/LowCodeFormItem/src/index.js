import inputRender from "./formItemRender/input";

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
          <inputRender
            schema={this.schema}
            ctx={this.ctx || this}
            createEle={h}
          />
        )}
      </fragment>
    );
  },
};
