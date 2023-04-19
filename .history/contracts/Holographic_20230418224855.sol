pragma solidity ^0.8.0;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

contract HolographicWill {

    address private owner;
    enum NonTestatorType {Beneficiary, Doctor}

    // Testator Details Struct
    struct Testator {
        address addr;
        string name;
        string password;
        bool isLoggedIn;
        bool testatorAlive; // boolean to indicate whether the testator is alive or not
        bool allNonTestatorsSigned;// boolean to indicate whether all non-testators have signed the holographic will
        string willIPFSCID; // IPFS hash of the holographic will file   
        uint id;
        uint[] nonTestatorsIds;
    }

    // Beneficiary and Doctor Deatails Struct
    struct NonTestator {
        address addr;
        string name;
        string password;
        bool isLoggedIn;
        bool hasSigned;
        uint id;
        address testatorAddr;
        NonTestatorType userType; // enum that holds either beneficiary or doctor details
    }

    Testator[] testators;
    NonTestator[] nonTestators;
    Testator testator;
    uint count;

    mapping(address => uint) NonTestatorsId;
    mapping(address => NonTestator[]) nonTestatorStructs;
    mapping(address => uint) TestatorsId;    
    

    modifier onlyTestatorAndLogin(){
        require(msg.sender == testators[TestatorsId[msg.sender]].addr, "Ownership Assertion: Caller is not a testator");
        require(testators[TestatorsId[msg.sender]].isLoggedIn == true, "User not logged in");
        
        _;
    }

    modifier onlyTestator(){
        require(msg.sender == testators[TestatorsId[msg.sender]].addr, "Ownership Assertion: Caller is not a testator");
        
        _;
    }

    modifier onlyNonTestator(address testatorAddr){
        require(msg.sender == nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].addr, "Ownership Assertion: Caller is not a testator");
        
        _;
    }

    modifier onlyNonTestatorAndLogIn(address testatorAddr){
        require(msg.sender == nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].addr, "Ownership Assertion: Caller is not a testator");
        require(nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].isLoggedIn == true, "User not logged in");
        _;
    }

    modifier onlyDoctorAndLogin(address testatorAddr){
        require(nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].addr == msg.sender && nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].userType == NonTestatorType.Doctor, "Ownership Assertion: Caller is not a doctor or not a registered nonTestator");
        require(nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].isLoggedIn == true, "User not logged in");
        _;
    }

    modifier testatorIsNotAlive(address testatorAddr){
        require(testators[TestatorsId[testatorAddr]].testatorAlive == false, "Testator is deceased, cannot sign the will.");
        _;
    }

    modifier onlyBeneficiaryAndLogin(address testatorAddr){
        require(nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].addr == msg.sender && nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].userType == NonTestatorType.Beneficiary, "User not logged in");        
        require(nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].isLoggedIn == true, "User not logged in");
        _;
        
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the owner can call this function.");
        _; // Continue executing the function if the modifier passes
    }

    constructor() {
        console.log("Smart Contract Deployed Successfully");
        owner = msg.sender;
    }

    function registerTestator(string memory _name, string memory _password) public returns (uint) {
    // Create new testator and add to the testators array
    Testator memory newTestator = Testator({
        addr: msg.sender,
        name: _name,
        password: _password,
        isLoggedIn: false,
        testatorAlive: true,
        allNonTestatorsSigned: false,
        willIPFSCID: "",
        id: testators.length, 
        nonTestatorsIds: new uint[](0)
    });
    TestatorsId[msg.sender] = newTestator.id;
    testators.push(newTestator);
    console.log("Register a new User");
	return newTestator.id;
    }


    function uploadWillIPFSCID(string memory ipfsCID) public onlyTestatorAndLogin() {
        testators[TestatorsId[msg.sender]].willIPFSCID = ipfsCID;
        
    }


