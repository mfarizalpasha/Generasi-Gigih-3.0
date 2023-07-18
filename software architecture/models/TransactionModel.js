let transactions = [
  {
    transactionsId: "123456789",
    sourceId: "12345",
    destinationId: "67890",
    amount: 5.0,
    timestamp: "2023-06-01T00:00:00.000Z",
  },
];

function createTransaction(sourceId, destinationId, amount) {
  const transactions = {
    transactionsId: generateTransactionId(),
    sourceId,
    destinationId,
    amount,
    timestamp: new Date().toISOString(),
  };
  transactions.push(transactions);
  return transactions;
}

function generateTransactionId() {
  return Math.random().toString(36).substring(2, 9);
}
