<template>
  <section class="mod-layout-main">
    <div class="left" ref="left">
      <slot name="left"></slot>
    </div>
    <div class="right" ref="right">
      <slot name="right"></slot>
    </div>
  </section>
</template>

<script>
  export default {
    name: 'LayoutMain',
    mounted () {
      this.contentAnimation()
    },
    methods: {
      contentAnimation () {
        let oLeft = this.$refs.left
        let oRight = this.$refs.right
        oLeft.className = 'left leftMove'
        oRight.className = 'right rightMove'
        oLeft.addEventListener('animationend', () => {
          oLeft.className = 'left'
        })
        oRight.addEventListener('animationend', () => {
          oRight.className = 'right'
        })
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .mod-layout-main
    @include display-flex()
    @include justify-content()
    width: $baseWidth
    margin: $baseGap auto
    .left
      position: relative
      width: ($baseWidth - $baseGap) * 0.75
    .right
      position: relative
      width: ($baseWidth - $baseGap) * 0.25
    .leftMove
      @include animation(leftMove $baseTransition ease)
      @include animation-fill-mode(forwards)
    .rightMove
      @include animation(rightMove $baseTransition ease)
      @include animation-fill-mode(forwards)
  @include keyframes(leftMove)
    from
      left: -200px
      @include opacity(0)
    to
      left: 0
      @include opacity(100)
  @include keyframes(rightMove)
    from
      right: -200px
      @include opacity(0)
    to
      right: 0
      @include opacity(100)
</style>
