import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: '/api/user/userList?type=1'
  })
}

export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
