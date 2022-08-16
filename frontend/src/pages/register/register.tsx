import {
  Box,
  Flex,
  Button,
  Icon,
  Select,
  FormErrorMessage,
  FormHelperText,
} from "@chakra-ui/react";
import { Heading, Stack } from "@chakra-ui/react";
import { EmailIcon } from "@chakra-ui/icons";
import { ChatIcon, PhoneIcon } from "@chakra-ui/icons";
import { Input, FormControl, FormLabel } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsGlobe } from "react-icons/bs";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import { HiOutlineIdentification, HiIdentification } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import axiosInstance from "../../lib/axios";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import language from "../../types/language";

interface RegisterFormValues {
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  language: string;
}

export const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>();

  const stringRegex = RegExp("^[A-Z][^A-Z]*$");

  const navigate = useNavigate();

  const [exception, setException] = useState("");

  useEffect(() => {
    console.log(errors);
  }, [errors]);
  async function onSubmit(data: any) {
    await axiosInstance({
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

    await axiosInstance({
      url: "/login",
      method: "POST",
      data: {
        nickname: data.nickname,
      },
    }).then((response) => {
      setException("");
      Cookies.set("token", response.data, { expires: 7 });
      navigate("/signin");
    });
  }

  const { t } = useTranslation("register");

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
          height="1100px"
          justifyContent="center"
          borderRadius={30}
          padding={8}
        >
          <Stack width={"full"}>
            <Heading textAlign={"center"} size={"2xl"} pt={"4"} pb={"1rem"}>
              {t("sign-up", "Sign up")}
            </Heading>

            <Box width={"100%"}>
              <form onSubmit={handleSubmit(onSubmit)}>
                <FormControl my={3} isInvalid={!!errors.nickname}>
                  <FormLabel fontSize={"xl"}>
                    <ChatIcon /> {t("nickname", "Nickname")}
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("nickname", {
                      required: true,
                      minLength: {
                        value: 3,
                        message: "minimum length should be 3 characters",
                      },
                    })}
                  />
                  {!errors.nickname && (
                    <FormHelperText mb={"1rem"}>
                      {t("min-3-characters", "min. 3 characters")}
                    </FormHelperText>
                  )}

                  <FormErrorMessage>
                    {errors?.nickname && errors.nickname.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.firstName}>
                  <FormLabel mt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <p>
                      <Icon as={HiIdentification} />{" "}
                      {t("first-name", "First Name")}
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("firstName", {
                      required: true,
                      min: 3,
                      minLength: {
                        value: 3,
                        message: "minimum length should be 3 characters",
                      },
                    })}
                  />

                  <FormErrorMessage>
                    {errors?.firstName && errors.firstName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.lastName}>
                  <FormLabel mt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <p>
                      <Icon as={HiOutlineIdentification} /> {t("last-name")}
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
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

                  <FormErrorMessage>
                    {errors?.lastName && errors.lastName.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.email}>
                  <FormLabel mt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <EmailIcon /> Email
                  </FormLabel>
                  <Input
                    type="email"
                    {...register("email", { required: true })}
                  />

                  <FormErrorMessage>
                    {errors?.email && errors.email.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.phoneNumber}>
                  <FormLabel fontSize={"xl"} mt={"1rem"}>
                    {" "}
                    <PhoneIcon> </PhoneIcon> {t("phone-number", "Phone Number")}
                  </FormLabel>
                  <Input
                    type="tel"
                    {...register("phoneNumber", {
                      required: true,
                      pattern: {
                        value: new RegExp("[0-9]{9}"),
                        message: "invalid phone number",
                      },
                    })}
                  />

                  <FormErrorMessage>
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={!!errors.country}>
                  <FormLabel fontSize={"xl"} mt={"1rem"}>
                    <Icon as={BsGlobe} /> {t("country", "Country")}
                  </FormLabel>
                  <Input
                    type="text"
                    {...register("country", {
                      required: true,
                      max: 15,
                      min: 4,
                      maxLength: 15,
                      pattern: {
                        value: stringRegex,
                        message:
                          "First letter should be a capital letter, followed by lower case letters.",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.country && errors.country.message}
                  </FormErrorMessage>
                  <FormLabel fontSize={"xl"} mt={"1rem"}>
                    <Icon as={MdLocationCity} /> {t("city", "City")}
                  </FormLabel>
                </FormControl>
                <FormControl isInvalid={!!errors.city}>
                  <Input
                    type="text"
                    {...register("city", {
                      required: true,
                      pattern: {
                        value: stringRegex,
                        message:
                          "First letter should be a capital letter, followed by lower case letters.",
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.city && errors.city.message}
                  </FormErrorMessage>
                </FormControl>

                <FormLabel mt={"1rem"} fontSize={"xl"}>
                  {" "}
                  <Icon fontSize={25} as={TbLanguage} />{" "}
                  {t("language", "Language")}
                </FormLabel>
                <Select
                  mb={"1rem"}
                  {...register("language", { required: true })}
                >
                  <option value={"default"} disabled>
                    {t("choose-language", "Choose a language")}
                  </option>
                  <option value="ENGLISH">{t("english", "English")}</option>
                  <option value="POLISH">{t("polish", "Polish")}</option>
                  <option value="GERMAN">{t("german", "German")}</option>
                </Select>

                <Flex pt={"1rem"} textColor={"red.600"}>
                  <div>{exception}</div>
                </Flex>

                <Flex
                  pt={"1rem"}
                  width={"full"}
                  alignItems={"center"}
                  justifyContent={"space-between"}
                >
                  <Link to="/signin">
                    <Button colorScheme="blue" variant={"link"}>
                      {t("sign-in", "Already have an account?")}
                    </Button>
                  </Link>
                  <Button colorScheme="twitter" type={"submit"}>
                    {t("sign-up", "Sign up")}
                  </Button>
                </Flex>
              </form>
            </Box>
          </Stack>
        </Flex>
      </Flex>
    </div>
  );
};