/* 
	This function takes in the following parameters:
    
    _testatorAddr: The address of the non-Testator to be added.
	nonTestatorAddr: The address of the non-Testator to be added.
	_name: The name of the non-Testator to be added.
	_password: The password of the non-Testator to be added.
	_userType: An integer representing the type of non-Testator to be added, where 0 = Beneficiary, 1 = Doctor, and 2 = Crooner.
	The function then converts the _userType integer to the corresponding NonTestatorType enum value. It creates a new NonTestator struct with the given parameters and sets the isLogin and hasSign properties to false.
*/

    function addNonTestator(address nonTestatorAddr, string memory name,uint _userType) public onlyTestatorAndLogin() {
        uint _id = testators[TestatorsId[msg.sender]].nonTestatorsIds.length; // index of the new struct of the beneficiary to be added
         
        testators[TestatorsId[msg.sender]].nonTestatorsIds.push(_id);
        NonTestatorsId[nonTestatorAddr] = _id;
        nonTestatorStructs[msg.sender].push(NonTestator (
        nonTestatorAddr,
        name,
        "",
        false,
        false,
        _id,
        msg.sender,
        NonTestatorType(_userType)
        ));
    }


    function getnonTestator(address testatorAddr, address nonTestatorAddr) public view onlyTestatorAndLogin() returns (NonTestator memory) {
        return nonTestatorStructs[testatorAddr][NonTestatorsId[nonTestatorAddr]];

    }

    function getAllNonTestators(address testatorAddr) public view onlyTestatorAndLogin() returns (NonTestator[] memory) {
        // return testators[TestatorsId[testatorAddr]].nonTestators;
        return nonTestatorStructs[testatorAddr];
    }
    
    function viewTestator(address testatorAddr) public view onlyTestatorAndLogin() returns (Testator memory) {
        return testators[TestatorsId[testatorAddr]];
    }

    function deleteNonTestator(address nonTestatorAddr) public onlyTestatorAndLogin() {
        require(nonTestatorAddr == nonTestatorStructs[msg.sender][NonTestatorsId[nonTestatorAddr]].addr, "Address is not a nonTestator");// check if address is a nonTestator

        uint _id = NonTestatorsId[nonTestatorAddr];
        if (_id < testators[TestatorsId[msg.sender]].nonTestatorsIds.length - 1) {

            for(uint i = _id; i < testators[TestatorsId[msg.sender]].nonTestatorsIds.length; i++){
            testators[TestatorsId[msg.sender]].nonTestatorsIds[_id] = testators[TestatorsId[msg.sender]].nonTestatorsIds[_id + 1]; 
            nonTestatorStructs[msg.sender][_id] = nonTestatorStructs[msg.sender][_id+1];
            nonTestatorStructs[msg.sender][_id].id = _id;
            
            }

            testators[TestatorsId[msg.sender]].nonTestatorsIds.pop();
            nonTestatorStructs[msg.sender].pop();
            delete NonTestatorsId[nonTestatorAddr];
        }
        else if (_id == testators[TestatorsId[msg.sender]].nonTestatorsIds.length - 1) {
            testators[TestatorsId[msg.sender]].nonTestatorsIds.pop();
            nonTestatorStructs[msg.sender].pop();
            delete NonTestatorsId[nonTestatorAddr];
        }
    }

    function signupAsNonTestator(address testatorAddr,
        string memory _name,
        string memory _password
    ) public onlyNonTestator(testatorAddr) returns (bool){
        uint _id = NonTestatorsId[msg.sender];
        nonTestatorStructs[testatorAddr][_id].name = _name;
        nonTestatorStructs[testatorAddr][_id].password = _password;
        return true;
    }

    function loginAsTestator(string memory _password) public onlyTestator() returns (bool){
        // require(!testators[TestatorsId[msg.sender]].isLoggedIn, "User already logged in");

        if (keccak256(bytes(testators[TestatorsId[msg.sender]].password)) == keccak256(bytes(_password))) {
            testators[TestatorsId[msg.sender]].isLoggedIn = true;
            return true;
        } else {
            return false;
        }
    }

    function loginAsNonTestator(address testatorAddr, string memory _password) public onlyNonTestator(testatorAddr) returns (bool){
        uint _id = NonTestatorsId[msg.sender];
        require(nonTestatorStructs[testatorAddr][_id].addr == msg.sender, "User not registered");
        require(!nonTestatorStructs[testatorAddr][_id].isLoggedIn, "User already logged in");

        if(keccak256(abi.encodePacked(nonTestatorStructs[testatorAddr][_id].password, msg.sender)) == keccak256(abi.encodePacked(_password, msg.sender))){
            nonTestatorStructs[testatorAddr][_id].isLoggedIn = true;
            return true;
        } else {
            return false;
        }
    }


    function logoutTestator() public onlyTestatorAndLogin() {

        testators[TestatorsId[msg.sender]].isLoggedIn = false;
    }

    function logoutNonTestator(address testatorAddr) public onlyNonTestatorAndLogIn(testatorAddr) {
        uint _id= NonTestatorsId[msg.sender];
        require(nonTestatorStructs[testatorAddr][_id].isLoggedIn, "User not logged in");

        nonTestatorStructs[testatorAddr][_id].isLoggedIn = false;
    }

    function declareDeath(address testatorAddr) public onlyDoctorAndLogin(testatorAddr) {
        
        testators[TestatorsId[testatorAddr]].testatorAlive = false;
    }

    
    function signWill(address testatorAddr) public testatorIsNotAlive(testatorAddr) onlyBeneficiaryAndLogin(testatorAddr) {
        nonTestatorStructs[testatorAddr][NonTestatorsId[msg.sender]].hasSigned = true;
    }
    
    function checkAllSigned(address testatorAddr) private view returns (bool) {
        for (uint i = 0; i < nonTestatorStructs[testatorAddr].length; i++) {
            if (nonTestatorStructs[testatorAddr][i].userType == NonTestatorType.Doctor) {continue;}
            if (!nonTestatorStructs[testatorAddr][i].hasSigned) {
                return false;
            }
        }
        return true;
    }
    
    function revealWillIPFSCID(address testatorAddr) public view onlyBeneficiaryAndLogin(testatorAddr) returns (string memory) {
        require(testators[TestatorsId[testatorAddr]].testatorAlive == false, "Testator is still alive, cannot reveal the will.");
        require(checkAllSigned(testatorAddr), "All beneficiaries must sign the will before the CID is revealed.");
        return testators[TestatorsId[testatorAddr]].willIPFSCID;
    }
    
    function destroy(address apocalypse) public onlyOwner{
        if (apocalypse != address(0)) {
            selfdestruct(payable(apocalypse));
        } else {
            selfdestruct(payable(owner));
        }
       
    }
}
