# Smart Contract Deployment and Testing with Truffle

This repository demonstrates how to deploy a Solidity smart contract using Truffle and conduct tests on the deployed contract.

## Requirements

- Node.js
- Truffle Suite

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/rosariocannavo/DummyTruffleDeploy
    ```

2. **Navigate to the project directory:**

    ```bash
    cd MyTruffleProject
    ```

3. **Install dependencies:**

    ```bash
    npm install -g truffle
    ```

## Usage

### Deployment

1. **Compile the contracts:**

    ```bash
    truffle compile
    ```

2. **Migrate the contracts to a network (e.g., development, ropsten, mainnet):**

    ```bash
    truffle migrate --network development
    ```

### Testing

Run the tests to ensure the functionality of the deployed smart contract:

```bash
truffle test
