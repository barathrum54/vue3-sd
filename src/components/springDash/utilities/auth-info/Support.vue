<template>
  <div class="support">
    <sdPopover placement="bottomLeft" action="click">
      <template v-slot:content>
        <NestedDropdwon>
          <div class="support-dropdwon">
            <ul>
              <sdHeading as="h5">Documentation</sdHeading>
              <li>
                <a to="#">How to customize admin</a>
              </li>
              <li>
                <a to="#">How to use</a>
              </li>
              <li>
                <a to="#">The relation of vertical spacing</a>
              </li>
            </ul>
            <ul>
              <sdHeading as="h5">Payments</sdHeading>
              <li>
                <a to="#">How to customize admin</a>
              </li>
              <li>
                <a to="#">How to use</a>
              </li>
            </ul>
            <ul>
              <sdHeading as="h5">Content Planner</sdHeading>
              <li>
                <a to="#">How to customize admin</a>
              </li>
              <li>
                <a to="#">How to use</a>
              </li>
            </ul>
          </div>
        </NestedDropdwon>
      </template>
      <a to="#" class="head-example">
        <sdFeatherIcons type="help-circle" size="20" />
      </a>
    </sdPopover>
  </div>
</template>

<script>
import { NestedDropdwon } from './auth-info-style';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Support',
  components: {
    NestedDropdwon,
  },
});
</script>
