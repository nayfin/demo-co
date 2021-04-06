import { text, number, boolean } from '@storybook/addon-knobs';
import { TextModule } from '../text/text.module';
import { ImageViewerComponent } from './image-viewer.component';

export default {
  title: 'ImageViewerComponent'
}

export const primary = () => ({
  moduleMetadata: {
    imports: [
      TextModule
    ],
  },
  component: ImageViewerComponent,
  props: {
    imageUrl: text('imageUrl', ''),
    imageDescription: text('imageDescription', ''),
  }
})
