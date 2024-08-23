'use client ';
import axios from 'axios';

const URL: string = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api`
  : '';

const token =
  typeof window !== 'undefined' ? localStorage.getItem('token') : undefined;

const Api = axios.create({
  baseURL: URL,
  headers: {
    Authorization: `Bearer ${token ?? ''}`,
  },
});

export default Api;
