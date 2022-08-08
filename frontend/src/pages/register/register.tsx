import { Box, Flex, Button, Icon, Select } from "@chakra-ui/react";
import { Heading, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ChatIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { HiOutlineIdentification, HiIdentification } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import axiosInstance from "../../lib/axios";
export const Register = () => {
  const [login, setLogin] = useState<string>();
  const [email, setEmail] = useState<string>();
  const [exception, setException] = useState("");
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phoneNumber, setphoneNumber] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();
  const [language, setLanguage] = useState<string>("ENGLISH");
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await axiosInstance({
      url: "/users",
      method: "POST",
      data: {
        nickname: login,
        firstName: firstName,
        lastName: lastName,
        email: email,
        phoneNumber: phoneNumber,
        country: country,
        city: city,
        language: language,
      },
    })
      .then((response) => {
        setException("");
      })
      .catch((error) => {
        if (error.response) {
          setException(error.response.data.exceptionMessage);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Error", error.message);
        }
      });

    await axiosInstance({
      url: "/login",
      method: "POST",
      data: {
        nickname: login,
      },
    }).then((response) => {
      Cookies.set("token", response.data, { expires: 7 });
    });
  };

  const checkPhoneNumber = (): boolean => {
    if (typeof phoneNumber === "undefined") {
      return true;
    }

    return phoneNumber.length === 9;
  };
  const checkEmail = (): boolean => {
    if (typeof email === "undefined") {
      return true;
    }
    return /\S+@\S+\.\S+/.test(email);
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
            <Heading textAlign={"center"} size={"2xl"} pt={"4"} pb={"1rem"}>
              Sign up
            </Heading>

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
                    type="text"
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
                    isRequired={true}
                    type="text"
                    onChange={(e) => setLastName(e.target.value)}
                    mb={"1rem"}
                  />
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <EmailIcon> </EmailIcon> Email
                  </FormLabel>
                  <Input
                    type="email"
                    isRequired={true}
                    value={email}
                    mb={"1rem"}
                    isInvalid={!checkEmail()}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  a
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <PhoneIcon> </PhoneIcon> Phone Number
                  </FormLabel>
                  <Input
                    type="text"
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
                    value={country}
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
                    justifyContent={"space-between"}
                  >
                    <Link to="/signin">
                      <Button colorScheme="blue" variant={"link"}>
                        Already have an account?
                      </Button>
                    </Link>
                    <Button colorScheme="teal" type={"submit"}>
                      Sign up
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
