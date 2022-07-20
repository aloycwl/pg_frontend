const u0 = '[]',
  ua = 'uint256',
  u1 = { internalType: ua, name: '', type: ua },
  u2 = { internalType: ua + u0, name: '', type: ua + u0 },
  ub = 'address',
  u3 = { internalType: ub, name: '', type: ub },
  u4 = { internalType: ub + u0, name: '', type: ub + u0 },
  uc = 'string',
  u5 = { internalType: uc, name: '', type: uc },
  u6 = { internalType: uc + u0, name: '', type: uc + u0 };
function _R() {
  var _s = location.hash.substring(1).toLowerCase();
  return _s.length > 1 && _s != acct.toLowerCase()
    ? _s
    : '0x0000000000000000000000000000000000000000';
}
async function LB() {
  return (await contract2.methods.balanceOf(acct).call()) / 1e18;
}
async function load(a, b) {
  if (typeof CS != 'undefined')
    $('head').append(
      $(
        '<meta name="viewport"content="width=device-width,initial-scale=1.0"><link rel="stylesheet">'
      ).attr('href', CS)
    );
  if (typeof ethereum != 'undefined') {
    var web3 = new Web3(ethereum),
      acct = await ethereum.request({ method: 'eth_requestAccounts' });
    acct = acct[0];
    if ((await web3.eth.net.getId()) != CHAIN) {
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + CHAIN }],
      });
    }
    var contract = new web3.eth.Contract(a, b);
    if (typeof WB != 'undefined') {
      var web3a = new Web3(WB),
        contracta = new web3a.eth.Contract(a, b);
    }
  }
}
async function load2() {
  var contract2 = new web3.eth.Contract(
    [
      {
        inputs: [u3],
        name: 'balanceOf',
        outputs: [u1],
        stateMutability: 'view',
        type: 'function',
      },
      {
        inputs: [u3, u1],
        name: 'approve',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
      {
        inputs: [u3, u3],
        name: 'allowance',
        outputs: [u1],
        stateMutability: 'view',
        type: 'function',
      },
    ],
    CA2
  );
}
