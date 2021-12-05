import InputRender from "./formItemRender/input";
import SelectRender from "./formItemRender/select";
import SwitchRender from "./formItemRender/switch";
import CheckBoxRender from "./formItemRender/checkbox";
import RadioRender from "./formItemRender/radio";

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
        {type === "switch" && (
          <SwitchRender
            schema={this.schema}
            ctx={this.ctx || this}
            createEle={h}
          />
        )}
        {type === "checkbox" && (
          <CheckBoxRender
            schema={this.schema}
            ctx={this.ctx || this}
            createEle={h}
          />
        )}
        {type === "radio" && (
          <RadioRender
            schema={this.schema}
            ctx={this.ctx || this}
            createEle={h}
          />
        )}
      </fragment>
    );
  },
};
