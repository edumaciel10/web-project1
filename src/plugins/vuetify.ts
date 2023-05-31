import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';
import  * as components from 'vuetify/labs/components';

const vuetify = createVuetify({
  components,
  directives,
});

export default vuetify;
