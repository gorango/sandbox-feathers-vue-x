<template lang='pug'>
  q-page.messages-page.max-w-xl.mx-auto
    q-layout(view='hhh lpr lfr', style='margin-top: -56px')
      q-drawer(
        :value='sidebarMessages',
        :width='sidebarWidth',
        :breakpoint='0',
        :behavior='sidebarMessages ? "default" : "desktop"',
        side='left',
        bordered,
        content-class='bg-white col'
      )
        .col-grow.flex-auto(style='width: 100%; height: calc(100% - 56px); margin-top: 56px')
          q-no-ssr.h-full
            q-tabs(
              v-model='sidebarTab',
              active-color='primary',
              align='justify'
            )
              q-tab(name='convos', label='Convos')
              q-tab(name='people', label='People')
            q-tab-panels(v-model='sidebarTab', style='height: calc(100% - 48px)', ref='sidebarPanels')
              q-tab-panel.p-0.relative(name='convos')
                .scroll.fit
                  .fixed.pin-b.pin-r.mr-6.mb-6
                    q-btn(fab icon='fal fa-plus', color='primary', @click='$refs.sidebarPanels.goTo("people")')
                  q-list(separator)
                    template(v-for='convo in convos')
                      q-item(
                        :key='convo.uuid',
                        clickable,
                        :disable='isFindPending',
                        v-ripple,
                        exact,
                        active-class='bg-blue-grey-1'
                        :to='{name: "MessagesConvoUuid", params: {convoUuid: convo.uuid}}'
                      )
                        q-item-section
                          q-item-label(
                            :class='convo.unseen ? "text-black" : "text-grey-9"'
                          )
                            span.text-caption.text-bold {{convo.displayTitle}}
                          template(v-if='convo.messages.length')
                            q-item-label(caption, v-clamp='1', :class='{"text-bold": convo.unseen}')
                              template(v-if='convo.messages[0].author')
                                | {{convo.messages[0].author.uuid === user.uuid ? 'You: ' : `${convo.messages[0].author.username}: `}}
                              | {{convo.messages[0].body}}
                        template(v-if='convo.unseen')
                          q-item-section(side, align='middle')
                            q-badge(align='middle', color='blue-grey-10')
                              | {{convo.unseen}}
              q-tab-panel.p-0(name='people')
                .scroll.fit(:style='scrollAreaStyle')
                  q-list(separator)
                    template(v-for='({uuid, avatar, username, createdAt}) in users')
                      q-item(clickable, ripple, @click='$refs[`check-${uuid}`][0].toggle()')
                        q-item-section(side)
                          q-avatar(:color='profileColor(createdAt)', text-color='white')
                            template(v-if='avatar') #[img(:src='avatar', :ratio='1')]
                            template(v-else) #[span.text-h6 {{username.slice(0, 1).toUpperCase()}}]
                        q-item-section
                          q-item-label {{username}}
                        q-item-section(side)
                          q-checkbox(v-model='selectedUsers', :val='uuid', :ref='`check-${uuid}`')
                template(v-if='selectedUsers.length')
                  q-toolbar.bg-white(style='border-top: 1px solid rgba(0, 0, 0, .12);')
                    .q-space
                    q-btn(rounded, color='primary', @click='createConvo') Start
      div
        router-view(:key='$route.fullPath')
</template>

<script>
import {mapState} from 'vuex'

import profileColor from '@/mixins/profile-color'
import {meta, titleTemplate} from '@/meta'
import MessagesSend from '@/components/MessagesSend'

export default {
  name: 'MessagesPage',

  meta: {
    title: 'Messages',
    titleTemplate,
    meta: {
      description: {
        name: 'description',
        content: meta.description
      }
    }
  },

  mixins: [profileColor],
  components: {MessagesSend},

  data: () => ({
    sidebarTab: 'convos',
    selectedUsers: []
  }),

  computed: {
    ...mapState('auth', ['user']),
    ...mapState('messages', ['isFindPending']),
    convos () {
      return ([...this.$store.getters['convos/list']])
        .sort(({updatedAt: a}, {updatedAt: b}) => new Date(b) - new Date(a))
        // TODO: filter on server side
        .filter(({groups}) => groups && groups
          .reduce((b, group) => b || group.userUuid === this.user.uuid, false))
    },
    users () {
      return this.$store.getters['users/list']
        .filter(({uuid}) => uuid !== this.user.uuid)
        // TODO: filter in query
        .sort(({updatedAt: a}, {updatedAt: b}) => new Date(b) - new Date(a))
    },
    sidebarMessages () {
      return !this.$route.params.convoUuid || this.$q.screen.gt.xs
    },
    sidebarWidth () {
      return this.$q.screen.gt.xs ? 300 : this.$q.screen.width
    },
    scrollAreaStyle () {
      return this.selectedUsers.length ? 'height: calc(100% - 56px) !important' : {}
    }
  },

  async mounted () {
    if (this.user && this.user.groups) {
      await this.$store.dispatch('users/find')
      const convoUuids = this.user.groups.map(({convoUuid}) => convoUuid)
      await this.$store.dispatch('convos/find', {query: {uuid: convoUuids, $sort: {updatedAt: -1}}})
    }
  },

  methods: {
    showReceipts (groups) {
      const group = ((groups && groups.filter(({userUuid}) => userUuid === this.user.uuid)) || [])[0]
      if (group && group.receipts) {
        const res = group.receipts.filter(({seen}) => !seen).length
        return res
      }
    },

    async createConvo () {
      const {uuid: convoUuid} = (await this.$store.dispatch('convos/create', {
        users: [this.user.uuid, ...this.selectedUsers]
      }) || {})
      if (convoUuid) {
        this.$router.push(`/messages/${convoUuid}`)
      }
    }
  }
}
</script>

<style lang="stylus">
.messages-page
  .q-drawer--on-top
    margin-top 56px
</style>
