import { List } from 'immutable';
import Web3Service from '../../helpers/web3Service';

export const ACTION_TYPES = {
  START_TO_GET_ALL_SLOT_MACHINES: 'slot_list.START_TO_GET_ALL_SLOT_MACHINES',
  SUCCEEDED_TO_GET_ALL_SLOT_MACHINES: 'slot_list.SUCCEEDED_TO_GET_ALL_SLOT_MACHINES',
  FAILED_TO_GET_ALL_SLOT_MACHINES: 'slot_list.FAILED_TO_GET_ALL_SLOT_MACHINES',

  START_TO_GET_MY_SLOT_MACHINES: 'slot_list.START_TO_GET_MY_SLOT_MACHINES',
  SUCCEEDED_TO_GET_MY_SLOT_MACHINES: 'slot_list.SUCCEEDED_TO_GET_MY_SLOT_MACHINES',
  FAILED_TO_GET_MY_SLOT_MACHINES: 'slot_list.FAILED_TO_GET_MY_SLOT_MACHINES',

  TOGGLE_SORTING_DROPDOWN: 'slot_list.TOGGLE_SORTING_DROPDOWN',
  CHANGE_SORTING_OPTION: 'slot_list.CHANGE_SORTING_OPTION',
};

async function getSlotMachines(account) {
  const bigNumberOfTotalNumOfSlotMachine = await Web3Service.getNumOfSlotMachine(account);
  const totalNumOfSlotMachine = parseInt(bigNumberOfTotalNumOfSlotMachine.valueOf(), 10);

  if (totalNumOfSlotMachine === 0) {
    return List();
  }

  const slotAddresses = [];
  const slotMachineContracts = [];
  for (let i = 0; i < totalNumOfSlotMachine; i++) {
    const slotAddress = await Web3Service.getSlotMachineAddressFromProvider(account, i);
    slotAddresses.push(slotAddress);
  }

  slotAddresses.forEach(address => {
    const contract = Web3Service.getSlotMachineContract(address);
    slotMachineContracts.push(contract);
  });

  return List(slotMachineContracts);
}

export function getMySlotMachines(account) {
  return async dispatch => {
    dispatch({
      type: ACTION_TYPES.START_TO_GET_MY_SLOT_MACHINES,
    });

    try {
      const slotMachineContracts = await getSlotMachines(account);
      dispatch({
        type: ACTION_TYPES.SUCCEEDED_TO_GET_MY_SLOT_MACHINES,
        payload: {
          slotContracts: List(slotMachineContracts),
        },
      });
    } catch (err) {
      console.error(err);
      dispatch({
        type: ACTION_TYPES.FAILED_TO_GET_MY_SLOT_MACHINES,
      });
    }
  };
}

export function getAllSlotMachines() {
  return async dispatch => {
    const startTime = new Date();

    dispatch({
      type: ACTION_TYPES.START_TO_GET_ALL_SLOT_MACHINES,
    });

    const providerAddresses = [];
    const bigNumOfProviders = await Web3Service.getTheNumberOfProviders();
    const numbOfProviders = parseInt(bigNumOfProviders.valueOf(), 10);

    for (let i = 0; i < numbOfProviders; i++) {
      const address = await Web3Service.getProviderAddress(i);
      providerAddresses.push(address);
    }

    const promiseArr = [];
    providerAddresses.forEach(providerAddress => {
      promiseArr.push(getSlotMachines(providerAddress));
    });

    await Promise.all(promiseArr)
      .then(resultArr => {
        let slotContracts = List();
        resultArr.forEach(resultList => {
          slotContracts = slotContracts.concat(resultList);
        });

        dispatch({
          type: ACTION_TYPES.SUCCEEDED_TO_GET_ALL_SLOT_MACHINES,
          payload: {
            slotContracts,
          },
        });

        const endTime = new Date();
        console.log('time spent = ', endTime - startTime);
      })
      .catch(error => {
        console.error(error);
        dispatch({
          type: ACTION_TYPES.FAILED_TO_GET_ALL_SLOT_MACHINES,
        });
      });
  };
}

export function handleClickSortingOption(option) {
  return {
    type: ACTION_TYPES.CHANGE_SORTING_OPTION,
    payload: {
      option,
    },
  };
}

export function handleSortDropdownOpen() {
  return {
    type: ACTION_TYPES.TOGGLE_SORTING_DROPDOWN,
  };
}