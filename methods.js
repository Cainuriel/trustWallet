
// conectarse
try {
    const account = await injectedProvider.request({
      method: "eth_requestAccounts",
    });
  
    console.log(account); // => ['0x...']
  } catch (e) {
    if (e.code === 4001) {
      console.error("User denied connection.");
    }
  }


  // eth_accounts devuelve una cuenta SI SE ESTÁ CONECTADO
  const accounts = await injectedProvider.request({
    method: "eth_accounts",
  });

  // listening para cambios de cuenta o desconexión
  injectedProvider.addListener("accountsChanged", (accounts) => {
    if (accounts.length === 0) {
      console.log("User disconnected.");
    } else {
      const newConnectedAccount = accounts[0];
      console.log(newConnectedAccount); // => '0x...'
    }
  });

  // listening para cambios de cadena
  injectedProvider.addListener("chainChanged", (id) => {
    console.log(id); // => '0x1'
  });

  // cambiar de cadena
  try {
    await injectedProvider.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0x1" }], // Ensure the selected network is Etheruem
    });
  } catch (e) {
    if (e.code === 4001) {
      setError("User rejected switching chains.");
    }
  }

  // capturar red
  const chainId = await injectedProvider.request({ method: "eth_chainId" });

  