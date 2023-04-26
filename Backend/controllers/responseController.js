const { StatusCodes } = require("http-status-codes");
const customError = require("../errors");

const addition = async (req, res) => {
  try {
    let { numberOne, numberTwo } = req.body;

    if (numberOne === "" || numberTwo === "") {
      throw new customError.BadRequestError("please enter both of the numbers");
    } else if (/^-\d+/.test(numberOne) || /^-\d+/.test(numberTwo)) {
      throw new customError.BadRequestError("add only positive numbers");
    } else {
      let carryString = "";
      let sumString = "";
      let carry = 0;

      numberOne = numberOne.toString().split("").reverse().join("");
      numberTwo = numberTwo.toString().split("").reverse().join("");

      let result = {};
      let step = 1;
      for (let i = 0; i < numberOne.length || i < numberTwo.length; i++) {
        let a = parseInt(numberOne[i] || 0);
        let b = parseInt(numberTwo[i] || 0);
        let sum = a + b + carry;

        if (sum >= 10) {
          carry = 1;
          carryString = "1" + carryString;
          sum = sum - 10;
        } else {
          carry = 0;
          carryString = "0" + carryString;
        }

        sumString = sum.toString() + sumString;
        result[`step${step}`] = {
          carryString: carryString,
          sumString: sumString,
        };
        step++;
      }

      if (carry) {
        carryString = "1" + carryString;
        sumString = "1" + sumString;
      }

      result[`step${step}`] = {
        carryString: carryString,
        sumString: sumString,
      };

      res.status(StatusCodes.OK).json({ result });
    }
  } catch (err) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: err.message });
  }
};

module.exports = { addition };
