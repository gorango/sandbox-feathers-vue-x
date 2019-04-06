import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import {CookieStorage} from 'cookie-storage'

const host = env('SOCKET_URL')

const makeFeathersClient = (storage, origin = '') => {
  const socket = io(host, {transports: ['websocket'], forceNew: true, extraHeaders: {origin}})

  return feathers()
    .configure(socketio(socket, {timeout: env('SOCKET_TIMEOUT')}))
    .configure(auth({entity: 'user', service: 'users', cookie: 'feathers-jwt', storage}))
}

const feathersClient = makeFeathersClient(new CookieStorage({path: '/'}))

export {makeFeathersClient}
export default feathersClient
