const ProductProxy = artifacts.require('ProductProxy');
const ProductLogic = artifacts.require('ProductLogic'); // Assuming ProductLogic is the logic contract

contract('ProductProxy', (accounts) => {
    let productProxyInstance;
    let productLogicInstance;

    before(async () => {
        productLogicInstance = await ProductLogic.deployed();
        productProxyInstance = await ProductProxy.new(productLogicInstance.address);
    });

    it('should deploy with the correct logic contract address', async () => {
        const deployedLogicAddress = await productProxyInstance.logicContract();
        assert.equal(deployedLogicAddress, productLogicInstance.address, 'Incorrect logic contract address');
    });

    it('should change the logic contract address', async () => {
        const newLogicContract = await ProductLogic.new(); // Deploy a new logic contract

        await productProxyInstance.changeLogicContract(newLogicContract.address, { from: accounts[0] });

        const updatedLogicAddress = await productProxyInstance.logicContract();
        assert.equal(updatedLogicAddress, newLogicContract.address, 'Logic contract address not updated');
    });

    it('should forward function calls to the logic contract', async () => {
        const productId = 1;
        const productName = 'Example Product';

        // Register a product through the proxy
        await productProxyInstance.registerProduct(productId, productName, { from: accounts[0] });

        const retrievedProduct = await productLogicInstance.getProduct(productId);
        assert.equal(retrievedProduct.productName, productName, 'Product name should match');
        assert.equal(retrievedProduct.isRegistered, true, 'Product should be registered');
    });

    it('should revert if logic contract call fails', async () => {
        const invalidLogicContract = await ProductLogic.new(); // Deploy an empty/invalid logic contract

        await productProxyInstance.changeLogicContract(invalidLogicContract.address, { from: accounts[0] });

        try {
            // Call a function that should revert in the invalid logic contract through the proxy
            await productProxyInstance.registerProduct(1, 'Invalid Product', { from: accounts[0] });
            assert.fail('Expected revert not received');
        } catch (error) {
            assert(error.message.includes('revert'), `${error.message}`);
        }
    });
});
