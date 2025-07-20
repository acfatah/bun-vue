/**
 * Extends the default `@vueuse/core` useFetch implementation.
 *
 * - Adds the base URL loaded from `VITE_API_ENDPOINT`.
 * - Adds the `Authorization` header if local storage `token` is defined.
 *
 * Read more:
 * - https://vueuse.org/core/useFetch
 * - https://vueuse.org/core/useStorage
 */
import { createFetch, useStorage } from '@vueuse/core'

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT
const tokenStorage = useStorage('token', null)

export const useFetch = createFetch({
  baseUrl: API_ENDPOINT,
  options: {
    onFetchError(ctx) {
      // console.error(ctx.error)

      return ctx
    },

    // https://vueuse.org/core/useFetch/#intercepting-a-request
    async beforeFetch({ options }) {
      if (!API_ENDPOINT)
        throw new Error('VITE_API_ENDPOINT is not defined')

      options.credentials = 'include'

      options.headers = {
        Accept: 'application/json',
        ...options.headers,
        ...(typeof tokenStorage.value === 'string' && {
          Authorization: `Bearer ${tokenStorage.value}`,
        }),
      }

      return { options }
    },

    async afterFetch(ctx) {
      //

      return ctx
    },
  },
})

export default {
  useFetch,
}
