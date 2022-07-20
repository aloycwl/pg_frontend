/***
Initialisation
Connect needs try catch in case user no metamask
***/
CHAIN = 4;
CA = '0x1747015b28295132d131A524B300b37d9EF2300c';
CA2 = '0x204DA0e98EAf4c20db8df4aa67F54e0F31888c7B';
USDT = '0x263b0355B80d384C55dec84DD13DFa10D2141442';
try {
  window.ethereum.on('accountsChanged', function (accounts) {
    connect();
  });
} catch (e) {}
/***
Adjust amount
***/
function adjust(p) {
  num = Number($('#txtNo').val()) + p;
  $('#txtNo').val(num < 1 || isNaN(num) ? 1 : num);
}
/***
Mint (stake in function)
***/
async function mint() {
  oamt = 1e21 * Number($('#txtNo').val());
  amt = oamt.toLocaleString('fullwide', { useGrouping: false });
  balUSDT = await contract3.methods.balanceOf(acct).call();
  $('#txtUSDT').html((balUSDT / 1e18).toLocaleString('en-US'));
  if (oamt > balUSDT) {
    $('#mintBtn').html('Minting Mock USDT...'); /*REMOVE THIS IN DEPLOYMENT*/
    await contract3.methods.MINT(acct).send(_FA); /*REMOVE THIS IN DEPLOYMENT*/
    /*$('#mintBtn').html('Insufficient USDT');
    return;*/
  }
  $('#mintBtn').html('Approving...');
  appr = await contract3.methods.allowance(acct, CA).call();
  if (appr < oamt) await contract3.methods.approve(CA, amt).send(_FA);
  $('#mintBtn').html('Minting RG...');
  await contract.methods.mint(_R(), $('#txtNo').val()).send(_FA);
  $('#mintBtn').html('Minted');
  disUSDT();
}
/***
Drip function
***/
async function drip() {
  $('#claimbtn').html('Claiming...');
  await contract.methods.drip().send(_FA);
  disUSDT();
  $('#claimbtn').html('Claimed');
}
/***
Update payment status
***/
async function disUSDT() {
  $('#txtRG').html(
    (
      (await contract.methods.getDrip().call({ from: acct })) / 1e18
    ).toLocaleString('en-US') +
      ' (No. of tokens: ' +
      ((await contract.methods.balanceOf(acct).call()) + ')')
  );
}
/***
Copy function
***/
async function copy() {
  navigator.clipboard.writeText(
    location.href.replace(location.hash, '') + '?#' + acct
  );
  $('#txtRef').html('Copied');
}
/***
Base wallet function
With ABI
***/
async function connect() {
  $('#conBtn').hide();
  $('#root').show();
  await load(
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
}
