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
    totalPages: number('totalPages', 0),
    currentPage: number('currentPage', 0),
    size: text('size', 'md'),
  }
})