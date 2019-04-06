export const MEMBERS_ONLY = 'membersOnly'
export const GUESTS_ONLY = 'guestsOnly'

// export const PUB_ROUTES = []
export const APP_ROUTES = [
  '',
  ['login', GUESTS_ONLY],
  ['forgot', GUESTS_ONLY],
  ['verify', MEMBERS_ONLY],
  ['account', MEMBERS_ONLY],
  ['profile', ['username']],
  ['messages', MEMBERS_ONLY, ['', ':convoUuid']]
]
