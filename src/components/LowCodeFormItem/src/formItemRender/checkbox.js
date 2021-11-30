// todo 先完善多选的

export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;
  const { dataSourceName } = ctx.$attrs;
  const { name, options = [], props = {} } = schema;
  const { checkboxType } = props;
  const renderCheckbox = (options) => {
    return options.map((option) => {
      return <el-checkbox label={option.label}></el-checkbox>;
    });
  };

  // element的复选框又可以划分成两种类型 1.单个场景比如开关、切换; 2.多个的就是正常的复选框
  if (checkboxType !== "single") {
    return (
      <el-checkbox-group
        value={ctx.$parent[dataSourceName][name]}
        on-input={(value) => {
          ctx.$parent[dataSourceName][name] = value;
        }}
      >
        {renderCheckbox(options)}
      </el-checkbox-group>
    );
  } else {
    return <el-checkbox></el-checkbox>;
  }
};
