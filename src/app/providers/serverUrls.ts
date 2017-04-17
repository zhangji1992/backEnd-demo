/**
 * Created by zhangJi on 2017/4/1.
 */
// const server = "http://mam.mindmedia.cn:8181";      //演示环境
const server = "http://bsm.mindmedia.cn:8181/bsm";      //演示环境

export const interfaceUrl = {
  //登录接口
  login: `${server}/loginForm.do`,

  //退出登录
  logout: `${server}/a/logout.do`,

  //获取顶级菜单
  getTopMenu: `${server}/a/topMenu.do`,

  //获取左侧菜单
  getLeftMenu: `${server}/a/menuTree.do`,

  //搜索（查询列表）
  search: `${server}/a/demo/testPage/list.do`,

  //添加（编辑）
  addOrEdit: `${server}/a/demo/testPage/form.do`,

  //保存
  save: `${server}/a/demo/testPage/save.do`,

  //删除
  del: `${server}/a/demo/testPage/deletes.do`,

  //获取角色列表
  getRoleTable: `src/mock-data/role.json`,

  //获取角色授权树形菜单
  getPowerTree: `src/mock-data/power-tree.json`,

  //获取待分配角色表
  getDistributeTable: `src/mock-data/distribute-table.json`,

  //获取分配角色弹窗列表
  getDistributeDialogueTable: `src/mock-data/distribute-dialogue.json`,

  //角色分配弹窗搜索（待后台提供）
  search3: `${server}/a/demo/testPage/list.do`
};
