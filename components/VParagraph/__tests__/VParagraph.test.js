import TestHelpers from '@@/.config/jest/TestHelpers'
import Paragraph from './../VParagraph'

let testHelpers

describe('VParagraph', () => {
  describe('Slots', () => {
    beforeEach(() => {
      testHelpers = new TestHelpers(Paragraph, {
        context: {
          children: ['slot text'],
        },
      })
    })
    it('slot renders text', () => {
      const slot = testHelpers.wrapper.find('.paragraph')
      expect(slot.text()).toBe('slot text')
    })
  })

  describe('domProps renders correct text', () => {
    beforeEach(() => {
      testHelpers = new TestHelpers(Paragraph, {
        context: {
          domProps: { innerHTML: 'inner html works' },
        },
      })
    })

    it('inner html text is correct', () => {
      const slot = testHelpers.wrapper.find('.paragraph')
      expect(slot.text()).toBe('inner html works')
    })
  })
})
