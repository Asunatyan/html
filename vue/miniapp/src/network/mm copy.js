import {request} from "./request";

export function getHomeMultidata(size,current) {
  return request({
    url: 'user/userList',
    params: {
      size,
      current
    }
  })
}
