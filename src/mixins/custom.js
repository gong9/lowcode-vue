export default {
  props: ["defaultValue"],

  watch: {
    value(newVal) {
      this.$emit("custom-comp", newVal);
    },
  },
  mounted() {
    this.value = this.defaultValue;
  },
};
