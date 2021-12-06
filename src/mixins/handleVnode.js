export default {
  methods: {
    /**
     * 将使用方的属性和事件或自定义props、events重新注入此vnode
     * @param {*} vnode
     * @returns vnode
     */
    handleVnodeProp(vnode, custom = {}) {
      const { props, events } = custom;
      const fromUserEvent = events ? events : this._events; // event
      const otherBLMProps = props ? props : this.$attrs; // props

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
    handleInjectPorps(vnode, props) {
      const vnodeProps = vnode.componentOptions.propsData;
      vnode.componentOptions.propsData = {
        ...vnodeProps,
        ...props,
      };
      return vnode;
    },
  },
};
