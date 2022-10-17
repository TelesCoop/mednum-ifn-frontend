<template>
  <div>
    <input type="checkbox" :value="value" @change="emitValue" />
    <label>
      {{ name }}
      <span class="field__separator">|</span>
      <div class="field__source" v-if="source">
        {{ source }}
      </div>
    </label>
  </div>
</template>
<script lang="ts">
// eslint-disable-next-line no-unused-vars
import Vue, { PropType } from "vue";

export default Vue.extend({
  props: {
    value: {
      type: Boolean,
    },
    source: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
  },
  computed: {},
  methods: {
    emitValue(e: Event) {
      this.$emit("updateFilters", {
        [this.field]: (e.target as HTMLInputElement).checked,
      });
    },
  },
});
</script>
<style>
.field {
  padding: 0.5rem;
}
.field__source {
  color: #989898;
}
.field__separator {
  margin-right: 5px;
}
</style>
