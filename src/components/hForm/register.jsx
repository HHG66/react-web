function createFormConfig() {
  const compoonentList = [];
  const componentMap = {}
  return {
    compoonentList,
    componentMap,
    resister: (type, Component) => {
      compoonentList.push(Component)
      componentMap[type] = Component
    }
  }
}


// export default createFormConfig
let registerConfig = createFormConfig();
export default registerConfig
