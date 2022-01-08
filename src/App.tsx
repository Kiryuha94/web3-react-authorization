import React, {useEffect, useState} from 'react';
import { Web3ReactProvider, useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";
import { InjectedConnector } from "@web3-react/injected-connector";
import { v4 as uuidv4 } from "uuid"
export  const HomePage = () => {
  return (
    <Web3ReactProvider
      getLibrary={(provider: any) => new Web3Provider(provider)}
    >
      <App />
    </Web3ReactProvider>
  );
}

function App() {
  const { active, account, activate, library } = useWeb3React();
  const [key, setKey] = useState<string>()
  const [verifiResult, setVerifyResult] = useState(false)

  useEffect(()=>{
    activate(new InjectedConnector({}))
  },[activate])

  useEffect(()=>{
    setKey(uuidv4())
  },[active])

const verifySignedMessage = (key:string):void => {
console.log(key);
setVerifyResult(key? true : false)
  }

  return (
    <div   >
      <div>
        {active ? (
          <>
            <div>
              {account?.substr(0, 8)}
            </div>
            {!verifiResult ? (
            <button
              onClick={async () => {
                const message = key;
                const signature = await library
                  .getSigner(account)
                  .signMessage(message)
                  .catch((error:string) => console.error(error));
                  verifySignedMessage(signature);
              }}
            >
              Sign In
            </button>):(
                <div>Authorization is successful</div>
            )}
          </>
        ) : (
          <div>
           Please, install
           <a href='https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn'> MetaMask</a>
          </div>
        )}
      </div>
    </div>
  );
}

