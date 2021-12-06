/**
 * @file textArea
 */

export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;
  const { dataSourceName } = ctx.$attrs;
  const { name, props = {} } = schema;
  return (
    <el-input
      type="textarea"
      {...props}
      value={ctx.$parent[dataSourceName][name]}
      on-input={(value) => {
        ctx.$parent[dataSourceName][name] = value;
      }}
    ></el-input>
  );
};
