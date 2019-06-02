// import TestHelpers from '@@/.config/jest/TestHelpers'
// import Headline from './../VHeadline'

// const propsData = {
//   upper: false,
//   level: '2',
//   subHeader: true,
// }

// let testHelpers

describe('Headline', () => {
  it('runs', () => {
    expect(true).toBe(true)
  })
  // beforeEach(() => {
  //   testHelpers = new TestHelpers(Headline, {
  //     propsData,
  //   })
  // })

  // describe('Props', () => {
  //   it(':upper should be set to false', () => {
  //     expect(testHelpers.wrapper.props().upper).toBeFalsy()
  //   })

  //   it(':subHeader prop should have correct text', () => {
  //     expect(testHelpers.wrapper.props().subHeader).toBeTruthy()
  //   })

  //   it(':level prop is correct', () => {
  //     expect(testHelpers.wrapper.props().level).toEqual('2')
  //   })
  // })

  // describe('Markup and class changes', () => {
  //   it(':upper sets correct classes', () => {
  //     const headlineEl = testHelpers.wrapper.find('.heading__text')
  //     expect(headlineEl.classes()).not.toContain('upper')
  //     testHelpers.wrapper.setProps({ upper: true })
  //     expect(headlineEl.classes()).toContain('upper')
  //   })

  //   it(':level changes classes', () => {
  //     const headlineEl = testHelpers.wrapper.find('.heading__text')
  //     expect(headlineEl.classes()).toContain('h2')
  //     testHelpers.wrapper.setProps({ level: '3' })
  //     expect(headlineEl.classes()).not.toContain('h1')
  //     expect(headlineEl.classes()).toContain('h3')
  //   })
  // })

  // describe('Slots', () => {
  //   beforeEach(() => {
  //     testHelpers = new TestHelpers(Headline, {
  //       slots: {
  //         default: 'slot text',
  //       },
  //     })
  //   })

  //   it('slot renders text', () => {
  //     const slot = testHelpers.wrapper.find('.heading__text')
  //     expect(slot.text()).toBe('slot text')
  //   })
  // })
})
