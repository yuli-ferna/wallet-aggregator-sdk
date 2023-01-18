import { useCallback, useContext, useMemo } from "react";
import { ChainId, Wallet } from "@xlabs-libs/wallet-aggregator-core";
import { AvailableWalletsMap, WalletContext } from "./WalletContext";


export const useWallet = (): Wallet | undefined => {
    const { defaultWallet: wallet } = useContext(WalletContext);
    return useMemo(() => wallet, [wallet]);
}

export const useWalletFromChain = (chainId: ChainId): Wallet | undefined => {
    const { wallets } = useContext(WalletContext);

    const wallet = wallets[chainId];
    return useMemo(() => wallet, [ chainId, wallet, wallets ]);
}

export const useAvailableWallets = (): AvailableWalletsMap => {
    const { availableWallets } = useContext(WalletContext);
    return useMemo(() => availableWallets, [availableWallets]);
}

export const useAvailableChains = (): ChainId[] => {
    const walletsMap = useAvailableWallets();
    return useMemo(() => Object.keys(walletsMap).map(id => +id as ChainId), [ walletsMap ])
};

export const useWalletsForChain = (chainId?: ChainId): Wallet[] => {
    const walletsMap = useAvailableWallets();

    let wallets: Wallet[] = []

    if (chainId) {
        wallets = walletsMap[chainId] || [];
    }

    return useMemo(() => wallets, [ wallets, walletsMap ])
};

export const useChangeWallet = () => {
    const { changeWallet } = useContext(WalletContext);

    return useCallback((wallet: Wallet) => {
        changeWallet(wallet);
    }, [ changeWallet ]);
}

export const useUnsetWalletFromChain = () => {
    const { unsetWalletFromChain } = useContext(WalletContext);

    return useCallback((chainId: ChainId) => {
        unsetWalletFromChain(chainId);
    }, [ unsetWalletFromChain ]);
}
  