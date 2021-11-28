/**
 * 一些配置字段类型为booler or function，eg disabled字段。在此确定他们的返回值
 * @param {*} schemaItem eg disabled
 * @param {*} ctx eg disabled 为函数时要确定它的this
 * @returns booler
 */
const handleFnToBooler = (schemaItem, ctx) => {
  if (typeof schemaItem === "boolean") return schemaItem;
  if (typeof schemaItem === "function") return schemaItem.call(ctx);
};

export { handleFnToBooler };
