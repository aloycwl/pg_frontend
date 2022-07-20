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
  }
}