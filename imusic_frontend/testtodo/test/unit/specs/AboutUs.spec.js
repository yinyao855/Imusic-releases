import Vue from 'vue'
import AboutUs from '@/components/AboutUs'

describe('AboutUs.vue', () => {
  it('should render correct contents', () => {
    const Constructor = Vue.extend(AboutUs)
    const vm = new Constructor().$mount()
    expect(vm.$el.querySelector('.about h1').textContent)
      .to.equal('About Us')
  })
})
