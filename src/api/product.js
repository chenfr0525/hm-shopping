import request from '@/utils/request'

export const getProduct = (obj) => {
  const { categoryId, goodsName, page } = obj
  return request.get('/goods/list', {
    params: {
      categoryId,
      goodsName,
      page
    }
  })
}

export const getProDetail = (id) => {
  return request.get('/goods/detail', {
    params: {
      goodsId: id
    }
  })
}

export const getProComment = (goodsId, limit) => {
  return request.get('/comment/listRows', {
    params: {
      goodsId,
      limit
    }
  })
}
