function transfer(sourceId, destinationId, amount) {
  sourceAccount = getCustomer(sourceId);
  destinationAccount = getCustomer(destinationId);
  if (!sourceAccount || !destinationAccount) {
    throw new Error("Invalid source or destination account");
  }
  if (sourceAccount.balance < amount) {
    throw new Error("Insufficient balance in the source account");
  }
  sourceAccount.balance -= amount;
  destinationAccount.balance += amount;
  createTransaction(
    sourceAccount.customerId,
    destinationAccount.destinationId,
    amount
  );
  return;
}
