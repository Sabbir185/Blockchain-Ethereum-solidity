pragma solidity ^0.4.17;

contract MyArray{
    uint[] public myArray;

    function MyArray() public {
        myArray.push(3);
        myArray.push(15);
        myArray.push(35);
    }

    function arrayLen() public view returns (uint) {
        return myArray.length;
    }

    function firstElement() public view returns (uint) {
        return myArray[0];
    }

    function totalArray() public view returns (uint[]) {
        return myArray;
    }
}