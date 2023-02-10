/**
全局的api接口
*/

import request from '@/utils/request'

const api = {
  logOutUrl: '/syscenter/api/v1/currentUser', // 退出
  markMessagesUrl: '/syscenter/api/v1/message/markMessages',
  websocketAddressUrl: '/syscenter/api/v1/config/websocketAddress',
  getMessagesUrl: '/syscenter/api/v1/message/getMessages',
  unReadCountUrl: '/syscenter/api/v1/message/unReadCount',
  rightTopResourcesUrl: '/syscenter/api/v1/resource/rightTopResources',
  getUserDataUrl: '/syscenter/api/v1/currentUser',
  getMenusUrl: '/syscenter/api/v1/resource/currentUserResource?systemId=pe_hos',
  getDocumentTitleUrl: '/syscenter/api/v1/config/browserTitle'
}

const syscenterApi = {
  API: api,
  /**
   * 退出
   */
  logOut: () => {
    return request({
      url: api.logOutUrl,
      method: 'delete'
    })
  },

  /**
   * 标记已读
   * @param messageId 不传时候为标记全部已读
   */
  readMark: (messageId) => {
    const readMessageOption = {
      messageIds: []
    }
    messageId && readMessageOption.messageIds.push(messageId)
    return request({
      url: api.markMessagesUrl,
      data: readMessageOption,
      method: 'post'
    })
  },

  /**
   *获取消息盒子WebsocketAddress
   */
  getWebsocketAddress: () => {
    return request({
      url: api.websocketAddressUrl,
      method: 'get'
    })
  },

  /**
   * 获取消息列表
   */
  getMsgList: (param) => {
    return request({
      url: api.getMessagesUrl,
      method: 'post',
      data: param
    })
  },

  /**
    * 页面初始时获取消息条数
  */
  unReadCount: () => {
    return request({
      url: api.unReadCountUrl,
      method: 'get'
    })
  },

  /**
   * 获取更多菜单
  */
  getExtensionMenus: () => {
    return request({
      url: api.rightTopResourcesUrl,
      method: 'get'
    })
  },

  /**
   * 获取用户信息
  */
  getUserData: () => {
    return request({
      url: api.getUserDataUrl,
      method: 'get'
    })
  },

  /**
   * 获取菜单
  */
  getMenus: () => {
    return request({
      url: api.getMenusUrl,
      method: 'get'
    })
  },

  /**
   * 获取全局title
  */
  getDocumentTitle: () => {
    return request({
      url: api.getDocumentTitleUrl,
      method: 'get'
    })
  }
}

export default syscenterApi
