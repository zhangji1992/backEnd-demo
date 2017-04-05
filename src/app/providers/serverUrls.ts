/**
 * Created by zhangJi on 2017/4/1.
 */
const server = "http://mam.mindmedia.cn:8181";      //演示环境

export const interfaceUrl = {
  //登录接口
  login: `${server}/loginForm.do`,

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
  del: `${server}/a/demo/testPage/deletes.do`
};
