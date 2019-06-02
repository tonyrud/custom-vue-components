<script>
export default {
  name: 'VParagraph',
  functional: true,
  render(h, ctx) {
    const text = ctx.data.domProps ? ctx.data.domProps.innerHTML : ctx.children
    return <p class="paragraph">{text}</p>
  },
}
</script>

<style scoped rel="stylesheet/scss" lang="scss" type="text/scss">
.paragraph {
  color: #444;
  margin: 1.6rem auto 1.2rem;
  margin-bottom: 1em;
  max-width: 179.2rem;
}
</style>
