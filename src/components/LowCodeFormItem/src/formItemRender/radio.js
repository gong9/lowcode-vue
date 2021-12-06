/**
 * @file radio
 */

export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;
  const { dataSourceName } = ctx.$attrs;
  const { name, props = {}, options = [] } = schema;

  const renderOptions = (options) => {
    return options.map((item) => {
      return (
        <el-radio label={item.value} {...props}>
          {item.label}
        </el-radio>
      );
    });
  };

  return (
    <el-radio-group
      value={ctx.$parent[dataSourceName][name]}
      on-input={(value) => {
        ctx.$parent[dataSourceName][name] = value;
      }}
    >
      {renderOptions(options)}
    </el-radio-group>
  );
};
