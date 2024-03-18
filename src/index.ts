import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json"

function getEth() {
  const eth = (window as any).ethereum;
  if (!eth) throw new Error("Get metamask acc");

  return eth;
}

async function hasAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({ method: "eth_accounts" })) as string[];

  return accounts && accounts.length;
}

async function requestAccounts() {
  const eth = getEth();
  const accounts = (await eth.request({
    method: "eth_requestAccounts",
  })) as string[];

  return accounts && accounts.length;
}

async function run() {
  if (!(await hasAccounts()) && !(await requestAccounts()))
    throw new Error("Please check metamask");

  const counter = new ethers.Contract(
    process.env.CONTRACT_ADDRESS,
    Counter.abi,
    new ethers.providers.Web3Provider(getEth()).getSigner()
  )

  const ele = document.createElement('div')
  async function setCounter(count?) {
    ele.innerHTML = count || await counter.getCounter()
  }

  setCounter()

  const btn = document.createElement("button")
  btn.innerHTML = "increment"
  btn.onclick = async function() {
    await counter.count()
  }

  counter.on(counter.filters.CounterInc(), function(count) {
    setCounter(count)
  })

  document.body.appendChild(ele)
  document.body.appendChild(btn)

}

run()
