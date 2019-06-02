import { storiesOf } from '@storybook/vue'
import { withKnobs, text, boolean, select } from '@storybook/addon-knobs'
import VHeadline from './VHeadline'

const stories = storiesOf('Content', module)

const options = {
  h1: '1',
  h2: '2',
  h3: '3',
  h4: '4',
  h5: '5',
  h6: '6',
}

stories.addDecorator(withKnobs)

stories.add('VHeadline', () => ({
  components: { VHeadline },
  props: {
    upper: {
      default: boolean(':upper', false),
    },
    subHeader: {
      default: boolean(':subHeader', false),
    },
    level: {
      default: select(':level', options, '1'),
    },
    text: {
      default: text('slot', 'Hello Storybook'),
    },
  },
  template: `
      <VHeadline
        :level="level"
        :sub-header="subHeader"
        :upper="upper"
      >{{text}}</VHeadline>
    `,
  data: () => ({}),
}))
