const fetchURL = "https://jonotusboksi.xyz/api/times"

export default async function getWaitTimes() {
  console.log("fetching wait time...");
  const waitData = await fetch(fetchURL)
  return waitData.json()
}
