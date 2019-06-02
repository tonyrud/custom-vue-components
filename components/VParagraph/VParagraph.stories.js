import { storiesOf } from '@storybook/vue'
import { withKnobs, text } from '@storybook/addon-knobs'
import VParagraph from './VParagraph'

const stories = storiesOf('Content', module)

stories.addDecorator(withKnobs)

stories.add('VParagraph', () => ({
  components: { VParagraph },
  props: {
    text: {
      default: text('slot', 'Hello paragraph'),
    },
  },
  template: `
      <VParagraph>{{text}}</VParagraph>
    `,
  data: () => ({}),
}))
