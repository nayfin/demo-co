import { text, number, boolean } from '@storybook/addon-knobs';
import { ImageViewerComponent } from './image-viewer.component';

export default {
  title: 'ImageViewerComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: []
  },
  component: ImageViewerComponent,
  props: {
    imageUrl: text('imageUrl', ''),
    imageDescription: text('imageDescription', ''),
  }
})