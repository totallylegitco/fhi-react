import { Button, Center, Loader, Stack, Text } from '@mantine/core';
import { useState } from 'react';
import {
  CreateDenialRequestOptions,
  CreateDenialResponse,
  FHI_CLIENT,
} from '@/logic/clients/FhiClient';

export function AppealPage() {
  const TEST_REQUEST_OPTIONS: CreateDenialRequestOptions = {
    isPii: true,
    isTos: true,
    isPrivacy: true,
    denialText: 'test',
    healthHistory: 'test',
    email: 'test@aol.com',
  };

  const [response, setResponse] = useState<CreateDenialResponse | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  return (
    <Stack align="center" justify="center" h="80vh">
      <Button
        onClick={() => {
          setIsLoading(true);
          FHI_CLIENT.createDenial(TEST_REQUEST_OPTIONS)
            .then((resp) => setResponse(resp))
            .finally(() => setIsLoading(false));
        }}
      >
        Test Request
      </Button>

      <Text>Response Output:</Text>
      {isLoading ? <Loader color="blue" type="bars" /> : <Text>{JSON.stringify(response)}</Text>}
    </Stack>
  );
}
