import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import * as components from 'vuetify/components';
import * as labsComponents from 'vuetify/labs/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';
import { Skeleton } from 'vue-loading-skeleton';

// In jsx template
const vuetify = createVuetify({
  components: { ...components, ...labsComponents, Skeleton },
  directives,
});

export default vuetify;
