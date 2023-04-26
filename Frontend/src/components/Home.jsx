import { Grid, Flex, Text, Box, Input, Button } from "@chakra-ui/react";
import axios from "axios";

import React, { useState } from "react";

function Home() {
  const [firstNumber, setFirstNumber] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState();
  const [error, setError] = useState(false);
  const handleClear = () => {
    setFirstNumber("");
    setSecondNumber("");
  };

  const handleGenerateSteps = async (firstNumber, secondNumber, e) => {
    try {
      e.preventDefault();
      if (firstNumber === "" || secondNumber === "") {
        setError(true);
      } else if (/^-\d+/.test(firstNumber) || /^-\d+/.test(secondNumber)) {
        setError(true);
      } else {
        const res = await axios.post(
          "http://localhost:3008/api/v1/response/addition",
          {
            numberOne: firstNumber,
            numberTwo: secondNumber,
          }
        );
        setResult(res.data.result);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Grid
      className="relative"
      // overflowY="scroll"
      // overflowX="hidden"
      // css={{ "&::-webkit-scrollbar": { display: "none" } }}
    >
      <Flex h="60px" bg="	#c1cdcd">
        <Text fontWeight="bold" ml="100px" mt="2" fontSize="28px">
          Step Addition
        </Text>
      </Flex>
      <Box bg="white" h="100vh" pos="relative">
        {/* input */}
        <Box ml={100} mt="20px">
          <Flex>
            <Text fontWeight="semibold">First Number:</Text>
            <Input
              type="number"
              bg="slate.100"
              borderRadius="md"
              pr="2"
              outline="none"
              w="50%"
              ml="50px"
              textAlign="right"
              value={firstNumber}
              onChange={(e) => setFirstNumber(e.target.value)}
              placeholder="Enter a number"
            />
          </Flex>
          <Flex mt="5">
            <Text fontWeight="semibold">Second Number:</Text>
            <Input
              type="number"
              bg="slate.100"
              pr="2"
              borderRadius="md"
              w="50%"
              ml="1.9rem"
              textAlign="right"
              value={secondNumber}
              onChange={(e) => setSecondNumber(e.target.value)}
              placeholder="Enter a number"
            />
          </Flex>
          <Box my={5}>
            <Button
              onClick={handleClear}
              borderWidth="2px"
              px="2"
              rounded="md"
              fontWeight="semibold"
              ml="150px"
              _hover={{
                bg: "red.200",
                transform: "scale(1.05)",
                transitionDuration: "200ms",
              }}
            >
              Clear
            </Button>

            <Button
              onClick={(e) => handleGenerateSteps(firstNumber, secondNumber, e)}
              borderWidth="2px"
              borderStyle="solid"
              borderColor="slate.400"
              px="5"
              py="1"
              rounded="md"
              fontWeight="semibold"
              ml="390px"
              _hover={{
                bg: "emerald.200",
                transform: "scale(1.05)",
                transitionDuration: "300ms",
              }}
            >
              Generate Steps
            </Button>
          </Box>
        </Box>
        {/* response */}

        <Box
          borderWidth="2px"
          borderStyle="dotted"
          borderColor="transparent"
          display="flex"
          rounded="sm"
          mx="400px"
          transition="all 300ms"
          h="fit-content"
          mt="1"
          bg="slate.200"
        >
          {error ? (
            <Box
              bg="slate.50"
              h="400px"
              my="1"
              minW="700px"
              rounded="sm"
              mx="3"
            >
              <Box mt={2} ml={-10}>
                <Text fontWeight="semibold" fontSize="20px" color="red.500">
                  Negative numbers and empty values are invalid.
                </Text>
              </Box>
              <Button
                onClick={() => setError(false)}
                fontSize="15px"
                borderWidth="1px"
                borderColor="emerald.600"
                bg="emerald.200"
                _hover={{ bg: "emerald.400", transform: "scale(1.05)" }}
                rounded="md"
                px={20}
                mt={5}
                py={5}
                ml={["auto", null, "70px"]}
              >
                OK
              </Button>
            </Box>
          ) : (
            <Box
              bg="rgba(0,0,0,0.8)"
              h="400px"
              my="6"
              minW="655px"
              rounded="sm"
              mx="3"
              ml={-180}
            >
              <Text fontSize="2xl" m="10" color="white">
                {JSON.stringify(result, null, 4)}
              </Text>
            </Box>
          )}
        </Box>
      </Box>
    </Grid>
  );
}

export default Home;
