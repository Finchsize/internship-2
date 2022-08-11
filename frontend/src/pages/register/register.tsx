import { Box, Flex, Button, Icon, Select } from "@chakra-ui/react";
import { Heading, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ChatIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import { Link } from "react-router-dom";
import { HiOutlineIdentification, HiIdentification } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import axiosInstance from "../../lib/axios";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const stringregex = RegExp("^[A-Z][^A-Z]*$");
  const phoneregex = RegExp("/d{9}/");
  const [exception, setException] = useState("");
  useEffect(() => {
    console.log(errors);
  }, [errors]);
  function onSubmit(data: any) {
    axiosInstance({
      url: "/users",
      method: "POST",
      data: data,
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

    axiosInstance({
      url: "/login",
      method: "POST",
      data: {
        data,
      },
    }).then((response) => {
      Cookies.set("token", response.data, { expires: 7 });
    });
  }
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
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl my={3}>
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <ChatIcon> </ChatIcon> Nickname
                  </FormLabel>
                  <Input
                    type="text"
                    isInvalid={errors.nickname ? true : false}
                    placeholder="login"
                    {...register("nickname", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "minimum length should be 3 characters",
                      },
                    })}
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
                    type="text"
                    placeholder="firstName"
                    isInvalid={errors.firstName ? true : false}
                    {...register("firstName", {
                      required: true,
                      min: 3,
                      minLength: {
                        value: 3,
                        message: "minimum length should be 3 characters",
                      },
                    })}
                  />

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <p>
                      {" "}
                      <Icon as={HiOutlineIdentification} /> Last Name{" "}
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="lastName"
                    isInvalid={errors.lastName ? true : false}
                    {...register("lastName", {
                      required: true,
                      max: 20,
                      min: 3,
                      minLength: {
                        value: 3,
                        message: "minimum length should be 3 characters",
                      },
                    })}
                  />

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <EmailIcon> </EmailIcon> Email
                  </FormLabel>
                  <Input
                    type="email"
                    isInvalid={errors.email ? true : false}
                    placeholder="email"
                    {...register("email", { required: true })}
                  />

                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <PhoneIcon> </PhoneIcon> Phone Number
                  </FormLabel>
                  <Input
                    type="tel"
                    placeholder="phoneNumber"
                    isInvalid={errors.phoneNumber ? true : false}
                    {...register("phoneNumber", {
                      required: true,
                      pattern: {
                        value: phoneregex,
                        message: "",
                      },
                    })}
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
                    placeholder="Country"
                    isInvalid={errors.country ? true : false}
                    {...register("country", {
                      required: true,
                      max: 15,
                      min: 4,
                      maxLength: 15,
                      pattern: {
                        value: stringregex,
                        message: "First letter should be a capital letter",
                      },
                    })}
                  />
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <Icon as={MdLocationCity} /> City
                  </FormLabel>
                  <Input
                    type="text"
                    isInvalid={errors.city ? true : false}
                    placeholder="City"
                    {...register("city", {
                      required: true,
                      pattern: {
                        value: stringregex,
                        message: "First letter should be a capital letter",
                      },
                    })}
                  />
                  <FormLabel fontSize={"xl"}>
                    {" "}
                    <Icon fontSize={25} as={TbLanguage} /> Language
                  </FormLabel>
                  <Select {...register("userLanguage", { required: true })}>
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
