import { shallowMount } from '@vue/test-utils'
import Paragraph from './../VParagraph'

let testHelpers

describe('VParagraph', () => {
  let wrapper
  describe('Slots', () => {
    beforeEach(() => {
      wrapper = shallowMount(Paragraph, {
        context: {
          children: ['slot text'],
        },
      })
    })
    it('slot renders text', () => {
      const slot = wrapper.find('.paragraph')
      expect(slot.text()).toBe('slot text')
    })
  })

  describe('domProps renders correct text', () => {
    beforeEach(() => {
      wrapper = shallowMount(Paragraph, {
        context: {
          domProps: { innerHTML: 'inner html works' },
        },
      })
    })

    it('inner html text is correct', () => {
      const slot = wrapper.find('.paragraph')
      expect(slot.text()).toBe('inner html works')
    })
  })
})
