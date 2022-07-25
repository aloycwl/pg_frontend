const CHAIN = 97,
  CA = '0xC95f2d6011F1A7F02051dD4188A8BbBbeeb328D4',
  CA2 = '0xDf7D66B3396765F716c057b946D08fCB3A7192B8',
  USDT = '0x2dbc89FadB4cB41F35a0AecEa6DeCE15DBa392C1',
  u0 = '[]',
  ua = 'uint256',
  u1 = { internalType: ua, name: '', type: ua },
  u2 = { internalType: ua + '[]', name: '', type: ua + '[]' },
  ub = 'address',
  u3 = { internalType: ub, name: '', type: ub },
  u4 = { internalType: ub + '[]', name: '', type: ub + '[]' },
  uc = 'string',
  u5 = { internalType: uc, name: '', type: uc },
  u6 = { internalType: uc + '[]', name: '', type: uc + '[]' };
try {
  window.ethereum.on('accountsChanged', function (a) {
    connect();
  });
} catch (a) {}
function adjust(a) {
  (num = Number($('#txtNo').val()) + a),
    $('#txtNo').val(num < 1 || isNaN(num) ? 1 : num);
}
async function mint() {
  amt = (oamt = 1e21 * Number($('#txtNo').val())).toLocaleString('fullwide', {
    useGrouping: !1,
  });
  balUSDT = await contract3.methods.balanceOf(acct).call({ from: acct });
  $('#txtUSDT').html((balUSDT / 1e18).toLocaleString('en-US')),
    oamt > balUSDT &&
      ($('#mintBtn').html('Minting Mock USDT...'),
      await contract3.methods.MINT(acct).send({ from: acct })),
    $('#mintBtn').html('Approving...'),
    (appr = await contract3.methods.allowance(acct, CA).call()) < oamt &&
      (await contract3.methods.approve(CA, amt).send({ from: acct })),
    $('#mintBtn').html('Minting RG...');
  var a = location.hash.substring(1).toLowerCase();
  await contract.methods
    .mint(
      a.length > 1 && a != acct.toLowerCase()
        ? a
        : '0x0000000000000000000000000000000000000000',
      $('#txtNo').val()
    )
    .send({ from: acct }),
    $('#mintBtn').html('Minted'),
    disUSDT();
}
async function drip() {
  $('#claimbtn').html('Claiming...'),
    await contract.methods.drip().send({ from: acct }),
    disUSDT(),
    $('#claimbtn').html('Claimed');
}
async function disUSDT() {
  $('#txtRG').html(
    (
      (await contract.methods.getDrip().call({ from: acct })) / 1e18
    ).toLocaleString('en-US') +
      ' (No. of tokens: ' +
      ((await contract.methods.balanceOf(acct).call()) + ')')
  );
  nftLeft = 5000 - (await contract.methods._count().call());
  $('#left').html(nftLeft + ' NFT left to grab!');
}
async function copy() {
  navigator.clipboard.writeText(
    location.href.replace(location.hash, '') + '?#' + acct
  ),
    $('#txtRef').html('Copied');
}
async function connect() {
  $('#conBtn').hide();
  if ('undefined' != typeof ethereum) {
    web3 = new Web3(ethereum);
    acct = await ethereum.request({ method: 'eth_requestAccounts' });
    acct = acct[0];
    if ((await web3.eth.net.getId()) != CHAIN)
      await ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x' + CHAIN.toString(16) }],
      });
    contract = new web3.eth.Contract(
      [
        {
          inputs: [],
          name: 'drip',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [u3, u1],
          name: 'mint',
          outputs: [],
          stateMutability: 'nonpayable',
          type: 'function',
        },
        {
          inputs: [u3],
          name: 'balanceOf',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [u3],
          name: 'downlineCounts',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: 'getDrip',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
        {
          inputs: [],
          name: '_count',
          outputs: [u1],
          stateMutability: 'view',
          type: 'function',
        },
      ],
      CA
    );
    contract3 = new web3.eth.Contract(
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
          inputs: [u3],
          name: 'MINT',
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
      USDT
    );
    $('#root').show();
    await disUSDT();
  }
}
