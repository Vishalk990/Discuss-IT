import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  MenuList,
  MenuItem,
  MenuButton,
  Menu,
  Avatar,
  MenuDivider,
  Image,
  InputGroup,
  InputLeftElement,
  Input,
  Tooltip,
  HStack,
} from "@chakra-ui/react";

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  SearchIcon,
} from "@chakra-ui/icons";

import { GrAdd } from "react-icons/gr";
import { isLoggedIn, logoutUser } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import PopoverContentComponent from "../ui/PopoverContent";
import { useState } from "react";

// import { BsChat } from "react-icons/bs";

export default function Navbar() {
  const { isOpen, onToggle } = useDisclosure();
  const user = isLoggedIn();
  const navigate = useNavigate();

  function getRandomInt() {
    return Math.floor(Math.random() * (10000 - 5)) + 4;
  }

  const handleKeyPress = (e) => {
    if (
      e.key === "Enter" ||
      e.key === "Enter" ||
      e.keyCode === 13 ||
      e.keyCode === 66
    ) {
      navigate(`/search?posts=${e.target.value}`);
    }
  };

  const [openPopover, setOpenPopover] = useState(false);
  const [profilePopover, setProfilePopover] = useState(false);

  const triggers = {
    onMouseEnter: () => setOpenPopover(true),
    onMouseLeave: () => setOpenPopover(false),
  };

  return (
    <Box fontFamily={"outfit"}>
      <Flex
        bg={useColorModeValue("white", "gray.800")}
        color={useColorModeValue("gray.600", "white")}
        minH={"65px"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={"solid"}
        borderColor={useColorModeValue("gray.200", "gray.900")}
        align={"center"}
        style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.4)" }}
      >
        <Flex
          flex={{ base: 1, md: "auto" }}
          ml={{ base: -2 }}
          display={{ base: "flex", md: "none" }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={"ghost"}
            aria-label={"Toggle Navigation"}
          />
        </Flex>
        <Flex
          flex={{ base: 1 }}
          align={"center"}
          justify={{ base: "center", md: "start" }}
        >
          <Box ml={2}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 32 32"
              fill="currentColor"
              className="flex-shrink-0 w-5 h-5 rounded-full dark:text-gray-900"
            >
              <path d="M18.266 26.068l7.839-7.854 4.469 4.479c1.859 1.859 1.859 4.875 0 6.734l-1.104 1.104c-1.859 1.865-4.875 1.865-6.734 0zM30.563 2.531l-1.109-1.104c-1.859-1.859-4.875-1.859-6.734 0l-6.719 6.734-6.734-6.734c-1.859-1.859-4.875-1.859-6.734 0l-1.104 1.104c-1.859 1.859-1.859 4.875 0 6.734l6.734 6.734-6.734 6.734c-1.859 1.859-1.859 4.875 0 6.734l1.104 1.104c1.859 1.859 4.875 1.859 6.734 0l21.307-21.307c1.859-1.859 1.859-4.875 0-6.734z"></path>
            </svg>
          </Box>
          <Text
            textAlign={useBreakpointValue({ base: "center", md: "left" })}
            fontFamily={"heading"}
            fontWeight={"bold"}
            fontSize={"20pt"}
            color={useColorModeValue("#7f4ccd", "#7f4ccd")}
            as={"a"}
            href="/"
            ml={3} // Adjust the margin as needed
          >
            DiscussIT!
          </Text>

          <Flex display={{ base: "none", md: "flex" }} ml={10}>
            <DesktopNav />
          </Flex>
          <Flex
            w={{ base: "100%", md: "auto" }}
            minW={{ base: "180px", md: "240px" }}
            display={{ base: "flex" }}
            ml={10}
          >
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <SearchIcon color="gray.300" />
              </InputLeftElement>
              <Input
                borderRadius={"full"}
                placeholder="Search Posts"
                onKeyPress={handleKeyPress}
              />
            </InputGroup>
          </Flex>
        </Flex>
        {user ? (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            align={"center"}
            direction={"row"}
            spacing={6}
          >
            {/* <HStack spacing={6} position="relative">
              <Tooltip label="Hover me">
                <Icon as={BsChat} boxSize={5} color="gray.500" />
              </Tooltip>
            </HStack> */}
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
              >
                {!user?.user?.image ? (
                  <Avatar size={"sm"} src={"./user.gif"} />
                ) : (
                  <Image
                    borderRadius="full"
                    boxSize="28px"
                    src={user?.user?.image}
                    mr={2}
                  />
                )}
              </MenuButton>
              <MenuList fontSize={"12pt"}>
                <Popover isOpen={profilePopover} placement={"bottom-start"}>
                  <PopoverTrigger>
                    <Box
                      as="a"
                      p={2}
                      fontWeight={500}
                      // color={linkColor}
                      _hover={{
                        textDecoration: "none",
                        color: "purple.700",
                      }}
                      onFocus={() => setProfilePopover(!profilePopover)}
                    >
                      <MenuItem>Profile</MenuItem>
                    </Box>
                  </PopoverTrigger>
                  <PopoverContent
                    border={0}
                    boxShadow={"2xl"}
                    // bg={popoverContentBgColor}
                    p={4}
                    rounded={"xl"}
                    minW={"sm"}
                    marginRight={"15rem"}
                    triggers={triggers}
                  >
                    <PopoverContentComponent />
                  </PopoverContent>
                </Popover>

                <MenuItem
                  as={"button"}
                  _hover={{
                    textDecoration: "none",
                    color: "purple.700",
                  }}
                  onClick={() => {
                    navigate("/explore");
                  }}
                >
                  Explore
                </MenuItem>
                <MenuDivider />
                <MenuItem
                  as={"button"}
                  _hover={{
                    textDecoration: "none",
                    color: "purple.700",
                  }}
                  onClick={() => {
                    logoutUser();
                    navigate(0);
                  }}
                >
                  Logout
                </MenuItem>
              </MenuList>
            </Menu>
          </Stack>
        ) : (
          <Stack
            flex={{ base: 1, md: 0 }}
            justify={"flex-end"}
            direction={"row"}
            spacing={6}
          >
            <Button
              as={"a"}
              fontSize={"12pt"}
              fontWeight={"semibold"}
              variant={"link"}
              href={"/login"}
            >
              Login
            </Button>
            <Button
              as={"a"}
              display={{ base: "none", md: "inline-flex" }}
              fontSize={"12pt"}
              borderRadius={"full"}
              fontWeight={"semibold"}
              color={"white"}
              bg={"black"}
              href={"/register"}
              _hover={{
                bg: "gray.800",
              }}
              p={6} // Increased padding for larger button size
            >
              Register
            </Button>
          </Stack>
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue("gray.600", "gray.200");
  const linkHoverColor = useColorModeValue("gray.800", "white");
  const popoverContentBgColor = useColorModeValue("white", "gray.800");

  return (
    <Stack direction={"row"} spacing={4}>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              cursor="pointer"
              padding="0px 12px"
              borderRadius="4px"
              _hover={{ outline: "1px solid", outlineColor: "gray.200" }}
              mr={2}
              ml={{ base: 0, md: 2 }}
              // onClick={toggleMenuOpen}
            >
              <Flex
                alignItems="center"
                justifyContent="space-between"
                width={{ base: "auto", lg: "200px" }}
              >
                <Flex alignItems="center">
                  <>
                    {false ? (
                      <Image
                        borderRadius="full"
                        boxSize="24px"
                        // src={directoryState.selectedMenuItem.imageURL}
                        mr={2}
                      />
                    ) : (
                      <Icon
                        fontSize={24}
                        mr={{ base: 1, md: 2 }}
                        // color={directoryState.selectedMenuItem.iconColor}
                        // as={directoryState.selectedMenuItem.icon}
                      />
                    )}
                    <Box
                      display={{ base: "none", lg: "flex" }}
                      flexDirection="column"
                      fontSize="10pt"
                    >
                      <Text fontWeight={600}>
                        Home
                        {/* {directoryState.selectedMenuItem.displayText} */}
                      </Text>
                    </Box>
                  </>
                </Flex>
                <ChevronDownIcon color="gray.500" />
              </Flex>
            </MenuButton>
            <MenuList maxHeight="300px" overflow="scroll" overflowX="hidden">
              <Box mt={3} mb={4}>
                <Text
                  pl={3}
                  mb={1}
                  fontSize="7pt"
                  fontWeight={500}
                  color="gray.500"
                >
                  MY COMMUNITIES
                </Text>
                <MenuItem
                  width="100%"
                  fontSize="10pt"
                  _hover={{ bg: "gray.100" }}
                  // onClick={() => setOpen(true)}
                >
                  <Flex alignItems="center">
                    <Icon fontSize={20} mr={2} as={GrAdd} />
                    Create Community
                  </Flex>
                </MenuItem>
                {/* {mySnippets.map((snippet) => (
                  <MenuListItem
                    key={snippet.communityId}
                    icon={FaReddit}
                    displayText={`r/${snippet.communityId}`}
                    link={`/r/${snippet.communityId}`}
                    iconColor="blue.500"
                    imageURL={snippet.imageURL}
                  />
                ))} */}
              </Box>
            </MenuList>
          </>
        )}
      </Menu>
      {NAV_ITEMS.map((navItem) => (
        <Box key={navItem.label}>
          <Popover trigger={"hover"} placement={"bottom-start"}>
            <PopoverTrigger>
              <Box
                as="a"
                p={2}
                href={navItem.href ?? "#"}
                fontSize={"10pt"}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: "none",
                  color: linkHoverColor,
                }}
              >
                {navItem.label}
              </Box>
            </PopoverTrigger>
            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={"xl"}
                bg={popoverContentBgColor}
                p={4}
                rounded={"xl"}
                minW={"sm"}
              >
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Box
      as="a"
      href={href}
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("blue.50", "gray.900") }}
    >
      <Stack direction={"row"} align={"center"}>
        <Box>
          <Text
            transition={"all .3s ease"}
            _groupHover={{ color: "blue.400" }}
            fontWeight={500}
          >
            {label}
          </Text>
          <Text fontSize={"sm"}>{subLabel}</Text>
        </Box>
        <Flex
          transition={"all .3s ease"}
          transform={"translateX(-10px)"}
          opacity={0}
          _groupHover={{ opacity: "100%", transform: "translateX(0)" }}
          justify={"flex-end"}
          align={"center"}
          flex={1}
        >
          <Icon color={"blue.400"} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  );
};

const MobileNav = () => {
  return (
    <Stack
      bg={useColorModeValue("white", "gray.800")}
      p={4}
      display={{ md: "none" }}
    >
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  );
};

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? "#"}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: "none",
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue("gray.600", "gray.200")}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={"all .25s ease-in-out"}
            transform={isOpen ? "rotate(180deg)" : ""}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}
        >
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};

const NAV_ITEMS = [
  {
    label: "Explore",
    href: "/explore",
  },
  // {
  //   label: "Hire Designers",
  //   href: "#",
  // },
];
