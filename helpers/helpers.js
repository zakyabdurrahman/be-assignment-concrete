import bcrypt from 'bcrypt';


export function hashPassword(string) {
    const salt =  bcrypt.genSaltSync(10);
    return bcrypt.hashSync(string, 10);
}

export function verifyPassword(string, hash) {
  return bcrypt.compareSync(string, hash);
}

export function processTransaction(transaction) {
  return new Promise((resolve, reject) => {
    
    
    console.log("Transaction processing started for:", transaction);

    // Simulate long running process
    setTimeout(() => {
      // After 30 seconds, we assume the transaction is processed successfully
      console.log("transaction processed for:", transaction);
      resolve(transaction);
    }, 30000); // 30 seconds
  });
}
