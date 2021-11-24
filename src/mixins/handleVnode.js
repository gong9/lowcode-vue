export default {
  methods: {
    /**
     * 将使用方的属性和事件重新注入blmtable
     * @param {*} vnode
     * @returns vnode
     */
    handleTableVnode(vnode) {
      const fromUserEvent = this._events; // event
      const otherBLMProps = this.$attrs; // props

      const currentEvent = vnode.componentOptions.listeners;
      const vnodeProps = vnode.componentOptions.propsData;

      vnode.componentOptions.listeners = {
        ...currentEvent,
        ...fromUserEvent,
      };

      vnode.componentOptions.propsData = {
        ...vnodeProps,
        ...otherBLMProps,
      };
      return vnode;
    },

    /**
     * 向vnode中注入prop
     * @param {*} vnode
     * @param {*} props
     * @returns vnode
     */
    handleColVnode(vnode, props) {
      const vnodeProps = vnode.componentOptions.propsData;
      vnode.componentOptions.propsData = {
        ...vnodeProps,
        ...props,
      };
      return vnode;
    },
  },
};
