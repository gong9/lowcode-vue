export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;
  const { dataSourceName } = ctx.$attrs;
  const { name, placeholder, options = [] } = schema;

  const renderOptions = (options) => {
    return options.map((option) => {
      return (
        <el-option
          key={option.value}
          label={option.label}
          value={option.value}
        ></el-option>
      );
    });
  };

  return (
    <div>
      <el-select
        value={ctx.$parent[dataSourceName][name]}
        onChange={(value) => {
          ctx.$parent[dataSourceName][name] = value;
        }}
        placeholder={placeholder}
      >
        {renderOptions(options)}
      </el-select>
    </div>
  );
};
