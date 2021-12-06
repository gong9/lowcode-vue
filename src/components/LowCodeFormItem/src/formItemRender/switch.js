import { handleInjectPorps } from "../../../../util/tool";

export default (renderContext) => {
  const {
    props: { schema, ctx },
  } = renderContext;
  const { name, props } = schema;
  const { dataSourceName } = ctx.$attrs;
  return handleInjectPorps(
    <el-switch
      value={ctx.$parent[dataSourceName][name]}
      onChange={(value) => {
        ctx.$parent[dataSourceName][name] = value;
      }}
    ></el-switch>,
    props
  );
};
