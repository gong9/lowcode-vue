export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;
  const { dataSourceName } = ctx.$attrs;
  const { name, placeholder, options = [] } = schema;

  return (
    <el-radio-group>
      <el-radio label="3">备选项</el-radio>
      <el-radio label="6">备选项</el-radio>
      <el-radio label="9">备选项</el-radio>
    </el-radio-group>
  );
};
