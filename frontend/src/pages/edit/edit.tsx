import React, { FormEvent, useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Icon,
  Input,
  Link,
  Select,
} from "@chakra-ui/react";
import { Stack, Text } from "@chakra-ui/react";
import { ChatIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import { BsGlobe } from "react-icons/bs";
import { HiIdentification, HiOutlineIdentification } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import axiosInstance from "../../lib/axios";
import Cookies from "js-cookie";
import parseJwt from "../../lib/parseJWT";
export const Edit = () => {
  const [login, setLogin] = useState<string>();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phoneNumber, setphoneNumber] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [language, setLanguage] = useState<string>("ENGLISH");

  const JWT: { nickname: string; exp: number } | undefined = parseJwt(
    Cookies.get("token")
  );
  axiosInstance({
    method: "get",
    url: "/users/details",
    headers: {
      authorization: `Bearer ${Cookies.get("token")}`,
    },
  }).then((res) => {
    setLogin(res.data.nickname);
    setFirstName(res.data.firstName);
    setLastName(res.data.lastName);
    setphoneNumber(res.data.phoneNumber);
    setCountry(res.data.country);
    setCity(res.data.city);
    setLanguage(res.data.userLanguage);
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {};

  const checkPhoneNumber = (): boolean => {
    if (typeof phoneNumber === "undefined") {
      return true;
    }

    return phoneNumber.length === 9;
  };
  const checkLogin = (): boolean => {
    if (typeof login === "undefined") {
      return true;
    }
    return login.length > 3;
  };
  const checkCity = (): boolean => {
    if (typeof city === "undefined") {
      return true;
    }
    const regex = new RegExp("^[A-Z][^A-Z\n]*$");

    return regex.test(city);
  };
  const checkCountry = (): boolean => {
    if (typeof country === "undefined") {
      return true;
    }
    const regex = new RegExp("^[A-Z][^A-Z\n]*$");

    return regex.test(country);
  };

  return (
    <div>
      <Flex
        bgColor={"blackAlpha.50"}
        width={"full"}
        minHeight={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Flex
          bgColor={"whiteAlpha.50"}
          shadow={"2xl"}
          border={"1px"}
          borderColor={"gray.200"}
          width="500px"
          height="1000px"
          justifyContent="center"
          borderRadius={30}
          padding={8}
        >
          <Stack width={"full"}>
            <Box>
              <Heading textAlign={"center"} size={"3xl"} pt={"4"}>
                <h1>Edit</h1>
              </Heading>
              <Text
                fontWeight={"semibold"}
                fontSize={"1.25rem"}
                textAlign={"center"}
              >
                {" "}
                your profile
              </Text>
              <Text
                fontWeight={"semibold"}
                fontSize={"1.25rem"}
                textAlign={"center"}
              >
                information
              </Text>{" "}
            </Box>
            <Box width={"100%"}>
              <form onSubmit={handleSubmit}>
                <FormControl my={3}>
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <ChatIcon> </ChatIcon> Nickname
                  </FormLabel>
                  <Input
                    value={login}
                    isInvalid={!checkLogin()}
                    placeholder={login}
                    isRequired={true}
                    type="text"
                    onChange={(e) => setLogin(e.target.value)}
                  />
                  <FormHelperText mb={"1rem"}>
                    {" "}
                    min. 3 characters
                  </FormHelperText>

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <p>
                      {" "}
                      <Icon as={HiIdentification} /> First Name{" "}
                    </p>
                  </FormLabel>
                  <Input
                    value={firstName}
                    isRequired={true}
                    type="text" placeholder={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    mb={"1rem"}
                  />
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <p>
                      {" "}
                      <Icon as={HiOutlineIdentification} /> Last Name{" "}
                    </p>
                  </FormLabel>
                  <Input
                    value={lastName}
                    isRequired={true} placeholder={lastName}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    mb={"1rem"}
                  />

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <PhoneIcon> </PhoneIcon> Phone Number
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder={phoneNumber}
                    isRequired={true}
                    value={phoneNumber}
                    isInvalid={!checkPhoneNumber()}
                    onChange={(e) => setphoneNumber(e.target.value)}
                  />
                  <FormHelperText mb={"1rem"}>
                    Please format your phone number correctly (9 digits).
                  </FormHelperText>
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <Icon as={BsGlobe} /> Country
                  </FormLabel>
                  <Input
                    type="text"
                    value={country} placeholder={country}
                    isInvalid={!checkCountry()}
                    isRequired={true}
                    mb={"1rem"}
                    onChange={(e) => setCountry(e.target.value)}
                  />
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <Icon as={MdLocationCity} /> City
                  </FormLabel>
                  <Input
                    type="text"
                    value={city}
                    placeholder={city}
                    isInvalid={!checkCity()}
                    mb={"1rem"}
                    isRequired={true}
                    onChange={(e) => setCity(e.target.value)}
                  />

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <Icon fontSize={25} as={TbLanguage} /> Language
                  </FormLabel>
                  <Select
                    value={language}
                    isRequired
                    
                    mb={"1rem"}
                    onChange={(e) => {
                      setLanguage(e.target.value);
                    }}
                    defaultValue={language}
                  >
                    <option value={"default"} disabled>
                      Choose a language
                    </option>
                    <option value="ENGLISH">English</option>
                    <option value="POLISH">Polish</option>
                    <option value="GERMAN">German</option>
                  </Select>

                  <Flex
                    width={"full"}
                    alignItems={"center"}
                    justifyContent={"right"}
                  >
                    <Button colorScheme="teal" type={"submit"}>
                      Confirm
                    </Button>
                  </Flex>
                </FormControl>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};
