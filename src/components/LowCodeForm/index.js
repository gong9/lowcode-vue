/**
 * file: 表格组件封装
 */

import handleVnode from "../../mixins/handleVnode";
export default {
  name: "lowcode-ele-form",
  mixins: [handleVnode],
  props: {
    data: {
      type: Object,
    },
    schema: {
      type: Array,
    },
  },
  data: function () {
    return {
      a: [],
    };
  },
  methods: {
    renderAllFormItem(schema) {
      return schema.map((formItemSchema) => {
        return this.renderFormItem(formItemSchema);
      });
    },
    renderFormItem(formItemSchema) {
      const { type, label, name } = formItemSchema;
      switch (type) {
        case "input":
          return this.renderInput(formItemSchema);
        case "select":
          return this.renderSelect(formItemSchema);
        case "date":
          return null;
        case "switch":
          return this.renderSwitch(formItemSchema);
        case "checkbox":
          return this.renderCheckbox(formItemSchema);
        case "radio":
          return this.renderRadio(formItemSchema);
        case "textarea":
          return this.renderTextarea(formItemSchema);
        default:
          break;
      }
    },
    renderInput(formItemSchema) {
      const { name, label } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-input vModel={this.$parent[name]}></el-input>
        </el-form-item>
      );
    },
    renderSelect(formItemSchema) {
      const { name, label, options = [] } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-select vModel={this.$parent[name]} placeholder="请选择活动区域">
            {this.renderOptions(options)}
          </el-select>
        </el-form-item>
      );
    },
    renderOptions(options) {
      return options.map((option) => {
        const { label, value } = option;
        return <el-option label={label} value={value}></el-option>;
      });
    },
    renderDatePicker() {},
    renderSwitch(formItemSchema) {
      const { name, label } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-switch vModel={this.$parent[name]}></el-switch>
        </el-form-item>
      );
    },
    renderCheckbox(formItemSchema) {
      const { label, name, options = [] } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-checkbox-group vModel={this.a}>
            {this.renderCheckboxItem(options)}
          </el-checkbox-group>
        </el-form-item>
      );
    },
    renderCheckboxItem(allCheckbox) {
      return allCheckbox.map((checkboc) => {
        const { label, value } = checkboc;
        return <el-checkbox label={label} value={value}></el-checkbox>;
      });
    },
    renderRadio(formItemSchema) {
      const { name, label, options } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-radio-group vModel={this.$parent[name]}>
            {this.renderRadioItem(options)}
          </el-radio-group>
        </el-form-item>
      );
    },
    renderRadioItem(options) {
      return options.map((radio) => {
        const { label } = radio;
        return <el-radio label={label}></el-radio>;
      });
    },
    renderTextarea(formItemSchema) {
      const { name, label } = formItemSchema;
      return (
        <el-form-item label={label}>
          <el-input type="textarea" vModel={this.$parent[name]}></el-input>
        </el-form-item>
      );
    },
    renderActions() {},
  },
  render: function (h) {
    return (
      <div>
        {this.handleVnodeProp(
          <el-form label-width="80px">
            {this.renderAllFormItem(this.schema)}
          </el-form>
        )}
      </div>
    );
  },
};
