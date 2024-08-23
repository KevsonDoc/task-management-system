import axios from 'axios'

const URL: string = process.env.NEXT_PUBLIC_API_URL ? `${process.env.NEXT_PUBLIC_API_URL}/api` : ''

const Api = axios.create({
  baseURL: URL,
})

export default Api  