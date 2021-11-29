export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;

  const {
    name,
    options,
    props: { checkboxType },
  } = schema;

  const renderCheckbox = (options) => {
    options.map((option) => {
      return <el-checkbox label={option.label}></el-checkbox>;
    });
  };

  if (checkboxType === "group") {
    return <el-checkbox-group>{renderCheckbox(options)}</el-checkbox-group>;
  } else {
    return <el-checkbox disabled>备选项1</el-checkbox>;
  }
};
