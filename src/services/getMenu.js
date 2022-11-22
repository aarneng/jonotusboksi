// TODO: fix.
// this is currently fucked because of CORS

const proxyUrl = 'insert://url.here/'
const url = "https://kitchen.kanttiinit.fi/menus?lang=fi&restaurants=7,41,2,3,1,51,64,5,52,59,45,50&days=" + new Date().toISOString().split('T')[0]

export default async function getMenu() {
  const menuJSON = await fetch(proxyUrl + url)
  return menuJSON.json()
}
