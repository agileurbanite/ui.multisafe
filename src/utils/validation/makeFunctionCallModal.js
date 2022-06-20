import * as yup from 'yup';

const requiredMessageType = {
  smartContractAddress: "Please enter a valid smart contract address",
  methodName: 'Please enter a valid method name',
  args: 'Please provide arguments in JSON format',
  deposit: 'Please enter a valid deposit (minimum 1)',
  tGas: 'Please enter a valid tGas (minimum 150)'
};

export const makeFunctionCallSchema = yup.object().shape({
  smartContractAddress: yup.string().required(requiredMessageType.smartContractAddress),
  methodName: yup.string().required(requiredMessageType.methodName),
  args: yup.string().required(requiredMessageType.args),
  deposit: yup.number().required(requiredMessageType.deposit),
  tGas: yup.number().required(requiredMessageType.tGas)
});
