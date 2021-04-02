import { addDecorator } from '@storybook/angular';
import { withKnobs } from '@storybook/addon-knobs';
import { setCompodocJson } from '@storybook/addon-docs/angular';
import compodocJson from '../../../dist/compodoc/editable/documentation.json';

setCompodocJson(compodocJson);
addDecorator(withKnobs);
