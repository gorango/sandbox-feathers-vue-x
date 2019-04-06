
module.exports = () => async context => {
  const {facebook, google, ...rest} = context.data
  if (facebook || google) {
    const {profile} = facebook || google
    if (profile) {
      const {provider, id} = profile
      context.data = {
        ...rest,
        [`${provider}Id`]: id,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        email: profile.emails[0].value || ''
      }
    }
  }
  return context
}
