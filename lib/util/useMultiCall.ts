import { Interface } from '@ethersproject/abi';
import { useContractRead } from 'wagmi';
import { useNetworkConfig } from '~/lib/global/useNetworkConfig';

interface UseMultiCallInput {
    abi: any[];
    calls: { address: string; functionName: string; args?: any[] }[];
    options?: any;
    requireSuccess?: boolean;
    enabled?: boolean;
    cacheTimeMs?: number;
}

export function useMultiCall({
    abi,
    calls,
    options = {},
    requireSuccess = false,
    enabled = true,
    cacheTimeMs,
}: UseMultiCallInput) {
    const networkConfig = useNetworkConfig();
    const contractInterface = new Interface(abi);
    const contractRead = useContractRead({
        addressOrName: networkConfig.multicall,
        contractInterface: [
            'function tryAggregate(bool requireSuccess, tuple(address, bytes)[] memory calls) public view returns (tuple(bool, bytes)[] memory returnData)',
        ],
        enabled,
        args: [
            requireSuccess,
            calls.map((call) => [
                call.address.toLowerCase(),
                contractInterface.encodeFunctionData(call.functionName, call.args),
            ]),
            options,
        ],
        cacheTime: cacheTimeMs,
        functionName: 'tryAggregate',
    });

    const response = contractRead.data?.map(([success, returnData], i) => {
        if (!success) {
            return null;
        }

        try {
            const decodedResult = contractInterface.decodeFunctionResult(calls[i].functionName, returnData);
            // Automatically unwrap any simple return values
            return decodedResult.length > 1 ? decodedResult : decodedResult[0];
        } catch (e) {
            console.log('e', e);
            return null;
        }
    });

    return {
        ...contractRead,
        data: response,
    };
}
