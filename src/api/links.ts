import axios from 'axios'
import type { Link, LinkDTO } from '../types'

const API_URL = 'http://localhost:8080/api/links'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchLinks = async (): Promise<Link[]> => {
  const response = await api.get('')
  return response.data
}

export const createLink = async (linkData: LinkDTO): Promise<Link> => {
  const response = await api.post('', linkData)
  return response.data
}

export const fetchLinksByCategory = async (category: string): Promise<Link[]> => {
  const response = await api.get(`/category/${category}`)
  return response.data
}

export const searchLinks = async (keyword: string): Promise<Link[]> => {
  const response = await api.get('/search', {
    params: { keyword }
  })
  return response.data
}
