import {distanceInWordsStrict as fnDistance} from 'date-fns'

const handleRecent = date => {
  const d = fnDistance(Date.now(), date, {partialMethod: 'ceil'})
  const res = d === '0 seconds' ? 'now' : d
  return res
}

export default handleRecent
