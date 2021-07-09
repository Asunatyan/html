import {request} from "./request";
//用户列表
export function getHomeMultidata(size,current) {
  return request({
    url: 'user/userList',
    params: {
      size,
      current
    }
  })
}
//用户bottle列表
export function getUserBottleList(openid,size,current) {
  return request({
    url: 'bottle/userBottleList',
    params: {
      openid,
      size,
      current
    }
  })
}

//用户bottle详情
export function getUserBottleDetail(openid,size,current) {
  return request({
    url: 'bottleDetail/userBottleDetailList',
    params: {
      qid,
      size,
      current
    }
  })
}