<template>
  <section class="page page-article-list">
    <VHeader :is-other="true"></VHeader>
    <section class="mod-bd">
      <div class="tab">
        <h2 class="mod-shadow tab-item technical-item" :class="{ 'active': curType === 'technical' }" @click="tabChange('technical')">技术</h2>
        <h2 class="mod-shadow tab-item journal-item" :class="{ 'active': curType === 'journal' }" @click="tabChange('journal')">! 技术</h2>
      </div>
      <LayoutMain>
        <template slot="left">
          <div class="tab-content">
            <ul class="article-list">
              <li class="mod-shadow article-item" v-for="item in list" :key="item._id">
                <h3 class="title"><a :href="`/article/detail/${item._id}`">{{  item.title }}</a></h3>
                <div class="about">
                  <p class="text">{{ item.about }}</p>
                  <div class="img" v-lazy:background-image="`//xiongwengang.xyz${item.cover}`"></div>
                </div>
                <Tags :tags="item.tags"></Tags>
              </li>
            </ul>
          </div>
          <Loading :loading="loading" :hasMore="hasMore"></Loading>
        </template>
        <template slot="right">
          <div v-fixed="228">
            <!-- <div class="mod-shadow search">
              <i class="iconfont icon-search"></i>
              <input type="text" placeholder="搜索文章">
            </div> -->
            <SideCard title="标签" row="multi" :data="tagList">
              <template slot="tags" slot-scope="props">
                <dd class="dd-tags">
                  <a :href="`${curType}/${props.tagName}`" v-ripple>
                    <h3>{{ props.tagName }}</h3>
                    <span class="num">{{ props.count }}</span>
                  </a>
                </dd>
              </template>
            </SideCard>
          </div>
        </template>
      </LayoutMain>
    </section>
    <VFooter></VFooter>
    <BackTop :distance="74"></BackTop>
  </section>
</template>

<script>
  import VHeader from '~/components/Header'
  import VFooter from '~/components/Footer'
  import LayoutMain from '~/components/LayoutMain'
  import Tags from '~/components/Tags'
  import SideCard from '~/components/SideCard'
  import BackTop from '~/components/BackTop'
  import Loading from '~/components/Loading'
  import axios from 'axios'

  export default {
    name: 'ArticleList',
    components: {
      VHeader,
      VFooter,
      LayoutMain,
      Tags,
      SideCard,
      BackTop,
      Loading
    },
    asyncData ({ params, error }) {
      let opts = {
        baseUrl: 'http://admin.xiongwengang.xyz/api/blog/getArticle',
        pageCurrent: 1,
        pageSize: 5
      }
      let tag = params.tag ? `&tag=${encodeURI(params.tag)}` : ''
      let query = `?pageCurrent=${opts.pageCurrent}&pageSize=${opts.pageSize}&type=${params.type}${tag}`
      return axios.get(opts.baseUrl + query).then((res) => {
        return {
          list: res.data.data,
          tagList: res.data.tags,
          baseUrl: opts.baseUrl,
          pageCurrent: opts.pageCurrent,
          pageSize: opts.pageSize,
          curType: params.type,
          curTag: params.Tag
        }
      }).catch((e) => {
        error({ statusCode: 404, message: '接口请求报错！' })
      })
    },
    head () {
      let title = this.curType === 'technical' ? '技术文章' : '日志'
      let description = this.curType === 'technical' ? '技术文章主要关于前端（javascript、css、html等）、全栈建站（linux、nodejs、mongodb等）的栏目分类' : '日志主要是关于星座、撩妹、旅游、骗局等的栏目分类'
      return {
        title: `${title}-熊文刚的博客`,
        meta: [
          { hid: 'description', name: 'description', content: description }
        ]
      }
    },
    data () {
      return {
        loading: false,
        hasMore: true
      }
    },
    mounted () {
      window.addEventListener('scroll', () => {
        let srcollTop = document.body.scrollTop || document.documentElement.scrollTop
        let clientHeight = window.innerHeight
        let scrollHeight = document.body.scrollHeight || document.documentElement.scrollHeight
        let page = this.pageCurrent + 1
        setTimeout(() => {
          if (srcollTop + clientHeight === scrollHeight && this.hasMore) {
            this.loading = true
            axios.get(`${this.baseUrl}?pageCurrent=${page}&pageSize=${this.pageSize}&type=${this.curType}`).then((res) => {
              if (res.data.data.length > 0) {
                this.hasMore = true
                this.pageCurrent = page
                this.list = this.list.concat(res.data.data)
              } else {
                this.hasMore = false
              }
            })
          }
        }, 500)
      }, false)
    },
    methods: {
      tabChange (type) {
        this.$router.push(type)
      }
    }
  }
</script>

<style lang="sass">
  @import '~assets/sassCore/_function.scss'

  .page-article-list
    @include display-flex()
    @include flex-direction()
    height: 100%
    .tab
      @include display-flex()
      width: $baseWidth
      margin: $baseGap auto 0
      .tab-item
        width: $baseWidth / 2
        line-height: $baseHeight
        text-align: center
        font-size: $titleFontSize
        background-size: cover
      .technical-item, .journal-item
        cursor: pointer
        color: $themeColor
      .technical-item.active, .journal-item.active
        color: $white
      .technical-item
        background-image: url('~static/image/technical.png')
      .technical-item.active
        background-image: url('~static/image/technical-active.png')
      .journal-item
        background-image: url('~static/image/journal.png')
      .journal-item.active
        background-image: url('~static/image/journal-active.png')
    .left
      .article-item
        padding: $baseGap $baseGap * 1.5
        margin-bottom: $baseGap
        background-color: $white
        border-radius: $baseRadius
      .title
        margin-bottom: $baseGap / 2
        font-size: 20px
        a
          color: $themeColor
          transtion: $baseTransition
      .title:hover
        a
          color: lighten($themeColor, 20%)
      .about
        position: relative
        height: $baseImgHeight * 6
        margin-bottom: $baseGap / 2
      .text
        padding-right: $baseImgWidth * 6 + $baseGap
        text-align: justify
        line-height: $baseFontSize * 2
        @include ellipsis(4)
      .img
        position: absolute
        top: 50%
        right: 0
        width: $baseImgWidth * 6
        height: $baseImgHeight * 6
        margin-top: -$baseImgHeight * 3
        background-position: center
        background-size: cover
        border-radius: $baseRadius
    .right
      .search
        @include display-flex()
        @include justify-content(flex-start)
        @include align-items()
        height: $baseHeight * 0.6
        margin-bottom: $baseGap
        font-size: $baseFontSize
        background-color: $white
        border-radius: $baseRadius
        input
          border: none
          color: lighten($themeColor, 40%)
          &::-webkit-input-placeholder
            color: lighten($themeColor, 40%)
      .icon-search
          margin-left: $baseGap
          margin-right: $baseGap / 2
          margin-top: -2px
          color: lighten($themeColor, 40%)
</style>
