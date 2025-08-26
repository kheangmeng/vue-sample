import { reactive } from 'vue'
import { io } from 'socket.io-client'

export const state = reactive({
  connected: false,
  fooEvents: [],
  barEvents: [],
})

// "undefined" means the URL will be computed from the `window.location` object
// const URL = process.env.NODE_ENV === 'production' ? undefined : 'http://localhost:3000'

const url = `${location.protocol === 'https:' ? 'wss://' : 'ws://'}localhost:3001`
export const socket = io(url)

socket.on('connect', (...args) => {
  console.log('connected:', args)
  state.connected = true
})

socket.on('disconnect', (...args) => {
  console.log('disconnected:', args)
  state.connected = false
})

socket.on('foo', (...args) => {
  state.fooEvents.push(args)
})

socket.on('bar', (...args) => {
  state.barEvents.push(args)
})

export function connect() {
  socket.connect()
}
export function disconnect() {
  socket.disconnect()
}
