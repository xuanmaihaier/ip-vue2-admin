const getters = {
  sidebar: state => state.app.sidebar,
  windowW: state => state.app.windowW,
  user: state => state.user,
  breadcrumbdatalist: state => state.app.breadcrumbdatalist,
  sideBarData: state => state.user.sideBarData,
  permission: state => state.user.permission,
  pageResource: state => state.user.pageResource,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  userId: state => state.user.userId,
  opened: state => state.app.sidebar.opened
}
export default getters
