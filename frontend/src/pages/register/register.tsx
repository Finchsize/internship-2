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
import { Helmet } from "react-helmet";

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
        <Helmet>
          <meta charSet="utf-8" />
          <title>Sign up</title>
          <meta name="description" content="Create a new chat account" />
          <meta
            name="authors"
            content="Maciej Malinowski, Marcel Alefierowicz"
          />

          <meta property="og:title" content="Sign up" />
          <meta property="og:description" content="Create a new chat account" />

          <meta itemProp="name" content="Sign up" />
          <meta itemProp="description" content="Create a new chat account" />

          <meta name="twitter:title" content="Sign up" />
          <meta
            name="twitter:description"
            content="Create a new chat account"
          />
        </Helmet>
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
                    {t("min-3-characters", "min. 3 characters")}
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors?.nickname && errors.nickname.message}
                  </FormErrorMessage>
                  <FormLabel pt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <p>
                      <Icon as={HiIdentification} />{" "}
                      {t("first-name", "First Name")}
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="firstName"
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
                  <FormLabel pt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <p>
                      <Icon as={HiOutlineIdentification} /> {t("last-name")}
                    </p>
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="lastName"
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
                  <FormLabel pt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <EmailIcon /> Email
                  </FormLabel>
                  <Input
                    type="email"
                    placeholder="email"
                    {...register("email", { required: true })}
                  />
                  <FormErrorMessage>
                    {errors?.email && errors.email.message}
                  </FormErrorMessage>

                  <FormLabel pt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <PhoneIcon> </PhoneIcon> {t("phone-number", "Phone Number")}
                  </FormLabel>
                  <Input
                    type="tel"
                    placeholder="phoneNumber"
                    {...register("phoneNumber", {
                      required: true,
                      pattern: {
                        value: new RegExp("[0-9]{9}"),
                        message: "invalid phone number",
                      },
                    })}
                  />
                  <FormHelperText mb={"1rem"}>
                    {t(
                      "phone-validation",
                      "Please format your phone number correctly (9 digits)."
                    )}
                  </FormHelperText>
                  <FormErrorMessage>
                    {errors?.phoneNumber && errors.phoneNumber.message}
                  </FormErrorMessage>
                  <FormLabel fontSize={"xl"}>
                    <Icon as={BsGlobe} /> {t("country", "Country")}
                  </FormLabel>
                  <Input
                    type="text"
                    placeholder="Country"
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
                  <FormLabel fontSize={"xl"}>
                    <Icon as={MdLocationCity} /> {t("city", "City")}
                  </FormLabel>
                  <FormErrorMessage>
                    {errors?.country && errors.country.message}
                  </FormErrorMessage>

                  <Input
                    type="text"
                    placeholder="City"
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
                  <FormLabel pt={"1rem"} fontSize={"xl"}>
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
                    <Button colorScheme="teal" type={"submit"}>
                      {t("sign-up", "Sign up")}
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
