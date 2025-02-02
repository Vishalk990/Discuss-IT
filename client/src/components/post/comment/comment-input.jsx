import { Flex, Textarea, Button, Text } from "@chakra-ui/react";
// import AuthButtons from "../../Navbar/RightContent/AuthButtons";

const CommentInput = ({
  comment,
  setComment,
  loading,
  user,
  onCreateComment,
}) => {
  return (
    <Flex direction="column" position="relative" fontFamily={"outfit"}>
      {user ? (
        <>
          <Text mb={1}>
            Comment as{" "}
            <span style={{ color: "#3182CE" }}>
              {user?.username || user?.email?.split("@")[0]}
            </span>
          </Text>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder="What are your thoughts?"
            fontSize="10pt"
            borderRadius={4}
            minHeight="130px"
            pb={10}
            _placeholder={{ color: "gray.500" }}
            _focus={{
              outline: "none",
              bg: "white",
              border: "1px solid blue.300",
            }}
          />
          <Flex
            left="1px"
            right={0.1}
            bottom="1px"
            justify="flex-end"
            bg="gray.100"
            p="6px 8px"
            borderRadius="0px 0px 4px 4px"
          >
            <Button
              fontSize="11pt"
              borderRadius={8}
              border={"1px"}
              borderColor="white"
              bg="black"
              color="white"
              height="36px"
              _hover={{
                color: "purple.400",
              }}
              disabled={!comment.length}
              isLoading={loading}
              onClick={() => onCreateComment(comment)}
            >
              Comment
            </Button>
          </Flex>
        </>
      ) : (
        <Flex
          align="center"
          justify="space-between"
          borderRadius={2}
          border="1px solid"
          borderColor="gray.100"
          p={4}
        >
          <Text fontWeight={600}>Log in or sign up to leave a comment</Text>
          {/* <AuthButtons /> */}
        </Flex>
      )}
    </Flex>
  );
};
export default CommentInput;