import Headline from './VHeadline'
import { shallowMount } from '@vue/test-utils'

const propsData = {
  upper: false,
  level: '2',
  subHeader: true,
}

describe('Headline', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(Headline, {
      propsData,
    })
  })

  describe('Props', () => {
    it(':upper should be set to false', () => {
      expect(wrapper.props().upper).toBeFalsy()
    })

    it(':subHeader prop should have correct text', () => {
      expect(wrapper.props().subHeader).toBeTruthy()
    })

    it(':level prop is correct', () => {
      expect(wrapper.props().level).toEqual('2')
    })
  })

  describe('Markup and class changes', () => {
    it(':upper sets correct classes', () => {
      const headlineEl = wrapper.find('.heading__text')
      expect(headlineEl.classes()).not.toContain('upper')
      wrapper.setProps({ upper: true })
      expect(headlineEl.classes()).toContain('upper')
    })

    it(':level changes classes', () => {
      const headlineEl = wrapper.find('.heading__text')
      expect(headlineEl.classes()).toContain('h2')
      wrapper.setProps({ level: '3' })
      expect(headlineEl.classes()).not.toContain('h1')
      expect(headlineEl.classes()).toContain('h3')
    })
  })

  describe('Slots', () => {
    beforeEach(() => {
      wrapper = shallowMount(Headline, {
        slots: {
          default: 'slot text',
        },
      })
    })

    it('slot renders text', () => {
      const slot = wrapper.find('.heading__text')
      expect(slot.text()).toBe('slot text')
    })
  })
})
