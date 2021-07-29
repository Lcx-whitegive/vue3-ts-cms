// import axios from 'axios'

// axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
//   console.log(res.data)
// })
// axios
//   .get('http://httpbin.org/get', {
//     params: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios
//   .post('http://httpbin.org/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios.defaults.baseURL = 'http://httpbin.org'
// axios.defaults.timeout = 5000
// axios.defaults.headers = {}
// axios
//   .get('/get', {
//     params: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios
//   .post('/post', {
//     data: {
//       name: 'why',
//       age: 18
//     }
//   })
//   .then((res) => {
//     console.log(res.data)
//   })
// axios.interceptors.request.use(
//   (config) => {
//     console.log('请求拦截')
//     return config
//   },
//   (err) => {
//     console.log(err)
//   }
// )
// axios.interceptors.response.use(
//   (res) => {
//     console.log('响应拦截')
//     return res.data
//   },
//   (err) => {
//     console.log(err)
//   }
// )
// axios
//   .all([
//     axios.get('/get', { params: { name: 'why', age: 18 } }),
//     axios.post('/post', { data: { name: 'why', age: 18 } })
//   ])
//   .then((res) => {
//     console.log(res[0])
//     console.log(res[1])
//   })
