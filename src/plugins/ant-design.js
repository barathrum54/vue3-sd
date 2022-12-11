export const useAnt = async(app) => {
  const an = await import("ant-design-vue")
  app.use(an)
}