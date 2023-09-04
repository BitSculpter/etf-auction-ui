import Head from "next/head";
import { useEffect, useState } from "react";
import { container } from "tsyringe";
import BidderView from "../components/bidder/bidderView";
import Header from "../components/header";
import AuctioneerView from "../components/auctioneer/auctioneerView";
import { AuctionService } from "../services/AuctionService";

export default function Home() {

  //get the service instance
  const AuctionServiceInstance = container.resolve(AuctionService);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState("");
  const [provider, setProvider] = useState(undefined);
  const [isSupportedNetwork, setIsSupportedNetwork] = useState(true);
  const [hasMetaMask, setHasMetaMask] = useState(true);
  const [selectedOption, setSelectedOption] = useState({
    view: "apply",
    option: "search"
  });

  const onChainChanged = (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setIsConnected(false);
    window.location.reload();
  }

  const onaAccountsChanged = (chainId) => {
    // Handle the new chain.
    // Correctly handling chain changes can be complicated.
    // We recommend reloading the page unless you have good reason not to.
    setIsConnected(false);
    window.location.reload();
  }

  async function connect() {
    //TODO implement connection logic
  }

  useEffect(() => {
    connect();
    return () => {
      //TODO implement disconnection logic
    };

  }, []);

  const onChangeOption = (view, option) => {
    setSelectedOption({ view, option });
  }

  return (
    <>
      <Head>
        <title>EtF Auctions</title>
        <link rel="icon" href="/favicon-32x32.png" />
      </Head>
      <>
        <Header onChangeOption={onChangeOption} onConnect={connect} connectedAddress={signerAddress} isConnected={isConnected} />
        <main className="pt-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* We've used 3xl here, but feel free to try other max-widths based on your needs */}
            {<div className="mx-auto max-w-4xl">
              {selectedOption.view === "apply" ?
                <BidderView onChangeOption={onChangeOption} searchOptionSelected={selectedOption.option === 'search'} signer={signer} auctionServiceInstance={AuctionServiceInstance} /> :
                <AuctioneerView signer={signer} auctionServiceInstance={AuctionServiceInstance} />}
            </div>}
            {!hasMetaMask && <div className="alert alert-danger" role="alert"> You need Metamask to use this app.</div>}
            {!isSupportedNetwork && <div className="alert alert-danger" role="alert"> Etf Auctions is currently in beta. Only available on Goerli Tesnet. Change your metamask network!</div>}
            <footer className="bg-white">
              <div className="mt-8 border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                <div className="flex space-x-6 md:order-2">
                  <div className="text-sm text-gray-500">
                    <p className="text-base leading-6 text-indigo-400">
                      XXX Balance: <span className="text-base leading-6 text-gray-500">{`$0`}</span>
                    </p>
                  </div>
                </div>
                <p className="mt-8 text-base text-gray-400 md:order-1 md:mt-0">
                  &copy; 2023 Ideal Labs, Inc. All rights reserved.
                </p>
              </div>
            </footer>
          </div>

        </main>


      </>
    </>
  );
}