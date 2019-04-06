<template lang="pug">
div
  q-page-container
    q-page.row(style='padding-top: 56px;')
      .bg-grey-3.col-grow.relative.overflow-hidden
        .absolute.fit.flip.scroll.py-4(
          @wheel='handleScroll',
          ref='scrollArea'
        )
          feathers-vuex-find(
            service='messages',
            :query='query',
            :fetchQuery='fetchQuery'
            watch='query',
            :qid='$route.params.convoUuid'
          )
            .max-w-xl.mx-auto.px-4.w-full(
              slot-scope='{items: messages, pagination}'
            )
              template(v-for='message, i in displayMessages(messages)')
                q-chat-message.flip(
                  v-if='message && message.author',
                  :bg-color='message.author.uuid === user.uuid ? "blue-grey-8" : "blue-grey-2"',
                  :text-color='message.author.uuid === user.uuid ? "white" : "high"',
                  :name='message.author.username',
                  :stamp='message.createdAt | dateRecent',
                  :label='message.label && $options.filters.dateFormat(message.createdAt, "MMM D")',
                  :text='message.body',
                  :sent='message.author.uuid === user.uuid'
                )
                  template(v-slot:avatar)
                    template(v-if='message.author.uuid !== user.uuid')
                      q-avatar.mr-3(:color='profileColor(message.author.createdAt)', text-color='white')
                        template(v-if='message.author.avatar') #[img(:src='message.author.avatar', :ratio='1')]
                        template(v-else) #[span.text-h6 {{message.author.username.slice(0, 1).toUpperCase()}}]
  q-footer
    q-no-ssr
      messages-send
</template>

<script>
import {mapState, mapGetters} from 'vuex'
import {debounce, date, dom, scroll} from 'quasar'

import {feathersClient} from '@/store'
import {meta, titleTemplate} from '@/meta'
import profileColor from '@/mixins/profile-color'
import MessagesSend from '@/components/MessagesSend'

export default {
  name: 'ConvoUuidPage',

  meta () {
    return {
      title: 'Messages', // this.title,
      meta: {
        description: {
          name: 'description',
          content: meta.description
        }
      }
    }
  },

  mixins: [profileColor],
  components: {MessagesSend},

  data: () => ({
    // loadMore: true,
    queryLimit: 12,
    querySkip: 0,
    wait: false
  }),

  computed: {
    ...mapState('auth', ['user']),
    query () {
      return !this.$store.state.utils.authLoaded ? null : {
        convoUuid: this.$route.params.convoUuid,
        $sort: {createdAt: -1},
        $limit: this.queryLimit
      }
    },
    fetchQuery () {
      return {
        convoUuid: this.$route.params.convoUuid,
        $sort: {createdAt: -1},
        $skip: this.querySkip,
        $limit: 12
      }
    }
  },

  async mounted () {
    if (this.$store.state.utils.authLoaded) {
      // Trigger read receipts hook on the server when convo loads
      await this.readReceipts()
    }
    feathersClient.service('messages').on('created', this.handleNewMessage)
  },

  beforeRouteUpdate (to, from, next) {
    this.queryLimit = 12
    this.querySkip = 0
    next()
  },

  methods: {
    displayMessages (messages) {
      return messages
        .map(message => ({...message, body: [message.body]}))
        .reduce((arr, message, i) => {
          // Add a date label to the first message
          if (i === messages.length - 1) {
            return arr.concat({...message, label: true})
          }
          // Add a label between messages that are about a day old
          const d = _ => new Date(_)
          const timePassed = i === messages.length - 1 ? 0 : Math.abs(date.getDateDiff(d(message.createdAt), d(messages[i + 1].createdAt), 'hours'))
          return arr.concat({...message, ...(timePassed > 18 ? {label: true} : {})})
        }, [])
    },

    async readReceipts (userUuid) {
      const {Convo} = await this.$FeathersVuex
      const convo = await Convo.get(this.$route.params.convoUuid)
      const group = convo && convo.groups.find(({userUuid: u}) => u === this.user.uuid)
      await group && group.patch({})
    },

    async handleNewMessage (message) {
      this.queryLimit += 1
      // Ensure that receipts and messages arrive to clients
      const convo = await this.$FeathersVuex.Convo.get(message.convoUuid)
      // TODO: handle this on server using socket listeners
      if (message.convoUuid === this.$route.params.convoUuid) {
        await this.readReceipts()
      }
    },

    handleScroll (e) {
      // TODO: fix this hack.. rafctor with QInfiniteScroll(reverse)
      e.preventDefault()

      if (this.$store.state.messages.findPending) return

      const pagination = this.$store.state.messages.pagination[this.$route.params.convoUuid]
      const ref = this.$refs.scrollArea
      const {scrollTop} = ref

      this.$refs.scrollArea.scrollTop = scrollTop + (e.deltaY * -1)

      const scrollHeight = scroll.getScrollHeight(ref)
      const scrollPosition = scroll.getScrollPosition(ref)
      const containerHeight = dom.height(ref)

      const inPosition = scrollPosition + containerHeight + 50 >= scrollHeight
      const inRange = pagination && pagination.total >= this.queryLimit

      if (inPosition && inRange) {
        this.querySkip += 12
        this.queryLimit += 12
      }
    }
  }
}
</script>

<style lang="stylus">
.flip
  transform rotateX(180deg)

.q-message-text
  max-width 60ch
  line-height 1.35
</style>
