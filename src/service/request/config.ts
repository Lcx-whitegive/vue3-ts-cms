let BASE_URL = ''
let TIME_OUT = 2000

if (process.env.NODE_ENV === 'development') {
  BASE_URL = '/api'
  TIME_OUT = 5000
} else if (process.env.NODE_ENV === 'production') {
  BASE_URL = 'http://coderwhy.org/prod'
  TIME_OUT = 10000
} else {
  BASE_URL = 'http://coderwhy.org/test'
  TIME_OUT = 8000
}

export { TIME_OUT, BASE_URL }
