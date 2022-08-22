import {
  Flex,
  Container,
  Heading,
  Input,
  Button,
  FormLabel,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import { FormEvent, useId, useState } from "react";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "../../lib/axios";
import { useTranslation } from "react-i18next";
import { MetaTags } from "../../components/MetaTags";

export const Signin = () => {
  const { t } = useTranslation("signin");
  const navigator = useNavigate();
  const loginId = useId();
  const [exception, setException] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    await axiosInstance({
      method: "post",
      url: "/login",
      data: {
        // Read data from target, then convert it to object, and then extract the login
        nickname: Object.fromEntries(new FormData(event.currentTarget)).login,
      },
    })
      .then((response) => {
        setException("");
        Cookies.set("token", response.data, { expires: 7 });

        axiosInstance({
          method: "get",
          url: "/users/details",
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
          data: {},
        }).then((res) => {
          res.data.userStatus = "ONLINE";
          res.data.language = res.data.userLanguage;
          axiosInstance({
            method: "put",
            url: "/users",
            headers: {
              Authorization: `Bearer ${Cookies.get("token")}`,
            },
            data: res.data,
            // data: {
            //   nickname: res.data.nickname,
            //   firstName: res.data.firstName,
            //   lastName: res.data.lastName,
            //   phoneNumber: res.data.phoneNumber,
            //   country: res.data.country,
            //   city: res.data.city,
            //   userStatus: "ONLINE",
            //   language: res.data.userLanguage,
            //   timeZone: res.data.timeZone,
            //   showFirstNameAndLastName: res.data.showFirstNameAndLastName,
            //   showEmail: res.data.showEmail,
            //   showPhoneNumber: res.data.showPhoneNumber,
            //   showAddress: res.data.showAddress,
            //   deleted: res.data.deleted,
          }).then(() => {
            navigator("/");
          });
        });
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

    setLoading(false);
  };

  return (
    <Flex
      bgColor={"blackAlpha.50"}
      width={"full"}
      minHeight={"100vh"}
      alignItems={"center"}
    >
      <MetaTags
        title="Sign in"
        description="Sign in to your chat account"
        authors="Maciej Malinowski, Marcel Alefierowicz"
      />
      <Container>
        <form onSubmit={handleSubmit}>
          <Flex
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
            <Flex direction={"column"} w={"full"} gap={2}>
              <Heading
                w={"full"}
                textAlign={"center"}
                as={"h1"}
                size="2xl"
                color={"blackAlpha.900"}
              >
                {t("title", "Sign in")}
              </Heading>
              <Heading
                w={"full"}
                textAlign={"center"}
                as={"h2"}
                size={"md"}
                color={"blackAlpha.600"}
              >
                {t("subtitle", "to your Chat™ account")}
              </Heading>
            </Flex>

            <FormControl
              isRequired
              isInvalid={exception !== ""}
              isDisabled={loading}
            >
              <FormLabel
                htmlFor={loginId}
                as={"h3"}
                size={"sm"}
                color={"blackAlpha.600"}
              >
                Login
              </FormLabel>
              <Input id={loginId} name="login" type={"text"} />
              {exception !== "" && (
                <FormErrorMessage>{exception}</FormErrorMessage>
              )}
            </FormControl>
            <Flex
              width={"full"}
              alignItems={"center"}
              justifyContent={"space-between"}
            >
              <Link to="/register">
                <Button colorScheme="blue" variant={"link"}>
                  {t("no-account", "Don't have an account?")}
                </Button>
              </Link>
              <Button
                isLoading={loading}
                loadingText={t("loading-text", "Signing in...")}
                colorScheme="blue"
                type={"submit"}
              >
                {t("title", "Sign in")}
              </Button>
            </Flex>
          </Flex>
        </form>
      </Container>
    </Flex>
  );
};
