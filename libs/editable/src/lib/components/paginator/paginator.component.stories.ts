import { select, number } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';

import { PaginatorComponent } from './paginator.component';

export default {
  title: 'PaginatorComponent',
  component: PaginatorComponent
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: PaginatorComponent,
  props: {
    totalPages: number('totalPages', 0),
    currentPage: number('currentPage', 0),
    size: select('size', ['sm', 'md', 'lg'], 'md'),
    increment: action('increment'),
    decrement: action('decrement')
  }
})
