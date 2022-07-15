/***
Initialisation
Connect needs try catch in case user no metamask
***/
CHAIN = 4;
CA = '0x7b1e62B9A286A11F1a87b655Da6180691EC3bb16';
CA2 = '0x3F380cB3c3F419F164820baDC9aE22eD2ce080C6';
USDT = '0x6e6668928fce0aFa11F9fB283d0B0515C2dCe41D';
try {
  window.ethereum.on('accountsChanged', function (accounts) {
    connect();
  });
} catch (e) {}
/***
Deposit (stake in function)
***/
async function deposit(oamt) {
  oamt *= 1e21;
  amt = oamt.toLocaleString('fullwide', { useGrouping: false });
  if (oamt > balUSDT) {
    $('#status').html('Minting Mock USDT'); /*REMOVE THIS IN DEPLOYMENT*/
    await contract3.methods.MINT(acct).send(FA); /*REMOVE THIS IN DEPLOYMENT*/
    /*$('#status').html('Insufficient USDT');
    return;*/
  }
  $('#status').html('Approving...');
  appr = await contract3.methods.allowance(acct, CA).call();
  if (appr < oamt) await contract3.methods.approve(CA, amt).send(FA);
  $('#status').html('Buying PG...');
  await contract.methods.buyToken(amt, _R()).send(FA);
  $('#status').html('Bought Successfully');
  disUSDT();
}
/***
Update payment status
***/
async function disUSDT() {
  balUSDT = await contract3.methods.balanceOf(acct).call();
  $('#txtUSDT').html((balUSDT / 1e18).toLocaleString('en-US'));
  $('#txtPG').html((await LB()).toLocaleString('en-US'));
}
/***
Base wallet function
With ABI
***/
async function connect() {
  await load(
    [
      {
        inputs: [u1, u3],
        name: 'buyToken',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
      },
    ],
    CA
  );
  await load2();
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
  await disUSDT();
  $('#txtRB').html(_R());
  $('#txtRef').val(acct);
  $('#root').show();
  $('#connect').hide();
}
