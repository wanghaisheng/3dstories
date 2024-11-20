export const getSafeBasePathUrl = url => {
  return `${import.meta.env.BASE_URL}/${url}`.replace(/\/+/g, '/')
}
