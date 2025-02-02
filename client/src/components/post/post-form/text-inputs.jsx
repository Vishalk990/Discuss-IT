import { Stack, Input, Textarea, Flex, Button } from "@chakra-ui/react";

const TextInputs = ({ textInputs, onChange, handleCreatePost, loading }) => {
  return (
    <Stack spacing={3} width="100%">
      <Input
        name="title"
        value={textInputs.title}
        onChange={onChange}
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue",
        }}
        fontSize="10pt"
        borderRadius={4}
        placeholder="Title"
      />
      <Textarea
        name="content"
        value={textInputs.content}
        onChange={onChange}
        fontSize="10pt"
        placeholder="Text (optional)"
        _placeholder={{ color: "gray.500" }}
        _focus={{
          outline: "none",
          bg: "white",
          border: "1px solid",
          borderColor: "blue",
        }}
        height="280px"
      />
      <Flex justify="flex-end">
        <Button
          height="34px"
          padding="0px 30px"
          bg={"black"}
          color={"white"}
          _hover={{ textColor: "purple.400" }}
          disabled={!textInputs.title}
          isLoading={loading}
          onClick={handleCreatePost}
        >
          Post
        </Button>
      </Flex>
    </Stack>
  );
};
export default TextInputs;