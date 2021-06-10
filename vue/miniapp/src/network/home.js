import {request} from "./request";

export function getHomeMultidata() {
  return request({
    url: 'user/userList?size=5&current=1'
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
