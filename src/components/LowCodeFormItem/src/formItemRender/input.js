import { handleFnToBooler } from "../../../../util/tool";

export default (renderContext) => {
  const {
    props: { schema, ctx, createEle },
  } = renderContext;
  const { placeholder, disabled, slot, props = {}, name } = schema;
  const { dataSourceName } = ctx.$attrs;
  let { size, clearable, showPassword, suffixIcon, prefixIcon } = props;

  // 属性格式的icon和slot格式的同时存在以slot为准
  suffixIcon = slot ? "" : suffixIcon;

  const isDisabled = () => {
    if (disabled) return handleFnToBooler(disabled, ctx.$parent);
    return false;
  };

  /**
   * input 图标插槽
   * @param {*} slot
   * @returns slot vnode
   */
  const handleSlot = (slot) => {
    if (typeof slot !== "function") return null;
    const slotVnode = slot.call(ctx.$parent, createEle);
    const slotVnodeName = slotVnode.data.slot;

    return <template slot={slotVnodeName}>{slotVnode}</template>;
  };

  return (
    <el-input
      placeholder={placeholder}
      disabled={isDisabled()}
      clearable={clearable}
      show-password={showPassword}
      prefix-icon={prefixIcon}
      suffix-icon={suffixIcon}
      size={size}
      value={ctx.$parent[dataSourceName][name]}
      onInput={(value) => {
        ctx.$parent[dataSourceName][name] = value;
      }}
    >
      {handleSlot(slot)}
    </el-input>
  );
};
