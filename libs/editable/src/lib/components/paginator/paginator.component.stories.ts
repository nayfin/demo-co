import { action } from '@storybook/addon-actions';
import { text, number, boolean } from '@storybook/addon-knobs';
import { PaginatorComponent } from './paginator.component';

export default {
  title: 'PaginatorComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: PaginatorComponent,
  props: {
    totalPages: number('totalPages', 10),
    currentPage: number('currentPage', 5),
    increment: action('increment'),
    decrement: action('decrement')
  }
});
