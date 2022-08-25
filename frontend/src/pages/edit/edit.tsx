import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Icon,
  Input,
  Select,
  VStack,
  Switch,
  HStack,
} from "@chakra-ui/react";

import { Stack, Text } from "@chakra-ui/react";
import { PhoneIcon } from "@chakra-ui/icons";
import { BsGlobe } from "react-icons/bs";
import { HiIdentification, HiOutlineIdentification } from "react-icons/hi";
import { MdLocationCity } from "react-icons/md";
import { TbLanguage } from "react-icons/tb";
import axiosInstance from "../../lib/axios";
import Cookies from "js-cookie";
import { useTranslation } from "react-i18next";
import { MetaTags } from "../../components/MetaTags";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";

interface EditFormValues {
  nickname: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  country: string;
  city: string;
  language: string;
  timeZone: string;
  showAddress: boolean;
  showEmail: boolean;
  showFirstNameAndLastName: boolean;
  showPhoneNumber: boolean;
  deleted: boolean;
  userStatus: string;
}

export const Edit = () => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EditFormValues>();

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState<string>();
  const [lastName, setLastName] = useState<string>();
  const [phoneNumber, setphoneNumber] = useState<string>();
  const [country, setCountry] = useState<string>();
  const [city, setCity] = useState<string>();

  const [buttonState, setButtonState] = useState<Boolean>(false);
  const [exception, setException] = useState<string>("");

  const nameValidatorRegex = RegExp("^[A-Z][^A-Z]*$");
  const phoneValidatorRegex = RegExp("^[0-9]{9}$");

  useEffect(() => {
    axiosInstance({
      method: "get",
      url: "/users/details",
    }).then((res) => {
      const { firstName, lastName, phoneNumber, country, city } = res.data;

      setFirstName(firstName);
      setLastName(lastName);
      setphoneNumber(phoneNumber);
      setCountry(country);
      setCity(city);

      reset();
    });
  }, [reset]);
  const onSubmit = (data: EditFormValues) => {
    setButtonState(true);
    console.log("data", data);
    axiosInstance({
      url: "/users",
      method: "PUT",
      data: data,
    })
      .then(() => {
        setException("");
        navigate("/");
      })
      .catch((error) => {
        if (error.message === "Network Error") {
          setButtonState(false);
          setException(
            t(
              "network-error",
              "A network error has occurred, please try again later."
            )
          );
        }
        if (error.response) {
          setButtonState(false);
          setException(error.response.data.exceptionMessage);
        } else {
          setButtonState(false);
          console.log("Error", error.message);
        }
      });
  };

  const { t } = useTranslation("edit");
  return (
    <div>
      <MetaTags
        title="Edit your account details"
        description="Edit your chat account details"
        authors="Maciej Malinowski, Marcel Alefierowicz"
      />
      <Flex
        bgColor={"blackAlpha.50"}
        width={"full"}
        minHeight={"100vh"}
        alignItems={"center"}
        justifyContent={"center"}
        p={4}
      >
        <Flex
          w={"md"}
          bgColor={"white"}
          direction={"column"}
          p={6}
          alignItems={"center"}
          borderRadius={10}
          gap={6}
          borderColor={"blackAlpha.200"}
          borderWidth={1}
          boxShadow={"md"}
        >
          <VStack spacing={2}>
            <Heading
              textAlign={"center"}
              as={"h1"}
              size="2xl"
              color={"blackAlpha.900"}
            >
              {t("title", "Edit")}
            </Heading>
            <Heading
              w={"full"}
              textAlign={"center"}
              as={"h2"}
              size={"md"}
              color={"blackAlpha.600"}
            >
              {t("subtitle", "your profile information")}
            </Heading>
          </VStack>

          <form style={{ height: "100%" }} onSubmit={handleSubmit(onSubmit)}>
            <VStack
              spacing={8}
              width={"full"}
              height={"full"}
              justifyContent={"space-between"}
            >
              <VStack spacing={0} width={"full"} alignItems={"flex-start"}>
                <HStack spacing={4}>
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
                      defaultValue={firstName}
                      {...register("firstName", {
                        required: t("field-required", "this field is required"),
                        min: 3,
                        minLength: {
                          value: 3,
                          message: t(
                            "min-3-characters",
                            "minimum length should be 3 characters"
                          ),
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
                      defaultValue={lastName}
                      {...register("lastName", {
                        required: t("field-required", "this field is required"),
                        max: 20,
                        min: 3,
                        minLength: {
                          value: 3,
                          message: t(
                            "min-3-characters",
                            "minimum length should be 3 characters"
                          ),
                        },
                      })}
                    />

                    <FormErrorMessage>
                      {errors?.lastName && errors.lastName.message}
                    </FormErrorMessage>
                  </FormControl>
                </HStack>
                <FormControl isInvalid={!!errors.phoneNumber}>
                  <FormLabel fontSize={"xl"} mt={"1rem"}>
                    {" "}
                    <PhoneIcon> </PhoneIcon> {t("phone-number", "Phone Number")}
                  </FormLabel>
                  <Input
                    type="tel"
                    defaultValue={phoneNumber}
                    {...register("phoneNumber", {
                      required: t("field-required", "this field is required"),
                      pattern: {
                        value: phoneValidatorRegex,
                        message: t(
                          "invalid-phone-number",
                          "Invalid phone number"
                        ),
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
                    defaultValue={country}
                    {...register("country", {
                      required: t("field-required", "this field is required"),
                      max: 15,
                      min: 4,
                      maxLength: 15,
                      pattern: {
                        value: nameValidatorRegex,
                        message: t(
                          "capital-letter",
                          "First letter should be a capital letter, followed by lower case letters."
                        ),
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
                    defaultValue={city}
                    {...register("city", {
                      required: t("field-required", "this field is required"),
                      pattern: {
                        value: nameValidatorRegex,
                        message: t(
                          "capital-letter",
                          "First letter should be a capital letter, followed by lower case letters."
                        ),
                      },
                    })}
                  />
                  <FormErrorMessage>
                    {errors?.city && errors.city.message}
                  </FormErrorMessage>
                </FormControl>

                <FormControl isInvalid={!!errors.language}>
                  <FormLabel mt={"1rem"} fontSize={"xl"}>
                    {" "}
                    <Icon fontSize={25} as={TbLanguage} />{" "}
                    {t("language", "Language")}
                  </FormLabel>
                  <Select
                    defaultValue={""}
                    mb={"1rem"}
                    {...register("language", {
                      required: t("field-required", "This field is required"),
                    })}
                  >
                    <option value="" disabled>
                      {t("choose-language", "Choose a language")}
                    </option>
                    <option value="ENGLISH">{t("english", "English")}</option>
                    <option value="POLISH">{t("polish", "Polish")}</option>
                    <option value="GERMAN">{t("german", "German")}</option>
                  </Select>

                  <FormErrorMessage>
                    {errors?.language && errors.language.message}
                  </FormErrorMessage>
                </FormControl>
                <Input
                  type={"hidden"}
                  {...register("timeZone", {
                    value: "",
                  })}
                ></Input>
                <Input
                  type={"hidden"}
                  {...register("userStatus", {
                    value: "ONLINE",
                  })}
                ></Input>
                <Input
                  type={"hidden"}
                  {...register("deleted", {
                    value: false,
                  })}
                ></Input>
                <Switch
                  py={".5rem"}
                  size={"md"}
                  fontSize={"inherit"}
                  fontWeight={"semibold"}
                  colorScheme={"twitter"}
                  {...register("showFirstNameAndLastName")}
                >
                  Show first name and last name
                </Switch>
                <Switch
                  py={".5rem"}
                  size={"md"}
                  fontSize={"inherit"}
                  fontWeight={"semibold"}
                  colorScheme={"twitter"}
                  {...register("showEmail")}
                >
                  Show email
                </Switch>
                <Switch
                  py={".5rem"}
                  size={"md"}
                  fontSize={"inherit"}
                  fontWeight={"semibold"}
                  colorScheme={"twitter"}
                  {...register("showPhoneNumber")}
                >
                  Show phone number
                </Switch>
                <Switch
                  py={".5rem"}
                  size={"md"}
                  fontSize={"inherit"}
                  fontWeight={"semibold"}
                  colorScheme={"twitter"}
                  {...register("showAddress")}
                >
                  Show Address
                </Switch>
                {exception && (
                  <Flex pt={".5rem"} textColor={"red.600"}>
                    <div>{exception}</div>
                  </Flex>
                )}
              </VStack>
              <Flex
                pt={".5rem"}
                width={"full"}
                alignItems={"center"}
                justifyContent={"space-between"}
              >
                <Link to="/">
                  <Button
                    colorScheme="red"
                    fontWeight={"bold"}
                    variant={"link"}
                  >
                    Return to dashboard
                  </Button>
                </Link>
                <Button
                  colorScheme="twitter"
                  isDisabled={!!buttonState}
                  type={"submit"}
                >
                  Confirm
                </Button>
              </Flex>
            </VStack>
          </form>
        </Flex>
      </Flex>
    </div>
  );
};
