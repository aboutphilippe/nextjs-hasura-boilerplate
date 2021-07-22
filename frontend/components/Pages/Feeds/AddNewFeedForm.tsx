import {
  Alert,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  CloseButton,
  FormControl,
  FormLabel,
  Stack,
  Textarea,
  Input,
  Switch,
  useBoolean
} from "@chakra-ui/react";
import AccessDeniedIndicator from "components/AccessDeniedIndicator";
import { useInsertFeedMutation } from "generated-graphql";
import { useSession } from "next-auth/client";
import React, { ChangeEvent, useState } from "react";

const AddNewFeedForm = () => {
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [bdgId, setBdgId] = useState("");
  const [image, setImage] = useState("");
  const [owned, setOwned] = useBoolean();
  const [body, setBody] = useState("");
  const [session] = useSession();
  const [
    insertFeed,
    { loading: insertFeedFetching, error: insertFeedError },
  ] = useInsertFeedMutation();

  if (!session) {
    return (
      <AccessDeniedIndicator message="You need to be signed in to add a new feed!" />
    );
  }

  const handleSubmit = async () => {
    await insertFeed({
      variables: {
        author_id: session.id,
        title,
        url,
        bdgId,
        owned,
        body,
      },
    });

    setBody("");
  };

  const errorNode = () => {
    if (!insertFeedError) {
      return false;
    }

    return (
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{insertFeedError}</AlertTitle>
        <CloseButton position="absolute" right="8px" top="8px" />
      </Alert>
    );
  };

  return (
    <Stack spacing={4}>
      {errorNode()}
      <Box p={4} shadow="lg" rounded="lg">
        <Stack spacing={4}>
          <FormControl isRequired>
            <FormLabel htmlFor="title">Title</FormLabel>
            <Input
              id="title"
              value={title}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setTitle(e.currentTarget.value)
              }
              isDisabled={insertFeedFetching}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="url">Url</FormLabel>
            <Input
              id="url"
              value={url}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setUrl(e.currentTarget.value)
              }
              isDisabled={insertFeedFetching}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="image">Image url</FormLabel>
            <Input
              id="image"
              value={image}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setImage(e.currentTarget.value)
              }
              isDisabled={insertFeedFetching}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="bdgId">BoardgamegeekId</FormLabel>
            <Input
              id="bdgId"
              value={bdgId}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setBdgId(e.currentTarget.value)
              }
              isDisabled={insertFeedFetching}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel htmlFor="body">Description</FormLabel>
            <Textarea
              id="body"
              value={body}
              onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                setBody(e.currentTarget.value)
              }
              isDisabled={insertFeedFetching}
            />
          </FormControl>
          <FormLabel htmlFor="owned" mb="0">
            Do you own this game?
          </FormLabel>
          <Switch
            id="owned"
            onChange={
              setOwned.toggle
            }
          />
          <FormControl>
            <Button
              loadingText="Posting..."
              onClick={handleSubmit}
              isLoading={insertFeedFetching}
              isDisabled={!body.trim()}
            >
              Post
            </Button>
          </FormControl>
        </Stack>
      </Box>
    </Stack>
  );
};

export default AddNewFeedForm;
